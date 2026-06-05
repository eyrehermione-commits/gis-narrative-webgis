/**
 * 工具函数库
 * Utility Functions
 */

// ==================== 数据格式化 ====================

/**
 * 格式化数字为千位分隔符
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 格式化人口数
 */
function formatPopulation(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + '百万';
    } else if (count >= 10000) {
        return (count / 10000).toFixed(1) + '万';
    }
    return count.toString();
}

/**
 * 计算两个坐标间的距离（Haversine公式）
 */
function getDistance(coord1, coord2) {
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;
    
    const R = 6371; // 地球半径（km）
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * 获取时间段描述
 */
function getSeasonName(month) {
    if (month >= 3 && month <= 5) return '春季';
    if (month >= 6 && month <= 8) return '夏季';
    if (month >= 9 && month <= 11) return '秋季';
    return '冬季';
}

/**
 * 时间滞后描述
 */
function getTimeLagDescription(days) {
    if (days < 30) return `约${days}天`;
    if (days < 90) return `约${Math.round(days / 30)}个月`;
    if (days < 365) return `约${Math.round(days / 30)}个月`;
    return `约${Math.round(days / 365)}年`;
}

// ==================== 数组操作 ====================

/**
 * 按属性分组数组
 */
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
}

/**
 * 计算数组统计信息
 */
function getStatistics(array, key) {
    const values = array.map(item => item[key]).filter(v => typeof v === 'number');
    
    return {
        count: values.length,
        sum: values.reduce((a, b) => a + b, 0),
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        median: values.sort((a, b) => a - b)[Math.floor(values.length / 2)]
    };
}

/**
 * 过滤事件按时间范围
 */
function filterEventsByTimeRange(events, startYear, endYear) {
    return events.filter(e => e.year >= startYear && e.year <= endYear);
}

// ==================== 颜色与样式 ====================

/**
 * 根据严重程度返回颜色
 */
function getSeverityColor(severity) {
    if (severity >= 8) return '#e74c3c'; // 红色 - 极端
    if (severity >= 6) return '#f39c12'; // 橙色 - 严重
    if (severity >= 4) return '#f1c40f'; // 黄色 - 中等
    return '#3498db'; // 蓝色 - 轻微
}

/**
 * 根据事件类型返回符号
 */
function getEventSymbol(eventType) {
    const symbols = {
        'climate': '❄️',
        'extreme_cold_winter': '❄️',
        'extreme_drought': '🏜️',
        'extreme_flood': '💧',
        'frost': '🧊',
        'volcanic_eruption_impact': '🌋',
        'agricultural_crisis': '🌾',
        'famine': '🍞',
        'refugee': '👥',
        'uprising': '⚔️',
        'political_event': '👑',
        'regime_change': '🏰'
    };
    return symbols[eventType] || '📌';
}

/**
 * 生成随机颜色
 */
function getRandomColor() {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ==================== 地图相关 ====================

/**
 * 将GeoJSON转换为Leaflet GeoJSON层
 */
function createGeoJSONLayer(geojsonData, style = {}) {
    return L.geoJSON(geojsonData, {
        style: {
            color: style.color || '#3498db',
            weight: style.weight || 2,
            opacity: style.opacity || 0.7,
            fillOpacity: style.fillOpacity || 0.2
        },
        pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: style.radius || 8,
                fillColor: style.fillColor || '#3498db',
                color: style.color || '#2980b9',
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6
            });
        }
    });
}

/**
 * 创建缓冲区圆形（分析用）
 */
function createBufferCircle(center, radiusKm, map, options = {}) {
    return L.circle(center, {
        radius: radiusKm * 1000, // 转换为米
        color: options.color || '#3498db',
        weight: options.weight || 2,
        opacity: options.opacity || 0.5,
        fill: options.fill !== false,
        fillColor: options.fillColor || '#3498db',
        fillOpacity: options.fillOpacity || 0.1
    }).addTo(map);
}

/**
 * 适应地图边界
 */
function fitMapBounds(map, coordinates) {
    const bounds = L.latLngBounds(coordinates);
    map.fitBounds(bounds, { padding: [50, 50] });
}

// ==================== 分析计算 ====================

/**
 * 计算两个地理区域的重叠面积比例
 */
function calculateSpatialOverlap(area1, area2) {
    // 简化版计算，实际应用中需要使用GIS库
    return 0.65; // 示例值
}

/**
 * 计算皮尔逊相关系数
 */
function calculatePearsonCorrelation(x, y) {
    const n = x.length;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    
    const numerator = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
    const denominatorX = Math.sqrt(x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0));
    const denominatorY = Math.sqrt(y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0));
    
    return numerator / (denominatorX * denominatorY);
}

/**
 * 计算事件的时间滞后
 */
function calculateTimeLag(event1, event2) {
    const date1 = new Date(event1.year, event1.month || 0, 1);
    const date2 = new Date(event2.year, event2.month || 0, 1);
    const timeDiff = Math.abs(date2 - date1);
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 转换为天数
}

// ==================== 日志与调试 ====================

/**
 * 带时间戳的日志
 */
function logWithTimestamp(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('zh-CN');
    const styles = {
        info: 'color:blue;',
        success: 'color:green;',
        warning: 'color:orange;',
        error: 'color:red;'
    };
    console.log(`%c[${timestamp}] ${message}`, styles[type] || styles.info);
}

/**
 * 性能测试
 */
function measurePerformance(functionName, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`⏱️ ${functionName} 执行时间: ${(end - start).toFixed(2)}ms`);
    return result;
}

// ==================== 导出功能 ====================

/**
 * 将数据导出为JSON文件
 */
function exportAsJSON(data, filename) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
}

/**
 * 将数据导出为CSV文件
 */
function exportAsCSV(data, filename) {
    if (!Array.isArray(data) || data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(h => JSON.stringify(row[h])).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
}

console.log('%c✓ 工具函数库已加载', 'color:green;font-weight:bold;');
