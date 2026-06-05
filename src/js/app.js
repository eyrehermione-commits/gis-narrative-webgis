/**
 * 地理叙事WebGIS平台 - 核心应用程序
 * Main Application Logic
 */

class NarrativeWebGIS {
    constructor() {
        this.currentYear = 1642;
        this.selectedEvent = null;
        this.narrativeData = {};
        this.init();
    }

    /**
     * 应用初始化
     */
    async init() {
        console.log('🚀 初始化地理叙事WebGIS平台...');
        
        // 1. 加载数据
        await this.loadData();
        
        // 2. 初始化地图
        this.initMap();
        
        // 3. 绑定事件监听器
        this.bindEventListeners();
        
        // 4. 更新初始显示
        this.updateNarrativeDisplay();
        this.updateEventsList();
        
        console.log('✅ 平台初始化完成');
    }

    /**
     * 加载所有数据
     */
    async loadData() {
        try {
            // 加载气候事件数据
            const climateResponse = await fetch('data/events/climate-events.json');
            const climateData = await climateResponse.json();
            this.narrativeData.climate = climateData.climate_events;
            console.log('✓ 气候事件数据已加载:', this.narrativeData.climate.length, '条');
            
            // 这里可以继续加载其他数据源
            // const agricultureResponse = await fetch('data/events/agricultural-crisis.json');
            // const agriculturalData = await agricultureResponse.json();
            
        } catch (error) {
            console.error('❌ 数据加载失败:', error);
        }
    }

    /**
     * 初始化Leaflet地图
     */
    initMap() {
        // 初始化地图中心（中国中部）
        this.map = L.map('map').setView([35, 108], 6);
        
        // 添加瓦片地图
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
            maxNativeZoom: 18
        }).addTo(this.map);

        // 添加边界线
        this.addRegionBoundaries();
        
        // 添加初始标记
        this.updateMapMarkers();
        
        console.log('✓ 地图初始化完成');
    }

    /**
     * 添加中国行政区边界
     */
    addRegionBoundaries() {
        // 主要区域的粗略边界（简化版）
        const regions = [
            { name: "陕西", center: [109.5, 34.4] },
            { name: "河南", center: [113, 34.8] },
            { name: "山西", center: [112.5, 37.9] },
            { name: "山东", center: [117, 36.7] },
            { name: "河北", center: [114.5, 38.4] }
        ];

        regions.forEach(region => {
            // 添加圆形标记表示主要区域
            L.circleMarker(region.center, {
                radius: 15,
                fillColor: '#ecf0f1',
                color: '#bdc3c7',
                weight: 2,
                opacity: 0.5,
                fillOpacity: 0.3
            }).addTo(this.map).bindPopup(region.name);
        });
    }

    /**
     * 更新地图标记
     */
    updateMapMarkers() {
        // 清除已有的标记
        if (this.markerGroup) {
            this.map.removeLayer(this.markerGroup);
        }
        this.markerGroup = L.featureGroup().addTo(this.map);

        // 根据当前年份筛选事件
        const yearEvents = this.getEventsByYear(this.currentYear);

        // 添加气候事件标记
        yearEvents.climate.forEach(event => {
            const marker = L.circleMarker(event.spatial_extent.center, {
                radius: 20 + (event.severity_index * 2),
                fillColor: '#3498db',
                color: '#2980b9',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6,
                className: 'climate-marker'
            });

            marker.bindPopup(`
                <div class="popup-content">
                    <h4>❄️ ${event.description}</h4>
                    <p><strong>年份:</strong> ${event.year}年</p>
                    <p><strong>严重程度:</strong> ${event.severity_index}/10</p>
                    <p><strong>温度异常:</strong> ${event.temperature_anomaly_celsius}°C</p>
                    <p><strong>持续时间:</strong> ${event.duration_days}天</p>
                </div>
            `);

            this.markerGroup.addLayer(marker);
        });

        console.log(`🗺️ 已在地图上标记 ${yearEvents.climate.length} 个${this.currentYear}年的气候事件`);
    }

    /**
     * 获取指定年份的事件
     */
    getEventsByYear(year) {
        const result = {
            climate: [],
            agricultural: [],
            social: [],
            political: []
        };

        if (this.narrativeData.climate) {
            result.climate = this.narrativeData.climate.filter(e => e.year === year);
        }

        return result;
    }

    /**
     * 绑定事件监听器
     */
    bindEventListeners() {
        // 时间轴滑块
        const timelineSlider = document.getElementById('timeline-slider');
        timelineSlider.addEventListener('input', (e) => {
            this.currentYear = parseInt(e.target.value);
            this.updateNarrativeDisplay();
            this.updateEventsList();
            this.updateMapMarkers();
        });

        // 播放叙事按钮
        document.getElementById('btn-play-narrative').addEventListener('click', () => {
            this.playNarrativeAnimation();
        });

        // 分析按钮
        document.getElementById('btn-analysis').addEventListener('click', () => {
            alert('📊 空间分析功能已就位！');
        });

        // 帮助按钮
        document.getElementById('btn-help').addEventListener('click', () => {
            this.showHelp();
        });

        // 分析选项卡
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchAnalysisTab(e.target.dataset.tab);
            });
        });

        console.log('✓ 事件监听器已绑定');
    }

    /**
     * 更新叙事链条显示
     */
    updateNarrativeDisplay() {
        const yearEvents = this.getEventsByYear(this.currentYear);
        
        // 气候层
        if (yearEvents.climate.length > 0) {
            const climateEvent = yearEvents.climate[0];
            document.getElementById('stage-climate-text').innerHTML = `
                <strong>${climateEvent.description}</strong><br>
                严重程度: ${climateEvent.severity_index}/10<br>
                温度异常: ${climateEvent.temperature_anomaly_celsius}°C
            `;
            document.getElementById('stage-climate').classList.add('active');
        } else {
            document.getElementById('stage-climate').classList.remove('active');
        }

        // 更新年份显示
        document.getElementById('year-display').textContent = `${this.currentYear}年`;
        const totalEvents = yearEvents.climate.length;
        document.getElementById('event-count-display').textContent = `(${totalEvents}个事件)`;
    }

    /**
     * 更新事件列表
     */
    updateEventsList() {
        const yearEvents = this.getEventsByYear(this.currentYear);
        const eventsList = document.getElementById('events-list');
        eventsList.innerHTML = '';

        if (yearEvents.climate.length === 0) {
            eventsList.innerHTML = '<p style="text-align:center; color:#999;">该年份无关键事件</p>';
            return;
        }

        yearEvents.climate.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item climate';
            eventItem.innerHTML = `
                <div class="event-item-title">❄️ ${event.description}</div>
                <div class="event-item-info">
                    时长: ${event.duration_days}天 | 严重程度: ${event.severity_index}/10
                </div>
            `;
            eventItem.addEventListener('click', () => {
                this.selectEvent(event);
            });
            eventsList.appendChild(eventItem);
        });
    }

    /**
     * 选择事件
     */
    selectEvent(event) {
        this.selectedEvent = event;
        console.log('📍 选中事件:', event.description);
        
        // 聚焦地图到该事件
        this.map.setView(event.spatial_extent.center, 7, { animate: true });
    }

    /**
     * 播放叙事动画
     */
    playNarrativeAnimation() {
        console.log('▶ 开始播放叙事动画...');
        
        const startYear = 1300;
        const endYear = 1650;
        let currentYear = startYear;

        const playInterval = setInterval(() => {
            if (currentYear >= endYear) {
                clearInterval(playInterval);
                console.log('✓ 动画播放完成');
                return;
            }

            // 更新年份
            document.getElementById('timeline-slider').value = currentYear;
            this.currentYear = currentYear;
            this.updateNarrativeDisplay();
            this.updateEventsList();
            this.updateMapMarkers();

            // 显示进度
            const progress = Math.round(((currentYear - startYear) / (endYear - startYear)) * 100);
            console.log(`播放进度: ${progress}% (${currentYear}年)`);

            currentYear += 10; // 每步跳10年
        }, 1000); // 每秒更新一次
    }

    /**
     * 切换分析选项卡
     */
    switchAnalysisTab(tabName) {
        // 隐藏所有标签页
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // 移除所有按钮的active类
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // 显示选中的标签页
        const selectedTab = document.getElementById(`tab-${tabName}`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // 标记按钮为active
        event.target.classList.add('active');

        console.log(`📊 切换到 "${tabName}" 分析选项卡`);
    }

    /**
     * 显示帮助信息
     */
    showHelp() {
        alert(`
📖 地理叙事WebGIS平台使用指南

【主要功能】
1. 时间轴导航: 拖动时间轴滑块，浏览1300-1850年间的历史事件
2. 地图交互: 点击地图上的标记，查看详细信息
3. 事件列表: 左侧显示当前年份的所有事件
4. 多维分析: 右侧面板提供关联性、空间、时间三维分析

【叙事链条】
气候异常 → 农业危机 → 社会动荡 → 政治危机 → 政权更替

【研究案例】
小冰河期（1300-1850年）对明清帝国的影响

【快捷操作】
- ▶ 播放叙事: 自动演进历史进程
- 📊 空间分析: 查看缓冲区、叠加分析结果
- 🗺️ 地图图例: 右下角显示符号说明

祝您研究顺利！
        `);
    }
}

/**
 * 页面加载完成后初始化应用
 */
document.addEventListener('DOMContentLoaded', () => {
    const app = new NarrativeWebGIS();
    
    // 暴露到全局以便调试
    window.app = app;
});

console.log('%c地理叙事WebGIS平台已加载', 'color:green;font-size:16px;font-weight:bold;');
console.log('%c版本: 1.0.0 | 案例: 小冰河期与明清危机', 'color:blue;font-size:12px;');
