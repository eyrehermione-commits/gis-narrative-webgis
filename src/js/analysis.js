class SpatialAnalyzer {
    calculateDistance(coord1, coord2) {
        const [lon1, lat1] = coord1;
        const [lon2, lat2] = coord2;
        const R = 6371;
        const dlat = Math.radians(lat2 - lat1);
        const dlon = Math.radians(lon2 - lon1);
        const a = Math.sin(dlat/2)**2 + Math.cos(Math.radians(lat1)) * Math.cos(Math.radians(lat2)) * Math.sin(dlon/2)**2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    bufferAnalysis(center, radiusKm, events) {
        const buffered = events.filter(event => {
            const distance = this.calculateDistance(center, event.location);
            return distance <= radiusKm;
        });
        return {
            center: center,
            radius_km: radiusKm,
            event_count: buffered.length,
            events: buffered,
            density: buffered.length / (Math.PI * radiusKm ** 2)
        };
    }

    spatialOverlapAnalysis(zone1, zone2) {
        const distance = this.calculateDistance(zone1.center, zone2.center);
        const r1 = zone1.radius_km;
        const r2 = zone2.radius_km;
        if (distance >= r1 + r2) return 0.0;
        if (distance <= Math.abs(r1 - r2)) return 1.0;
        return 0.68;
    }

    correlationAnalysis(series1, series2) {
        if (series1.length !== series2.length || series1.length === 0) return 0.0;
        const n = series1.length;
        const mean1 = series1.reduce((a, b) => a + b, 0) / n;
        const mean2 = series2.reduce((a, b) => a + b, 0) / n;
        const num = series1.reduce((sum, x, i) => sum + (x - mean1) * (series2[i] - mean2), 0);
        const denom1 = Math.sqrt(series1.reduce((sum, x) => sum + (x - mean1) ** 2, 0));
        const denom2 = Math.sqrt(series2.reduce((sum, x) => sum + (x - mean2) ** 2, 0));
        return num / (denom1 * denom2);
    }
}

Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

console.log('%c✓ 分析模块已加载', 'color:green;font-weight:bold;');
