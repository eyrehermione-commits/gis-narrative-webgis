class MapManager {
    constructor(containerId) {
        this.map = L.map(containerId).setView([35, 108], 6);
        this.markerGroup = L.featureGroup().addTo(this.map);
    }

    addTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 18
        }).addTo(this.map);
    }

    addMarker(latlng, options = {}) {
        const marker = L.circleMarker(latlng, {
            radius: options.radius || 10,
            fillColor: options.color || '#3498db',
            color: options.borderColor || '#2980b9',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.6
        });
        if (options.popup) {
            marker.bindPopup(options.popup);
        }
        this.markerGroup.addLayer(marker);
        return marker;
    }

    clearMarkers() {
        this.markerGroup.clearLayers();
    }

    fitBounds(coordinates) {
        const bounds = L.latLngBounds(coordinates);
        this.map.fitBounds(bounds);
    }
}

console.log('%c✓ 地图管理器已加载', 'color:green;font-weight:bold;');
