# 五层地理叙事数据模型

## 📐 模型设计原则

地理叙事通过多层维度关联，将单一数据点升华为因果关系链条：

```
时间维度 ← 多层耦合 → 空间维度
   ↓
气候 → 农业 → 社会 → 政治 → 地理结果
```

---

## 🔗 五层核心关系

### Layer 1: 气候层（Climate）
**定义**：极端气候事件的量化描述

```json
{
  "climate_event": {
    "id": "climate_1642_01",
    "timestamp": "1642-10-01T00:00:00Z",
    "event_type": "extreme_cold_winter",
    "spatial_extent": {
      "center": [108, 35],
      "radius_km": 1000,
      "affected_regions": ["陕西", "河南", "山西", "山东"]
    },
    "severity_metrics": {
      "temperature_anomaly_celsius": -3.2,
      "severity_index": 8,
      "duration_days": 180
    },
    "evidence": {
      "historical_records": "《明史》记载：崇祯十五年冬大寒",
      "proxy_data": "树轮宽度降低35%"
    }
  }
}
```

**关键字段**：
- `event_type`: extreme_cold, extreme_drought, flood, frost
- `severity_index`: 1-10（极端程度）
- `duration_days`: 持续天数
- `temperature_anomaly_celsius`: 与正常值偏差

---

### Layer 2: 农业层（Agriculture）
**定义**：气候对农业产出的直接冲击

```json
{
  "agricultural_crisis": {
    "id": "agri_crisis_1642",
    "linked_climate": "climate_1642_01",
    "time_lag_days": 45,
    "spatial_extent": {
      "center": [108, 35],
      "affected_km2": 850000
    },
    "damage_assessment": {
      "crop_damage_rate": 0.85,
      "crops_affected": ["winter_wheat", "millet", "barley"],
      "estimated_grain_loss_tons": 12000000
    },
    "population_impact": {
      "famine_affected_count": 2000000,
      "malnutrition_rate": 0.72,
      "mortality_rate": 0.15
    },
    "regional_breakdown": [
      {
        "region": "陕西",
        "damage_rate": 0.90,
        "affected_population": 800000,
        "key_cities": ["西安", "延安", "榆林"]
      },
      {
        "region": "河南",
        "damage_rate": 0.80,
        "affected_population": 750000,
        "key_cities": ["开封", "洛阳"]
      }
    ]
  }
}
```

**关键字段**：
- `time_lag_days`: 气候事件到农业危机的滞后期
- `crop_damage_rate`: 0-1（作物损毁率）
- `famine_affected_count`: 直接受影响人口数
- `regional_breakdown`: 细化到省份的影响

---

### Layer 3: 社会层（Social）
**定义**：农业危机引发的人口流动与社会动荡

```json
{
  "social_crisis": {
    "id": "social_1642",
    "linked_agricultural": "agri_crisis_1642",
    "time_lag_days": 90,
    "population_dynamics": {
      "refugee_flow": {
        "total_count": 500000,
        "origin_regions": ["陕西", "河南"],
        "destination_routes": [
          {
            "from": [109.5, 34.4],
            "to": [116.4, 39.9],
            "name": "陕西→北京",
            "refugee_count": 120000,
            "duration_days": 120
          },
          {
            "from": [113, 34.8],
            "to": [120.2, 30.3],
            "name": "河南→杭州",
            "refugee_count": 180000,
            "duration_days": 90
          }
        ]
      },
      "social_indicators": {
        "banditry_incidents": 450,
        "smallpox_outbreaks": 12,
        "crime_rate_increase_percent": 240
      }
    },
    "uprising_triggered": [
      {
        "id": "uprising_li_zicheng",
        "name": "闯王李自成起义",
        "origin_coordinate": [111.2, 37.9],
        "origin_region": "陕西",
        "start_date": "1642-12-01",
        "initial_force": 50000,
        "motivation": "饥荒逃兵与农民"
      },
      {
        "id": "uprising_zhang_xianzhong",
        "name": "张献忠起义",
        "origin_coordinate": [105.5, 29.8],
        "origin_region": "四川",
        "start_date": "1643-03-15",
        "initial_force": 80000
      }
    ]
  }
}
```

**关键字段**：
- `refugee_flow`: 人口迁移路由与数量
- `banditry_incidents`: 匪盗事件数
- `uprising_triggered`: 触发��农民起义

---

### Layer 4: 政治层（Political）
**定义**：社会危机对政权稳定性的威胁

```json
{
  "political_crisis": {
    "id": "political_1642",
    "linked_social": "social_1642",
    "time_lag_days": 120,
    "regime_stability": {
      "stability_index": 2.5,
      "scale": "1-10（10为最稳定）",
      "government_control_rate": 0.35,
      "controlled_regions": ["南京周边", "浙江", "福建"],
      "lost_regions": ["陕西", "河南", "山西", "湖北"]
    },
    "military_situation": {
      "government_forces": 200000,
      "rebel_forces": 450000,
      "military_balance": "rebel_advantage",
      "key_battles": [
        {
          "name": "开封之战",
          "date": "1643-05-20",
          "location": [114.3, 34.8],
          "winner": "rebels"
        }
      ]
    },
    "bureaucratic_collapse": {
      "officials_deserted_count": 1200,
      "provincial_capitals_lost": 8,
      "tax_collection_rate": 0.12,
      "administrative_breakdown": "critical"
    },
    "regime_response": {
      "emergency_policies": ["粮食征购禁止", "赦免政策"],
      "effectiveness": "ineffective",
      "timeline_to_collapse": "12-18 months"
    }
  }
}
```

---

### Layer 5: 地理结果层（Geo-Outcome）
**定义**：政治结果的地理空间表现

```json
{
  "geo_outcome": {
    "id": "outcome_1644",
    "period": "1642-1644",
    "spatial_distribution": {
      "regime_transition_zones": [
        {
          "zone_id": "zone_beijing",
          "center": [116.4, 39.9],
          "regime_change": "明→清",
          "transition_date": "1644-06-05",
          "mechanism": "农民起义削弱→清军入关"
        }
      ],
      "population_redistribution": {
        "depopulated_regions": ["陕西中部", "河南北部"],
        "population_loss_rate": 0.55,
        "resettlement_areas": ["长江中游", "江南"]
      },
      "economic_map_change": {
        "prosperous_zones": ["江南", "两广"],
        "collapsed_zones": ["华北平原"],
        "trade_route_shift": "南移"
      }
    },
    "long_term_consequences": {
      "tenure_analysis": "气候恶化对帝国衰亡的贡献度：35-45%",
      "spatial_memory": "华北人口骤降300年才恢复",
      "policy_lessons": "分散农业风险的重要性"
    }
  }
}
```

---

## 🔄 层级间的因果关系

### 时间滞后模式

```
Climate Event (T₀)
    ↓ [45 days lag]
Agricultural Crisis (T₀ + 45)
    ↓ [90 days lag]
Social Crisis & Uprising (T₀ + 135)
    ↓ [120 days lag]
Political Collapse (T₀ + 255)
    ↓ [365 days lag]
Regime Change (T₀ + 620 days ≈ 20 months)
```

### 空间耦合度量

**定义**：各层事件空间重叠度

$$\text{Spatial Coupling} = \frac{\text{Area}(\text{Climate} \cap \text{Agri} \cap \text{Social})}{\text{Area}(\text{Climate} \cup \text{Agri} \cup \text{Social})}$$

**高耦合区 = 地理临界点（关键转折地带）**

---

## 📊 查询示例

### Query 1: 时空关联分析
```sql
SELECT climate.event_type, agriculture.crop_damage_rate, 
       social.refugee_count, political.stability_index,
       ST_Distance(climate.center, social.uprising_location) as distance_km
FROM climate 
JOIN agriculture ON agriculture.linked_climate = climate.id
JOIN social ON social.linked_agricultural = agriculture.id
WHERE climate.severity_index >= 7
  AND social.refugee_count > 100000;
```

### Query 2: 地理热点识别
```python
# 识别"三层同现"的高风险区
high_risk_zones = spatial_overlap(
    climate_disaster_areas,
    agricultural_crisis_regions,
    social_uprising_locations
)
```

---

## 🎯 模型验证指标

| 指标 | 计算方法 | 预期结果 |
|------|--------|--------|
| **因果链强度** | Pearson相关系数(climate → political) | > 0.78 |
| **空间耦合度** | 重叠面积 / 并集面积 | > 0.65 |
| **时间滞后规律** | 各层事件时间差的标准差 | < 60天 |
| **预测准确率** | 气候 → 起义的预测命中率 | > 85% |

