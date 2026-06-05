class NarrativeEngine {
    constructor() {
        this.narrativeChain = [
            { layer: 'climate', name: '气候异常', icon: '❄️' },
            { layer: 'agriculture', name: '农业危机', icon: '🌾' },
            { layer: 'social', name: '社会动荡', icon: '👥' },
            { layer: 'political', name: '政权危机', icon: '👑' }
        ];
    }

    buildNarrativeChain(events) {
        const chain = {};
        this.narrativeChain.forEach(stage => {
            chain[stage.layer] = events.filter(e => e.type === stage.layer);
        });
        return chain;
    }

    calculateTimeLags(events) {
        const lags = [];
        for (let i = 0; i < events.length - 1; i++) {
            const lag = events[i + 1].year - events[i].year;
            lags.push(lag);
        }
        return lags;
    }
}

console.log('%c✓ 叙事引擎已加载', 'color:green;font-weight:bold;');
