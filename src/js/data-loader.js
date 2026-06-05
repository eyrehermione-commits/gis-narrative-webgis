/**
 * 数据加载模块
 */

class DataLoader {
    static async loadClimateEvents() {
        try {
            const response = await fetch('data/events/climate-events.json');
            const data = await response.json();
            console.log('✓ 气候事件已加载');
            return data;
        } catch (error) {
            console.error('加载气候事件失败:', error);
            return { climate_events: [] };
        }
    }

    static async loadAgriculturalCrisis() {
        try {
            const response = await fetch('data/events/agricultural-crisis.json');
            const data = await response.json();
            console.log('✓ 农业危机已加载');
            return data;
        } catch (error) {
            console.error('加载农业危机失败:', error);
            return { agricultural_crisis_events: [] };
        }
    }

    static async loadSocialCrisis() {
        try {
            const response = await fetch('data/events/social-crisis.json');
            const data = await response.json();
            console.log('✓ 社会动荡已加载');
            return data;
        } catch (error) {
            console.error('加载社会危机失败:', error);
            return { social_crisis_events: [] };
        }
    }

    static async loadPoliticalEvents() {
        try {
            const response = await fetch('data/events/political-events.json');
            const data = await response.json();
            console.log('✓ 政治事件已加载');
            return data;
        } catch (error) {
            console.error('加载政治事件失败:', error);
            return { political_events: [] };
        }
    }

    static async loadAllData() {
        const [climate, agricultural, social, political] = await Promise.all([
            this.loadClimateEvents(),
            this.loadAgriculturalCrisis(),
            this.loadSocialCrisis(),
            this.loadPoliticalEvents()
        ]);
        
        return {
            climate,
            agricultural,
            social,
            political
        };
    }
}

console.log('%c✓ 数据加载器已准备就绪', 'color:green;font-weight:bold;');
