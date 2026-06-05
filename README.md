# 地理叙事WebGIS平台 | Geo-Narrative WebGIS Platform

## 📖 项目概述

本系统是一个融合**地理信息系统(GIS)**与**叙事逻辑**的交互式平台，通过多维数据模型和时空可视化技术，揭示历史事件背后的地理动力机制。

### 核心案例：小冰河期与农业-政权危机

**叙事链条**：气候恶化 → 农业减产 → 饥荒与流民 → 农民起义 → 政权更替

**研究对象**：1300-1850年小冰河期对明清社会结构的深层影响

---

## 🏗️ 系统架构

```
gis-narrative-webgis/
├── docs/                          # 文档与分析报告
│   ├── data-model.md             # 五层数据模型定义
│   ├── analysis-report.md        # 小冰河期案例分析
│   └── methodology.md            # 研究方法论
├── data/                          # 地理与历史数据
│   ├── events/                   # 历史事件数据集
│   │   ├── climate-events.json   # 气候异常事件
│   │   ├── agricultural-crisis.json # 农业危机
│   │   └── political-events.json # 政治事件
│   ├── spatial/                  # 空间数据
│   │   ├── regions.geojson       # 省级行政区划
│   │   └── cities.geojson        # 主要城市与起义中心
│   └── timeseries/               # 时间序列数据
│       └── climate-data.json     # 温度/降水重建数据
├── src/                           # 源代码
│   ├── index.html                # 主页面
│   ├── js/
│   │   ├── app.js                # 核心应用逻辑
│   │   ├── map-manager.js        # 地图管理
│   │   ├── data-loader.js        # 数据加载器
│   │   ├── narrative-engine.js   # 叙事引擎
│   │   ├── analysis.js           # 空间分析模块
│   │   └── utils.js              # 工具函数
│   ├── css/
│   │   ├── style.css             # 主样式
│   │   └── symbols.css           # SVG符号样式
│   └── symbols/                  # SVG符号库
│       ├── climate-symbols.svg   # 气候符号
│       ├── agricultural-symbols.svg # 农业符号
│       └── political-symbols.svg # 政治符号
├── analysis/                      # 数据分析脚本
│   ├── spatial-analysis.py       # 空间分析（缓冲区、叠加）
│   └── generate-sample-data.py   # 样本数据生成
└── package.json                   # 项目依赖
```

---

## 🗂️ 数据模型：五层叙事框架

### 层级结构

```
[时间维度]
    ↓
[气候事件] → [农业冲击] → [社会动荡] → [政治结果]
    ↓
[空间维度（省份/城市）]
```

### 核心数据结构

```json
{
  "narrative_event": {
    "id": "event_1",
    "time": {
      "year": 1642,
      "season": "winter",
      "start_date": "1642-11-01",
      "end_date": "1643-03-15"
    },
    "climate": {
      "type": "extreme_cold",
      "severity": 8,
      "temperature_anomaly": -3.2,
      "description": "严重冷冬，长江结冰"
    },
    "agriculture": {
      "crop_damage_rate": 0.85,
      "famine_affected_population": 2000000,
      "regions": ["陕西", "河南", "山西"]
    },
    "social": {
      "refugee_count": 500000,
      "uprising_locations": [
        {"name": "闯王起义", "coordinates": [111.2, 37.9]},
        {"name": "张献忠起义", "coordinates": [105.5, 29.8]}
      ]
    },
    "political": {
      "regime_stability": 3,
      "key_events": ["农民起义增加", "官僚体系崩坏"],
      "outcome": "明末农民战争激化"
    },
    "spatial": {
      "primary_region": "华北与华中",
      "coordinates": [108, 35],
      "affected_area_km2": 850000
    },
    "narrative_text": "1642年严冬导致华北农业崩溃，百万流民聚集，闯王李自成势力快速扩张..."
  }
}
```

---

## 🎯 功能模块

### 1. **叙事地图编辑器**
- 拖拽放置事件标记
- 自动生成时间轴
- 支持多源数据导入

### 2. **时空路径可视化**
- 动态播放历史进程（时间维度）
- 空间热力图展示（农业危机分布）
- 轨迹连线（政治事件传播）

### 3. **多维度查询与分析**
- 气候-农业-社会关联查询
- 空间缓冲区分析
- 时间序列关联性分析

### 4. **交互式故事线展示**
- 事件卡片与地图同步
- 镜头自动导航
- 证据链接与文献引用

---

## 🚀 快速开始

### 环境需求
- Node.js 16+
- Python 3.8+（用于数据处理）
- 现代浏览器（Chrome/Firefox/Safari）

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/eyrehermione-commits/gis-narrative-webgis.git
cd gis-narrative-webgis

# 安装依赖
npm install

# 启动开发服务器
npm start

# 访问
open http://localhost:8000
```

### 生成示例数据

```bash
cd analysis
python generate-sample-data.py
```

---

## 📊 小冰河期案例分析

### 研究问题
1. **气候极端事件如何通过农业系统影响人口流动？**
2. **农业危机与农民起义的空间关联性有多强？**
3. **政权衰落与气候恶化的时间耦合度如何？**

### 分析方法
- **空间叠加分析**：气候灾难区 ∩ 农业危机区 → 社会动荡中心
- **缓冲区分析**：以起义中心为圆心，分析50-200km范围的农业影响
- **时间序列相关性**：气候异常 → 农业减产 → 起义数量的时滞关系

### 预期成果
- 量化小冰河期对明清灭亡的贡献程度
- 识别关键的"地理临界点"
- 提出气候韧性的历史启示

---

## 🎨 技术栈

### 前端
- **Leaflet.js** - 地图引擎
- **D3.js** - 数据可视化
- **SVG** - 自定义符号系统
- **Anime.js** - 动画效果

### 后端
- **Node.js + Express** - API服务
- **GeoJSON** - 空间数据格式
- **SQLite/PostgreSQL** - 数据存储

### 分析
- **Python + GeoPandas** - 空间分析
- **Pandas** - 时间序列分析

---

## 📝 文献参考

1. Dull et al. (2011) - *Climate and Society in the Americas*
2. 葛全胜等 (2011) - 《中国古代气候变化对农业的影响》
3. 樊如琢 (2005) - 《气候与中国历史》
4. Parker (2013) - *Global Crisis: War, Climate Change and Catastrophe*

---

## 👤 作者

单人开发 | One Person Project

---

## 📄 许可证

Private Repository
