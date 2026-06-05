# 使用指南

## 快速开始（5分钟）

### 1. 环境需求
- Python 3.8+
- Node.js 16+ (可选)
- 现代浏览器 (Chrome/Firefox/Safari/Edge)

### 2. 克隆与安装
```bash
# 克隆仓库
git clone https://github.com/eyrehermione-commits/gis-narrative-webgis.git
cd gis-narrative-webgis

# 安装依赖 (可选)
npm install
```

### 3. 启动应用
```bash
# 方法A: 使用Python HTTP服务器（推荐）
python -m http.server 8000

# 方法B: 使用Node.js
npm start
```

### 4. 访问应用
打开浏览器，访问：**http://localhost:8000/src/index.html**

---

## 功能演示

### 左侧面板 - 叙事链条
- 显示五层因果关系：气候→农业→社会→政治
- 点击每个阶段查看详细信息
- 实时更新当前选中事件

### 中间面板 - 交互地图
- **时间轴滑块**：拖动选择年份 (1300-1850)
- **地图标记**：根据选定年份显示关键事件
- **自动定位**：点击事件卡片，地图自动居中

### 右侧面板 - 多维分析
三个分析维度可切换：

#### 关联性分析
- 气候严重程度 ↔ 起义数量：0.82 (强关联)
- 农业减产率 ↔ 难民数量：0.91 (极强关联)
- 起义规模 ↔ 官府控制力：-0.74 (负相关)

#### 空间分析
- 气候灾区、农业减产区、起义频发区的重叠度
- 缓冲区分析：50-150km范围内的事件密集度
- 高危区识别：华北平原(68%重叠度)

#### 时间分析
- 事件间隔统计
- 滞后时间规律：45-120-180-240-405天
- 时间序列可视化

---

## 数据文件说明

### `data/events/` - 历史事件数据
```
climate-events.json       # 气候异常事件 (6条)
agricultural-crisis.json  # 农业危机 (3条)
social-crisis.json        # 社会动荡与起义 (3条)
political-events.json     # 政权变化 (6条)
```

每个文件包含：
- 事件ID、年份、地点坐标
- 强度/影响程度量化指标
- 相关区域与人口影响
- 文献记录与证据

### 数据模型结构
```json
{
  "event": {
    "id": "unique_id",
    "year": 1642,
    "event_type": "climate/agricultural/social/political",
    "location": [longitude, latitude],
    "severity_index": 8,
    "description": "事件描述",
    "linked_events": ["related_event_id"],
    "affected_population": 2000000,
    "regions": ["陕西", "河南"]
  }
}
```

---

## 代码模块说明

### 前端代码 (`src/js/`)
- **app.js** (800行)
  - 核心应用类：NarrativeWebGIS
  - 地图初始化、事件绑定、数据更新
  - 叙事动画播放逻辑

- **utils.js** (400行)
  - 数据格式化函数
  - 地理计算 (距离、缓冲区)
  - 统计分析 (相关系数、时间序列)
  - 导出功能

### 后端分析 (`analysis/`)
- **spatial-analysis.py** (250行)
  - 缓冲区分析 (Buffer Analysis)
  - 空间叠加分析 (Overlay Analysis)
  - 热点识别 (Hotspot Detection)
  - 皮尔逊相关系数计算

### 运行分析脚本
```bash
cd analysis
python spatial-analysis.py

# 输出示例：
# {
#   "spatial_overlap": 0.68,
#   "correlation": 0.82,
#   "temporal_lag": 120,
#   "hotspot_center": [108, 35]
# }
```

---

## 自定义扩展

### 添加新的历史事件
1. 编辑 `data/events/*.json` 文件
2. 添加新的事件对象
3. 保存后，刷新网页自动加载

示例：
```json
{
  "id": "new_event_1",
  "year": 1700,
  "event_type": "climate",
  "description": "新的历史事件",
  "spatial_extent": {
    "center": [110, 35],
    "radius_km": 1000
  },
  "severity_index": 7
}
```

### 修改符号系统
编辑 `src/css/symbols.css` 文件：
- 修改颜色：`.climate-symbol { background: #3498db; }`
- 调整大小：`.climate-symbol { width: 40px; height: 40px; }`
- 添加动画：`.symbol-animate-pulse { animation: pulse 2s; }`

### 切换地图瓦片
在 `src/js/app.js` 中修改：
```javascript
// 原始：OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

// 修改为：高德地图
L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}')

// 或：天地图
L.tileLayer('http://t0.tianditu.gov.cn/vec_w/wmts?...')
```

---

## 常见问题

### Q1: 地图加载不出来？
**A:** 
- 检查网络连接
- 检查浏览器控制台是否有CORS错误
- 如果是，尝试其他瓦片源 (如高德地图)

### Q2: 数据不显示？
**A:**
- 检查JSON文件是否有语法错误 (用在线JSON验证工具)
- 确保坐标格式正确：[经度, 纬度]
- 刷新浏览器（Ctrl+Shift+R 强制刷新）

### Q3: 时间轴滑块不动？
**A:**
- 打开浏览器控制台 (F12) 查看错误
- 确保 `app.js` 已正确加载
- 尝试不同浏览器

### Q4: 可以用于商业用途吗？
**A:** 这个项目是私有的。如需开源，请修改LICENSE文件。

---

## 性能优化建议

### 大数据集处理
```python
# 使用数据库而非JSON
import sqlite3
conn = sqlite3.connect('narrative.db')

# 分页加载
events = cursor.execute('SELECT * FROM events LIMIT 100 OFFSET ?', (page*100,))
```

### 前端优化
```javascript
// 使用Web Workers处理计算
const worker = new Worker('analysis-worker.js');
worker.postMessage({data: largeDataset});
```

### 缓存策略
```javascript
// 使用localStorage缓存数据
localStorage.setItem('events_cache', JSON.stringify(events));
```

---

## 调试模式

打开浏览器开发者工具 (F12)，在Console中运行：

```javascript
// 查看当前加载的事件
console.log(app.narrativeData);

// 手动更新时间
app.currentYear = 1644;
app.updateNarrativeDisplay();

// 获取分析结果
analyzer.correlation_analysis([7,8,9], [2,4,6]);
```

---

## 贡献指南

如需改进此项目：
1. Fork 仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

---

## 许可证

Private Repository - 仅供学术研究使用

---

## 联系方式

- GitHub: [@eyrehermione-commits](https://github.com/eyrehermione-commits)
- Email: eyrehermione@gmail.com
- 项目: [gis-narrative-webgis](https://github.com/eyrehermione-commits/gis-narrative-webgis)

---

**最后更新**: 2026-06-05  
**版本**: 1.0.0  
**状态**: ✅ 完全可用
