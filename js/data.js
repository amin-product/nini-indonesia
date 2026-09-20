// 由 tools/build.py 自动生成，请勿手工修改
window.TRIP_DATA = {
  "meta": {
    "generatedAt": "2026-09-18 15:11",
    "sourceFile": "移动版行程原始资料.xlsx",
    "dateRange": {
      "start": "2026-09-24",
      "end": "2026-10-04",
      "days": 11
    },
    "exchangeRate": {
      "idrPerCny": 2652,
      "label": "参考汇率",
      "asOf": "2026-09-18",
      "isLive": false,
      "note": "非实时汇率。取自 Excel 花费表自身的换算比例（印尼盾K ÷ 人民币 ≈ 2.652），仅供快速估算。"
    },
    "disclaimer": "行程、航班、时间、酒店与地址均逐字取自 Excel；食物分类/简介/食材为自动补充内容（数据层 supplemented=true）。"
  },
  "days": [
    {
      "date": "2026-09-24",
      "label": "9/24",
      "weekday": "周四",
      "dayIndex": 1,
      "title": "上海 → 泗水（经吉隆坡）",
      "short": "上海→泗水",
      "route": "上海 → 吉隆坡 → 泗水 → Bromo",
      "areas": [
        "东爪哇"
      ],
      "areaLabel": "在东爪哇",
      "weatherLocation": { "displayName": "Bromo", "latitude": -7.9425, "longitude": 112.9530 },
      "isLastDay": false,
      "items": [
        {
          "time": "02:10",
          "endTime": "07:45",
          "type": "flight",
          "title": "上海-吉隆坡（7：45到吉隆坡）",
          "detail": "转机5小时35分",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": 0,
          "transportIndex": null,
          "hotelId": null,
          "images": [],
          "rowRef": "最终版!A2"
        },
        {
          "time": "13:15",
          "endTime": "14:50",
          "type": "flight",
          "title": "吉隆坡-泗水（14：50到达）",
          "detail": "",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": 1,
          "transportIndex": null,
          "hotelId": null,
          "images": [],
          "rowRef": "最终版!A3"
        },
        {
          "time": "15:30",
          "endTime": "18:30",
          "type": "transport",
          "title": "泗水-bromo旁酒店 路程2小时",
          "detail": "包车1",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": 0,
          "hotelId": null,
          "images": [
            "assets/day/d01.jpg"
          ],
          "rowRef": "最终版!A4"
        },
        {
          "time": "18:30",
          "endTime": "",
          "type": "hotel",
          "title": "入住 Arum Bromo Villas",
          "detail": "包车1",
          "note": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": "h01",
          "images": [],
          "rowRef": "最终版!A4"
        }
      ],
      "untimed": [],
      "flights": [
        {
          "date": "2026-09-24",
          "from": "上海",
          "fromCode": "PVG",
          "to": "吉隆坡",
          "toCode": "KUL",
          "dep": "02:10",
          "arr": "07:45",
          "titleRaw": "上海-吉隆坡（7：45到吉隆坡）",
          "layover": "在吉隆坡中转 · 停留 5小时30分 · 行李直挂",
          "flightNo": "MH387",
          "flightNoNote": "",
          "platform": "携程",
          "rowRef": "最终版!A2",
          "airline": "马来西亚航空",
          "airlineEn": "Malaysia Airlines",
          "fromAirport": "浦东国际机场",
          "fromTerminal": "T2",
          "toAirport": "吉隆坡国际机场",
          "toTerminal": "T1",
          "legs": [
            {
              "airline": "马来西亚航空",
              "airlineEn": "Malaysia Airlines",
              "flightNo": "MH387",
              "date": "2026-09-24",
              "dep": "02:10",
              "fromCode": "PVG",
              "fromAirport": "浦东国际机场",
              "fromTerminal": "T2",
              "arr": "07:45",
              "arrDate": "2026-09-24",
              "toCode": "KUL",
              "toAirport": "吉隆坡国际机场",
              "toTerminal": "T1"
            }
          ],
          "tickets": [
            {
              "name": "WANG HAORAN",
              "ticketNo": "232-9444542343",
              "bookRef": "ECN3AH"
            },
            {
              "name": "MIN YUTING",
              "ticketNo": "232-9444542342",
              "bookRef": "ECN3AH"
            }
          ],
          "ticketNote": "",
          "timezoneNote": "",
          "orderNo": "1128150135628711",
          "orderLabel": "上海 ⇄ 泗水 往返大机票",
          "layoverAfter": {
            "at": "吉隆坡",
            "airport": "吉隆坡国际机场",
            "duration": "5小时30分",
            "baggageThrough": true
          }
        },
        {
          "date": "2026-09-24",
          "from": "吉隆坡",
          "fromCode": "KUL",
          "to": "泗水",
          "toCode": "SUB",
          "dep": "13:15",
          "arr": "14:50",
          "titleRaw": "吉隆坡-泗水（14：50到达）",
          "layover": "",
          "flightNo": "MH873",
          "flightNoNote": "",
          "platform": "-",
          "rowRef": "最终版!A3",
          "airline": "马来西亚航空",
          "airlineEn": "Malaysia Airlines",
          "fromAirport": "吉隆坡国际机场",
          "fromTerminal": "T1",
          "toAirport": "朱安达国际机场",
          "toTerminal": "T2",
          "legs": [
            {
              "airline": "马来西亚航空",
              "airlineEn": "Malaysia Airlines",
              "flightNo": "MH873",
              "date": "2026-09-24",
              "dep": "13:15",
              "fromCode": "KUL",
              "fromAirport": "吉隆坡国际机场",
              "fromTerminal": "T1",
              "arr": "14:50",
              "arrDate": "2026-09-24",
              "toCode": "SUB",
              "toAirport": "朱安达国际机场",
              "toTerminal": "T2"
            }
          ],
          "tickets": [
            {
              "name": "WANG HAORAN",
              "ticketNo": "232-9444542343",
              "bookRef": "ECN3AH"
            },
            {
              "name": "MIN YUTING",
              "ticketNo": "232-9444542342",
              "bookRef": "ECN3AH"
            }
          ],
          "ticketNote": "",
          "timezoneNote": "",
          "orderNo": "1128150135628711",
          "orderLabel": "上海 ⇄ 泗水 往返大机票"
        }
      ],
      "transports": [
        {
          "date": "2026-09-24",
          "from": "泗水",
          "to": "bromo旁酒店",
          "dep": "15:30",
          "arr": "18:30",
          "duration": "约 2 小时",
          "detail": "包车1",
          "note": "",
          "rowRef": "最终版!A4"
        }
      ],
      "hotel": {
        "id": "h01",
        "name": "Arum Bromo Villas",
        "nameEn": "Arum Bromo Villas",
        "address": "Jl. Raya Bromo, Dusun II Jombok rt. 08/03, Dusun 2, Sapikerep, Kec. Sukapura, Kabupaten Probolinggo, Jawa Timur 67254印度尼西亚",
        "addressLines": [
          "Jl. Raya Bromo, Dusun II Jombok rt. 08/03, Dusun 2, Sapikerep, Kec. Sukapura, Kabupaten Probolinggo, Jawa Timur 67254印度尼西亚"
        ],
        "notes": [
          "距离火山入口半小时车程"
        ],
        "stayNote": "包车1",
        "area": "bromo",
        "images": [],
        "inherited": false
      },
      "clothing": [
        {
          "activity": "飞机中转+坐车",
          "top": "休闲舒适+好穿脱套装",
          "shoes": "轻便鞋",
          "bag": "双肩包"
        }
      ],
      "guides": [],
      "images": [
        "assets/day/d01.jpg"
      ],
      "rowRefs": [
        "最终版!A2",
        "最终版!A3",
        "最终版!A4"
      ]
    },
    {
      "date": "2026-09-25",
      "label": "9/25",
      "weekday": "周五",
      "dayIndex": 2,
      "title": "Bromo 火山日出",
      "short": "Bromo",
      "route": "Bromo → 赛武",
      "areas": [
        "东爪哇"
      ],
      "areaLabel": "在东爪哇",
      "weatherLocation": { "displayName": "Bromo", "latitude": -7.9425, "longitude": 112.9530 },
      "isLastDay": false,
      "items": [
        {
          "time": "03:00",
          "endTime": "",
          "type": "activity",
          "title": "bromo火山一日游（预计11点结束）",
          "detail": "包车1送到能到的最近位置，爬上去等日出。后续坐吉普车下到沙海，爬到火山口",
          "note": "需要做好保暖",
          "costNote": "",
          "guideId": "bromo",
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [
            "assets/day/d02.jpg"
          ],
          "rowRef": "最终版!A5"
        },
        {
          "time": "12:00",
          "endTime": "16:00",
          "type": "transport",
          "title": "bromo-赛武旁酒店 路程4小时",
          "detail": "回酒店再坐车，包车1",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": 1,
          "hotelId": null,
          "images": [
            "assets/day/d03.jpg"
          ],
          "rowRef": "最终版!A6"
        },
        {
          "time": "16:00",
          "endTime": "",
          "type": "hotel",
          "title": "入住 AJA Homestay",
          "detail": "回酒店再坐车，包车1",
          "note": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": "h02",
          "images": [],
          "rowRef": "最终版!A6"
        }
      ],
      "untimed": [],
      "flights": [],
      "transports": [
        {
          "date": "2026-09-25",
          "from": "bromo",
          "to": "赛武旁酒店",
          "dep": "12:00",
          "arr": "16:00",
          "duration": "约 4 小时",
          "detail": "回酒店再坐车，包车1",
          "note": "",
          "rowRef": "最终版!A6"
        }
      ],
      "hotel": {
        "id": "h02",
        "name": "AJA Homestay",
        "nameEn": "AJA Homestay",
        "address": "Jl. Krajan RT.02 RW.09 Sidomulyo Pronojiwo Lumajang, 67374 Pronojiwo, 印尼",
        "addressLines": [
          "Jl. Krajan RT.02 RW.09 Sidomulyo Pronojiwo Lumajang, 67374 Pronojiwo, 印尼"
        ],
        "notes": [
          "房间50平，含早餐，离赛武瀑布步行半小时的距离"
        ],
        "stayNote": "回酒店再坐车，包车1",
        "area": "赛武",
        "images": [],
        "inherited": false
      },
      "clothing": [
        {
          "activity": "bromo火山+坐车",
          "top": "冲锋衣+运动长裤",
          "shoes": "厚长袜+溯溪鞋",
          "bag": "双肩包、户外帽"
        }
      ],
      "guides": [
        "bromo"
      ],
      "images": [
        "assets/day/d02.jpg",
        "assets/day/d03.jpg"
      ],
      "rowRefs": [
        "最终版!A5",
        "最终版!A6"
      ]
    },
    {
      "date": "2026-09-26",
      "label": "9/26",
      "weekday": "周六",
      "dayIndex": 3,
      "title": "赛武瀑布",
      "short": "赛武",
      "route": "赛武 → 泗水",
      "areas": [
        "东爪哇"
      ],
      "areaLabel": "在东爪哇",
      "weatherLocation": { "displayName": "赛武瀑布", "latitude": -8.2318, "longitude": 112.9169 },
      "isLastDay": false,
      "items": [
        {
          "time": "07:30",
          "endTime": "",
          "type": "activity",
          "title": "赛武瀑布一日游（预计12点结束）",
          "detail": "住的很近，步行前往",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [
            "assets/day/d04.jpg"
          ],
          "rowRef": "最终版!A7"
        },
        {
          "time": "13:30",
          "endTime": "17:30",
          "type": "transport",
          "title": "赛武-泗水机场旁酒店 路程4小时",
          "detail": "回酒店再坐车，包车1",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": 2,
          "hotelId": null,
          "images": [
            "assets/day/d05.jpg"
          ],
          "rowRef": "最终版!A8"
        },
        {
          "time": "17:30",
          "endTime": "",
          "type": "hotel",
          "title": "入住 Premier Place Surabaya Airport",
          "detail": "回酒店再坐车，包车1",
          "note": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": "h03",
          "images": [],
          "rowRef": "最终版!A8"
        }
      ],
      "untimed": [],
      "flights": [],
      "transports": [
        {
          "date": "2026-09-26",
          "from": "赛武",
          "to": "泗水机场旁酒店",
          "dep": "13:30",
          "arr": "17:30",
          "duration": "约 4 小时",
          "detail": "回酒店再坐车，包车1",
          "note": "",
          "rowRef": "最终版!A8"
        }
      ],
      "hotel": {
        "id": "h03",
        "name": "Premier Place Surabaya Airport",
        "nameEn": "Premier Place Surabaya Airport",
        "address": "Jl. Raya Bandara Juanda No.73, Semawalang, Semambung, 格当岸, 诗都阿佐县",
        "addressLines": [
          "Jl. Raya Bandara Juanda No.73, Semawalang, Semambung, 格当岸, 诗都阿佐县"
        ],
        "notes": [
          "含早"
        ],
        "stayNote": "回酒店再坐车，包车1",
        "area": "泗水",
        "images": [],
        "inherited": false
      },
      "clothing": [
        {
          "activity": "赛武瀑布",
          "top": "户外运动套装",
          "shoes": "溯溪鞋",
          "bag": "防水包、户外帽"
        },
        {
          "activity": "坐车中转",
          "top": "休闲舒适+好穿脱套装",
          "shoes": "轻便鞋",
          "bag": "双肩包"
        }
      ],
      "guides": [],
      "images": [
        "assets/day/d04.jpg",
        "assets/day/d05.jpg"
      ],
      "rowRefs": [
        "最终版!A7",
        "最终版!A8"
      ]
    },
    {
      "date": "2026-09-27",
      "label": "9/27",
      "weekday": "周日",
      "dayIndex": 4,
      "title": "泗水 → 巴厘岛 · 沙努尔",
      "short": "巴厘岛",
      "route": "泗水 → 巴厘岛（沙努尔）",
      "areas": [
        "巴厘"
      ],
      "areaLabel": "在 Bali",
      "weatherLocation": { "displayName": "沙努尔", "latitude": -8.6883, "longitude": 115.2633 },
      "isLastDay": false,
      "items": [
        {
          "time": "11:15",
          "endTime": "13:15",
          "type": "flight",
          "title": "泗水-巴厘岛飞机（13:15到达）",
          "detail": "",
          "note": "",
          "costNote": "往返价格，返程：10.3",
          "guideId": null,
          "flightIndex": 2,
          "transportIndex": null,
          "hotelId": null,
          "images": [],
          "rowRef": "最终版!A9"
        },
        {
          "time": "13:45",
          "endTime": "14:30",
          "type": "transport",
          "title": "去酒店",
          "detail": "包车",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": 3,
          "hotelId": null,
          "images": [
            "assets/day/d06.jpg"
          ],
          "rowRef": "最终版!A10"
        },
        {
          "time": "14:30",
          "endTime": "",
          "type": "hotel",
          "title": "入住 埃格拉别墅",
          "detail": "包车",
          "note": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": "h04",
          "images": [],
          "rowRef": "最终版!A10"
        },
        {
          "time": "15:00",
          "endTime": "",
          "type": "leisure",
          "title": "港口附近游玩",
          "detail": "考虑去海神庙看个日落",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [
            "assets/day/d07.jpg"
          ],
          "rowRef": "最终版!A11"
        }
      ],
      "untimed": [
        {
          "time": "",
          "endTime": "",
          "type": "leisure",
          "title": "巴厘岛交通费用（包车/打车）",
          "detail": "4趟接送+佩妮达岛私人一日游",
          "note": "",
          "costNote": "含4趟机场酒店接送+佩妮达岛私人团1日游",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [],
          "rowRef": "最终版!A12"
        }
      ],
      "flights": [
        {
          "date": "2026-09-27",
          "from": "泗水",
          "fromCode": "SUB",
          "to": "巴厘岛",
          "toCode": "DPS",
          "dep": "11:15",
          "arr": "13:15",
          "titleRaw": "泗水-巴厘岛飞机（13:15到达）",
          "layover": "",
          "flightNo": "JT804",
          "flightNoNote": "",
          "platform": "携程",
          "rowRef": "最终版!A9",
          "airline": "印尼狮航",
          "airlineEn": "Lion Air",
          "fromAirport": "朱安达国际机场",
          "fromTerminal": "T1",
          "toAirport": "伍拉赖国际机场",
          "toTerminal": "D",
          "legs": [
            {
              "airline": "印尼狮航",
              "airlineEn": "Lion Air",
              "flightNo": "JT804",
              "date": "2026-09-27",
              "dep": "11:15",
              "fromCode": "SUB",
              "fromAirport": "朱安达国际机场",
              "fromTerminal": "T1",
              "arr": "13:15",
              "arrDate": "2026-09-27",
              "toCode": "DPS",
              "toAirport": "伍拉赖国际机场",
              "toTerminal": "D"
            }
          ],
          "tickets": [
            {
              "name": "WANG HAORAN",
              "ticketNo": "990-2147940097",
              "bookRef": "WZISLR"
            },
            {
              "name": "MIN YUTING",
              "ticketNo": "990-2147940098",
              "bookRef": "WZISLR"
            }
          ],
          "ticketNote": "",
          "timezoneNote": "",
          "orderNo": "1128150369640935",
          "orderLabel": "泗水 ⇄ 巴厘岛 往返"
        }
      ],
      "transports": [
        {
          "date": "2026-09-27",
          "from": "巴厘岛",
          "to": "酒店",
          "dep": "13:45",
          "arr": "14:30",
          "duration": "",
          "detail": "包车",
          "note": "",
          "rowRef": "最终版!A10"
        }
      ],
      "hotel": {
        "id": "h04",
        "name": "埃格拉别墅",
        "nameEn": "",
        "address": "Jl Danau Tamblingan 60, Bali, 80361 沙努尔, 印尼",
        "addressLines": [
          "Jl Danau Tamblingan 60, Bali, 80361 沙努尔, 印尼"
        ],
        "notes": [
          "130平，含早，距离港口和商业圈近"
        ],
        "stayNote": "包车",
        "area": "巴厘岛",
        "images": [],
        "inherited": false
      },
      "clothing": [
        {
          "activity": "坐飞机中转",
          "top": "休闲舒适+好穿脱套装",
          "shoes": "轻便鞋",
          "bag": "双肩包"
        },
        {
          "activity": "巴厘岛闲逛",
          "top": "休闲套装/度假裙",
          "shoes": "轻便鞋/拖鞋",
          "bag": "遮阳帽、随身包"
        }
      ],
      "guides": [],
      "images": [
        "assets/day/d06.jpg",
        "assets/day/d07.jpg"
      ],
      "rowRefs": [
        "最终版!A9",
        "最终版!A10",
        "最终版!A11",
        "最终版!A12"
      ]
    },
    {
      "date": "2026-09-28",
      "label": "9/28",
      "weekday": "周一",
      "dayIndex": 5,
      "title": "佩尼达岛西线一日游",
      "short": "佩妮达岛",
      "route": "沙努尔 → 佩尼达岛 → 沙努尔",
      "areas": [
        "巴厘"
      ],
      "areaLabel": "在 Bali",
      "weatherLocation": { "displayName": "佩尼达岛", "latitude": -8.7278, "longitude": 115.5444 },
      "isLastDay": false,
      "items": [
        {
          "time": "07:30",
          "endTime": "",
          "type": "activity",
          "title": "佩尼达岛西线（精灵坠崖、破碎沙滩、天神浴池）一日游",
          "detail": "",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [
            "assets/day/d08.jpg"
          ],
          "rowRef": "最终版!A13"
        }
      ],
      "untimed": [],
      "flights": [],
      "transports": [],
      "hotel": {
        "id": "h04",
        "name": "埃格拉别墅",
        "nameEn": "",
        "address": "Jl Danau Tamblingan 60, Bali, 80361 沙努尔, 印尼",
        "addressLines": [
          "Jl Danau Tamblingan 60, Bali, 80361 沙努尔, 印尼"
        ],
        "notes": [
          "130平，含早，距离港口和商业圈近"
        ],
        "stayNote": "包车",
        "area": "巴厘岛",
        "images": [],
        "inherited": true
      },
      "clothing": [
        {
          "activity": "佩妮达岛一日游",
          "top": "泳装+防晒衣",
          "shoes": "拖鞋",
          "bag": "防水包、遮阳帽"
        }
      ],
      "guides": [],
      "images": [
        "assets/day/d08.jpg"
      ],
      "rowRefs": [
        "最终版!A13"
      ]
    },
    {
      "date": "2026-09-29",
      "label": "9/29",
      "weekday": "周二",
      "dayIndex": 6,
      "title": "巴厘岛 → 科莫多岛",
      "short": "科莫多",
      "route": "巴厘岛 → 科莫多岛（纳闽巴霍）",
      "areas": [
        "科莫多/弗洛勒斯"
      ],
      "areaLabel": "在科莫多 / 弗洛勒斯",
      "weatherLocation": { "displayName": "纳闽巴霍", "latitude": -8.4964, "longitude": 119.8877 },
      "isLastDay": false,
      "items": [
        {
          "time": "11:45",
          "endTime": "13:00",
          "type": "flight",
          "title": "巴厘岛-科莫多岛（13：00到达）",
          "detail": "",
          "note": "",
          "costNote": "往返价格，返程：10.3",
          "guideId": null,
          "flightIndex": 3,
          "transportIndex": null,
          "hotelId": null,
          "images": [
            "assets/day/d09.jpg"
          ],
          "rowRef": "最终版!A14"
        },
        {
          "time": "14:30",
          "endTime": "",
          "type": "hotel",
          "title": "入住 Luciana Hotel",
          "detail": "",
          "note": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": "h05",
          "images": [],
          "rowRef": "最终版!A15"
        },
        {
          "time": "14:30",
          "endTime": "",
          "type": "leisure",
          "title": "半日浮潜、SPA、烹饪课、织布体验、看日落等",
          "detail": "",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [],
          "rowRef": "最终版!A15"
        }
      ],
      "untimed": [],
      "flights": [
        {
          "date": "2026-09-29",
          "from": "巴厘岛",
          "fromCode": "DPS",
          "to": "科莫多岛",
          "toCode": "LBJ",
          "dep": "11:45",
          "arr": "13:00",
          "titleRaw": "巴厘岛-科莫多岛（13：00到达）",
          "layover": "",
          "flightNo": "ID6331",
          "flightNoNote": "",
          "platform": "携程",
          "rowRef": "最终版!A14",
          "airline": "印尼峇迪航空",
          "airlineEn": "Batik Air",
          "fromAirport": "伍拉赖国际机场",
          "fromTerminal": "D",
          "toAirport": "科莫多国际机场",
          "toTerminal": "",
          "legs": [
            {
              "airline": "印尼峇迪航空",
              "airlineEn": "Batik Air",
              "flightNo": "ID6331",
              "date": "2026-09-29",
              "dep": "11:45",
              "fromCode": "DPS",
              "fromAirport": "伍拉赖国际机场",
              "fromTerminal": "D",
              "arr": "13:00",
              "arrDate": "2026-09-29",
              "toCode": "LBJ",
              "toAirport": "科莫多国际机场",
              "toTerminal": ""
            }
          ],
          "tickets": [
            {
              "name": "WANG HAORAN",
              "ticketNo": null,
              "bookRef": "WWGNVG"
            },
            {
              "name": "MIN YUTING",
              "ticketNo": null,
              "bookRef": "WWGNVG"
            }
          ],
          "ticketNote": "行程单未提供票号，值机时可用航司预订编码 WWGNVG",
          "timezoneNote": "",
          "orderNo": "1128150369416423",
          "orderLabel": "巴厘岛 ⇄ 下拉布安 往返"
        }
      ],
      "transports": [],
      "hotel": {
        "id": "h05",
        "name": "Luciana Hotel",
        "nameEn": "Luciana Hotel",
        "address": "Gang Lewur, 86754 纳闽巴霍, 印尼",
        "addressLines": [
          "Gang Lewur, 86754 纳闽巴霍, 印尼"
        ],
        "notes": [
          "房间20平，距离机场、港口、餐厅近"
        ],
        "stayNote": "",
        "area": "科莫多岛",
        "images": [],
        "inherited": false
      },
      "clothing": [
        {
          "activity": "坐飞机中转",
          "top": "休闲舒适+好穿脱套装",
          "shoes": "轻便鞋",
          "bag": "双肩包"
        },
        {
          "activity": "科莫多岛闲逛",
          "top": "休闲套装/度假裙",
          "shoes": "轻便鞋/拖鞋",
          "bag": "遮阳帽、随身包"
        }
      ],
      "guides": [],
      "images": [
        "assets/day/d09.jpg"
      ],
      "rowRefs": [
        "最终版!A14",
        "最终版!A15"
      ]
    },
    {
      "date": "2026-09-30",
      "label": "9/30",
      "weekday": "周三",
      "dayIndex": 7,
      "title": "科莫多岛一日游",
      "short": "科莫多",
      "route": "纳闽巴霍出海：帕达尔 · 粉色沙滩 · 魔鬼鱼点",
      "areas": [
        "科莫多/弗洛勒斯"
      ],
      "areaLabel": "在科莫多 / 弗洛勒斯",
      "weatherLocation": { "displayName": "科莫多", "latitude": -8.6500, "longitude": 119.5500 },
      "isLastDay": false,
      "items": [
        {
          "time": "06:30",
          "endTime": "",
          "type": "activity",
          "title": "帕达尔、粉色沙滩、科莫多岛、月牙沙滩、魔鬼鱼点、海龟点（含浮潜）",
          "detail": "",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [],
          "rowRef": "最终版!A16"
        }
      ],
      "untimed": [],
      "flights": [],
      "transports": [],
      "hotel": {
        "id": "h05",
        "name": "Luciana Hotel",
        "nameEn": "Luciana Hotel",
        "address": "Gang Lewur, 86754 纳闽巴霍, 印尼",
        "addressLines": [
          "Gang Lewur, 86754 纳闽巴霍, 印尼"
        ],
        "notes": [
          "房间20平，距离机场、港口、餐厅近"
        ],
        "stayNote": "",
        "area": "科莫多岛",
        "images": [],
        "inherited": true
      },
      "clothing": [
        {
          "activity": "科莫多岛一日游",
          "top": "泳装+防晒衣",
          "shoes": "拖鞋",
          "bag": "防水包、遮阳帽"
        }
      ],
      "guides": [],
      "images": [],
      "rowRefs": [
        "最终版!A16"
      ]
    },
    {
      "date": "2026-10-01",
      "label": "10/1",
      "weekday": "周四",
      "dayIndex": 8,
      "title": "科莫多岛 → 乌布",
      "short": "乌布",
      "route": "纳闽巴霍 → 巴厘岛 → 乌布",
      "areas": [
        "巴厘"
      ],
      "areaLabel": "在 Bali",
      "weatherLocation": { "displayName": "乌布", "latitude": -8.5069, "longitude": 115.2625 },
      "isLastDay": false,
      "items": [
        {
          "time": "09:50",
          "endTime": "11:00",
          "type": "flight",
          "title": "科莫多岛-巴厘岛（11：00到达）",
          "detail": "",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": 4,
          "transportIndex": null,
          "hotelId": null,
          "images": [
            "assets/day/d10.jpg"
          ],
          "rowRef": "最终版!A17"
        },
        {
          "time": "11:00",
          "endTime": "",
          "type": "hotel",
          "title": "入住 Kanhara Villas Ubud by GenuineHost",
          "detail": "",
          "note": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": "h06",
          "images": [],
          "rowRef": "最终版!A17"
        },
        {
          "time": "12:30",
          "endTime": "",
          "type": "leisure",
          "title": "乌布秘境、皇宫、市集，自由游玩\n乌布皇宫等可能有10-20元左右的门票",
          "detail": "",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [
            "assets/day/d11.jpg"
          ],
          "rowRef": "最终版!A18"
        }
      ],
      "untimed": [],
      "flights": [
        {
          "date": "2026-10-01",
          "from": "科莫多岛",
          "fromCode": "LBJ",
          "to": "巴厘岛",
          "toCode": "DPS",
          "dep": "09:50",
          "arr": "11:00",
          "titleRaw": "科莫多岛-巴厘岛（11：00到达）",
          "layover": "",
          "flightNo": "ID6332",
          "flightNoNote": "",
          "platform": "Booking",
          "rowRef": "最终版!A17",
          "airline": "印尼峇迪航空",
          "airlineEn": "Batik Air",
          "fromAirport": "科莫多国际机场",
          "fromTerminal": "",
          "toAirport": "伍拉赖国际机场",
          "toTerminal": "D",
          "legs": [
            {
              "airline": "印尼峇迪航空",
              "airlineEn": "Batik Air",
              "flightNo": "ID6332",
              "date": "2026-10-01",
              "dep": "09:50",
              "fromCode": "LBJ",
              "fromAirport": "科莫多国际机场",
              "fromTerminal": "",
              "arr": "11:00",
              "arrDate": "2026-10-01",
              "toCode": "DPS",
              "toAirport": "伍拉赖国际机场",
              "toTerminal": "D"
            }
          ],
          "tickets": [
            {
              "name": "WANG HAORAN",
              "ticketNo": null,
              "bookRef": "WWGNVG"
            },
            {
              "name": "MIN YUTING",
              "ticketNo": null,
              "bookRef": "WWGNVG"
            }
          ],
          "ticketNote": "行程单未提供票号，值机时可用航司预订编码 WWGNVG",
          "timezoneNote": "",
          "orderNo": "1128150369416423",
          "orderLabel": "巴厘岛 ⇄ 下拉布安 往返"
        }
      ],
      "transports": [],
      "hotel": {
        "id": "h06",
        "name": "Kanhara Villas Ubud by GenuineHost",
        "nameEn": "Kanhara Villas Ubud by GenuineHost",
        "address": "Jalan Raya Kumbuh, Mas, Ubud, 80571 乌布, 印尼",
        "addressLines": [
          "Jalan Raya Kumbuh, Mas, Ubud, 80571 乌布, 印尼"
        ],
        "notes": [
          "乌布villa，房间71平，带楼梯两层，有免费下午茶",
          "附近有餐馆、超市、乌布市集等，去atv很近，离海滩车程1小时"
        ],
        "stayNote": "",
        "area": "巴厘岛",
        "images": [],
        "inherited": false
      },
      "clothing": [
        {
          "activity": "坐飞机中转",
          "top": "休闲舒适+好穿脱套装",
          "shoes": "轻便鞋",
          "bag": "双肩包"
        },
        {
          "activity": "巴厘岛闲逛",
          "top": "休闲套装/度假裙",
          "shoes": "轻便鞋/拖鞋",
          "bag": "遮阳帽、随身包"
        }
      ],
      "guides": [],
      "images": [
        "assets/day/d10.jpg",
        "assets/day/d11.jpg"
      ],
      "rowRefs": [
        "最终版!A17",
        "最终版!A18"
      ]
    },
    {
      "date": "2026-10-02",
      "label": "10/2",
      "weekday": "周五",
      "dayIndex": 9,
      "title": "乌布 ATV + 梯田",
      "short": "乌布",
      "route": "乌布 → Tegalalang 梯田 → 乌布",
      "areas": [
        "巴厘"
      ],
      "areaLabel": "在 Bali",
      "weatherLocation": { "displayName": "乌布", "latitude": -8.5069, "longitude": 115.2625 },
      "isLastDay": false,
      "items": [
        {
          "time": "10:00",
          "endTime": "",
          "type": "activity",
          "title": "乌布atv，单人单车，90分钟，180元左右",
          "detail": "那周围有多个，可以挑一下",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [],
          "rowRef": "最终版!A19"
        },
        {
          "time": "12:00",
          "endTime": "",
          "type": "leisure",
          "title": "午饭/洗澡 → 下午 Tegalalang 梯田（1.5～2h） → SPA/回乌布吃饭。",
          "detail": "",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [
            "assets/day/d12.jpg"
          ],
          "rowRef": "最终版!A20"
        }
      ],
      "untimed": [],
      "flights": [],
      "transports": [],
      "hotel": {
        "id": "h06",
        "name": "Kanhara Villas Ubud by GenuineHost",
        "nameEn": "Kanhara Villas Ubud by GenuineHost",
        "address": "Jalan Raya Kumbuh, Mas, Ubud, 80571 乌布, 印尼",
        "addressLines": [
          "Jalan Raya Kumbuh, Mas, Ubud, 80571 乌布, 印尼"
        ],
        "notes": [
          "乌布villa，房间71平，带楼梯两层，有免费下午茶",
          "附近有餐馆、超市、乌布市集等，去atv很近，离海滩车程1小时"
        ],
        "stayNote": "",
        "area": "巴厘岛",
        "images": [],
        "inherited": true
      },
      "clothing": [
        {
          "activity": "乌布atv",
          "top": "户外运动套装",
          "shoes": "溯溪鞋",
          "bag": "随身包、户外帽"
        },
        {
          "activity": "乌布闲逛",
          "top": "休闲套装/度假裙",
          "shoes": "轻便鞋/拖鞋",
          "bag": "遮阳帽、随身包"
        }
      ],
      "guides": [],
      "images": [
        "assets/day/d12.jpg"
      ],
      "rowRefs": [
        "最终版!A19",
        "最终版!A20"
      ]
    },
    {
      "date": "2026-10-03",
      "label": "10/3",
      "weekday": "周六",
      "dayIndex": 10,
      "title": "乌布 → 泗水",
      "short": "泗水",
      "route": "乌布 → 巴厘岛机场 → 泗水",
      "areas": [
        "巴厘",
        "东爪哇"
      ],
      "areaLabel": "在 Bali",
      "weatherLocation": { "displayName": "泗水", "latitude": -7.2575, "longitude": 112.7521 },
      "isLastDay": false,
      "items": [
        {
          "time": "10:00",
          "endTime": "",
          "type": "leisure",
          "title": "酒店周围逛街/市集",
          "detail": "",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": null,
          "images": [],
          "rowRef": "最终版!A21"
        },
        {
          "time": "13:55",
          "endTime": "13:55",
          "type": "flight",
          "title": "巴厘岛-泗水（泗水时间13：55到达）",
          "detail": "",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": 5,
          "transportIndex": null,
          "hotelId": null,
          "images": [
            "assets/day/d13.jpg"
          ],
          "rowRef": "最终版!A22"
        },
        {
          "time": "13:55",
          "endTime": "",
          "type": "hotel",
          "title": "入住 Premier Place Surabaya Airport",
          "detail": "",
          "note": "",
          "guideId": null,
          "flightIndex": null,
          "transportIndex": null,
          "hotelId": "h03",
          "images": [],
          "rowRef": "最终版!A22"
        }
      ],
      "untimed": [],
      "flights": [
        {
          "date": "2026-10-03",
          "from": "巴厘岛",
          "fromCode": "DPS",
          "to": "泗水",
          "toCode": "SUB",
          "dep": "13:55",
          "arr": "13:55",
          "titleRaw": "巴厘岛-泗水（泗水时间13：55到达）",
          "layover": "",
          "flightNo": "JT919",
          "flightNoNote": "",
          "platform": "携程",
          "rowRef": "最终版!A22",
          "airline": "印尼狮航",
          "airlineEn": "Lion Air",
          "fromAirport": "伍拉赖国际机场",
          "fromTerminal": "D",
          "toAirport": "朱安达国际机场",
          "toTerminal": "T1",
          "legs": [
            {
              "airline": "印尼狮航",
              "airlineEn": "Lion Air",
              "flightNo": "JT919",
              "date": "2026-10-03",
              "dep": "13:55",
              "fromCode": "DPS",
              "fromAirport": "伍拉赖国际机场",
              "fromTerminal": "D",
              "arr": "13:55",
              "arrDate": "2026-10-03",
              "toCode": "SUB",
              "toAirport": "朱安达国际机场",
              "toTerminal": "T1"
            }
          ],
          "tickets": [
            {
              "name": "WANG HAORAN",
              "ticketNo": "938-2116505870",
              "bookRef": "LDPNCI"
            },
            {
              "name": "MIN YUTING",
              "ticketNo": "938-2116505952",
              "bookRef": "CFKHUO"
            }
          ],
          "ticketNote": "",
          "timezoneNote": "巴厘岛比泗水快 1 小时，飞行约 1 小时，所以起飞与到达的钟点数字相同（13:55 巴厘岛时间起飞，13:55 泗水时间到达）",
          "orderNo": "1128150369640935",
          "orderLabel": "泗水 ⇄ 巴厘岛 往返"
        }
      ],
      "transports": [],
      "hotel": {
        "id": "h03",
        "name": "Premier Place Surabaya Airport",
        "nameEn": "Premier Place Surabaya Airport",
        "address": "Jl. Raya Bandara Juanda No.73, Semawalang, Semambung, 格当岸, 诗都阿佐县",
        "addressLines": [
          "Jl. Raya Bandara Juanda No.73, Semawalang, Semambung, 格当岸, 诗都阿佐县"
        ],
        "notes": [
          "含早"
        ],
        "stayNote": "回酒店再坐车，包车1",
        "area": "泗水",
        "images": [],
        "inherited": false
      },
      "clothing": [
        {
          "activity": "坐飞机中转",
          "top": "休闲舒适+好穿脱套装",
          "shoes": "轻便鞋",
          "bag": "双肩包"
        }
      ],
      "guides": [],
      "images": [
        "assets/day/d13.jpg"
      ],
      "rowRefs": [
        "最终版!A21",
        "最终版!A22"
      ]
    },
    {
      "date": "2026-10-04",
      "label": "10/4",
      "weekday": "周日",
      "dayIndex": 11,
      "title": "泗水 → 上海（经香港）",
      "short": "上海",
      "route": "泗水 → 香港 → 上海",
      "areas": [
        "东爪哇"
      ],
      "areaLabel": "在东爪哇",
      "weatherLocation": { "displayName": "泗水", "latitude": -7.2575, "longitude": 112.7521 },
      "isLastDay": true,
      "items": [
        {
          "time": "08:10",
          "endTime": "22:10",
          "type": "flight",
          "title": "泗水-上海",
          "detail": "",
          "note": "",
          "costNote": "",
          "guideId": null,
          "flightIndex": 6,
          "transportIndex": null,
          "hotelId": null,
          "images": [],
          "rowRef": "最终版!A23"
        }
      ],
      "untimed": [],
      "flights": [
        {
          "date": "2026-10-04",
          "from": "泗水",
          "fromCode": "SUB",
          "to": "上海",
          "toCode": "PVG",
          "dep": "08:10",
          "arr": "22:10",
          "titleRaw": "泗水-上海",
          "layover": "在香港中转 · 停留 5小时10分 · 行李直挂",
          "flightNo": "CX780 + CX362",
          "flightNoNote": "",
          "platform": "-",
          "rowRef": "最终版!A23",
          "airline": "国泰航空",
          "airlineEn": "Cathay Pacific",
          "fromAirport": "朱安达国际机场",
          "fromTerminal": "T2",
          "toAirport": "浦东国际机场",
          "toTerminal": "T2",
          "legs": [
            {
              "airline": "国泰航空",
              "airlineEn": "Cathay Pacific",
              "flightNo": "CX780",
              "date": "2026-10-04",
              "dep": "08:10",
              "fromCode": "SUB",
              "fromAirport": "朱安达国际机场",
              "fromTerminal": "T2",
              "arr": "14:10",
              "arrDate": "2026-10-04",
              "toCode": "HKG",
              "toAirport": "香港国际机场",
              "toTerminal": "T1"
            },
            {
              "airline": "国泰航空",
              "airlineEn": "Cathay Pacific",
              "flightNo": "CX362",
              "date": "2026-10-04",
              "dep": "19:20",
              "fromCode": "HKG",
              "fromAirport": "香港国际机场",
              "fromTerminal": "T1",
              "arr": "22:10",
              "arrDate": "2026-10-04",
              "toCode": "PVG",
              "toAirport": "浦东国际机场",
              "toTerminal": "T2"
            }
          ],
          "tickets": [
            {
              "name": "WANG HAORAN",
              "ticketNo": "160-4833063807",
              "bookRef": "ECKC4E"
            },
            {
              "name": "MIN YUTING",
              "ticketNo": "160-4833063806",
              "bookRef": "ECKC4E"
            }
          ],
          "ticketNote": "",
          "timezoneNote": "",
          "orderNo": "1128150135628711",
          "orderLabel": "上海 ⇄ 泗水 往返大机票",
          "segments": [
            {
              "flightNo": "CX780",
              "airline": "国泰航空",
              "fromCity": "泗水",
              "fromCode": "SUB",
              "fromAirport": "朱安达国际机场",
              "fromTerminal": "T2",
              "toCity": "香港",
              "toCode": "HKG",
              "toAirport": "香港国际机场",
              "toTerminal": "T1",
              "dep": "08:10",
              "arr": "14:10"
            },
            {
              "flightNo": "CX362",
              "airline": "国泰航空",
              "fromCity": "香港",
              "fromCode": "HKG",
              "fromAirport": "香港国际机场",
              "fromTerminal": "T1",
              "toCity": "上海",
              "toCode": "PVG",
              "toAirport": "浦东国际机场",
              "toTerminal": "T2",
              "dep": "19:20",
              "arr": "22:10"
            }
          ],
          "layoverAfter": {
            "at": "香港",
            "airport": "香港国际机场",
            "duration": "5小时10分",
            "baggageThrough": true
          }
        }
      ],
      "transports": [],
      "hotel": null,
      "clothing": [
        {
          "activity": "坐飞机中转",
          "top": "休闲舒适+好穿脱套装",
          "shoes": "轻便鞋",
          "bag": "双肩包"
        }
      ],
      "guides": [],
      "images": [],
      "rowRefs": [
        "最终版!A23"
      ]
    }
  ],
  "hotels": [
    {
      "id": "h01",
      "name": "Arum Bromo Villas",
      "nameEn": "Arum Bromo Villas",
      "address": "Jl. Raya Bromo, Dusun II Jombok rt. 08/03, Dusun 2, Sapikerep, Kec. Sukapura, Kabupaten Probolinggo, Jawa Timur 67254印度尼西亚",
      "addressLines": [
        "Jl. Raya Bromo, Dusun II Jombok rt. 08/03, Dusun 2, Sapikerep, Kec. Sukapura, Kabupaten Probolinggo, Jawa Timur 67254印度尼西亚"
      ],
      "notes": [
        "距离火山入口半小时车程"
      ],
      "stayNote": "包车1",
      "area": "bromo",
      "phone": "+62 812-3296-6800",
      "tel": "+6281232966800",
      "images": [
        "assets/hotel/h01.jpg"
      ]
    },
    {
      "id": "h02",
      "name": "AJA Homestay",
      "nameEn": "AJA Homestay",
      "address": "Jl. Krajan RT.02 RW.09 Sidomulyo Pronojiwo Lumajang, 67374 Pronojiwo, 印尼",
      "addressLines": [
        "Jl. Krajan RT.02 RW.09 Sidomulyo Pronojiwo Lumajang, 67374 Pronojiwo, 印尼"
      ],
      "notes": [
        "房间50平，含早餐，离赛武瀑布步行半小时的距离"
      ],
      "stayNote": "回酒店再坐车，包车1",
      "area": "赛武",
      "phone": "+62 853-8556-5541",
      "tel": "+6285385565541",
      "images": [
        "assets/hotel/h02.jpg",
        "assets/hotel/h03.jpg"
      ]
    },
    {
      "id": "h03",
      "name": "Premier Place Surabaya Airport",
      "nameEn": "Premier Place Surabaya Airport",
      "address": "Jl. Raya Bandara Juanda No.73, Semawalang, Semambung, 格当岸, 诗都阿佐县",
      "addressLines": [
        "Jl. Raya Bandara Juanda No.73, Semawalang, Semambung, 格当岸, 诗都阿佐县"
      ],
      "notes": [
        "含早"
      ],
      "stayNote": "回酒店再坐车，包车1",
      "area": "泗水",
      "phone": "+62 31-8685555",
      "tel": "+62318685555",
      "images": [
        "assets/hotel/h04.jpg"
      ]
    },
    {
      "id": "h04",
      "name": "埃格拉别墅",
      "nameEn": "",
      "address": "Jl Danau Tamblingan 60, Bali, 80361 沙努尔, 印尼",
      "addressLines": [
        "Jl Danau Tamblingan 60, Bali, 80361 沙努尔, 印尼"
      ],
      "notes": [
        "130平，含早，距离港口和商业圈近"
      ],
      "stayNote": "包车",
      "area": "巴厘岛",
      "phone": "+62 361-285204",
      "tel": "+62361285204",
      "images": [
        "assets/hotel/h05.jpg",
        "assets/hotel/h06.jpg"
      ]
    },
    {
      "id": "h05",
      "name": "Luciana Hotel",
      "nameEn": "Luciana Hotel",
      "address": "Gang Lewur, 86754 纳闽巴霍, 印尼",
      "addressLines": [
        "Gang Lewur, 86754 纳闽巴霍, 印尼"
      ],
      "notes": [
        "房间20平，距离机场、港口、餐厅近"
      ],
      "stayNote": "",
      "area": "科莫多岛",
      "phone": "+62 853-3788-5406",
      "tel": "+6285337885406",
      "images": [
        "assets/hotel/h07.jpg",
        "assets/hotel/h08.jpg"
      ]
    },
    {
      "id": "h06",
      "name": "Kanhara Villas Ubud by GenuineHost",
      "nameEn": "Kanhara Villas Ubud by GenuineHost",
      "address": "Jalan Raya Kumbuh, Mas, Ubud, 80571 乌布, 印尼",
      "addressLines": [
        "Jalan Raya Kumbuh, Mas, Ubud, 80571 乌布, 印尼"
      ],
      "notes": [
        "乌布villa，房间71平，带楼梯两层，有免费下午茶",
        "附近有餐馆、超市、乌布市集等，去atv很近，离海滩车程1小时"
      ],
      "stayNote": "",
      "area": "巴厘岛",
      "phone": "+62 813-2094-8556",
      "tel": "+6281320948556",
      "images": [
        "assets/hotel/h09.jpg",
        "assets/hotel/h10.jpg",
        "assets/hotel/h11.jpg",
        "assets/hotel/h12.jpg"
      ]
    }
  ],
  "flights": [
    {
      "date": "2026-09-24",
      "from": "上海",
      "fromCode": "PVG",
      "to": "吉隆坡",
      "toCode": "KUL",
      "dep": "02:10",
      "arr": "07:45",
      "titleRaw": "上海-吉隆坡（7：45到吉隆坡）",
      "layover": "在吉隆坡中转 · 停留 5小时30分 · 行李直挂",
      "flightNo": "MH387",
      "flightNoNote": "",
      "platform": "携程",
      "rowRef": "最终版!A2",
      "airline": "马来西亚航空",
      "airlineEn": "Malaysia Airlines",
      "fromAirport": "浦东国际机场",
      "fromTerminal": "T2",
      "toAirport": "吉隆坡国际机场",
      "toTerminal": "T1",
      "legs": [
        {
          "airline": "马来西亚航空",
          "airlineEn": "Malaysia Airlines",
          "flightNo": "MH387",
          "date": "2026-09-24",
          "dep": "02:10",
          "fromCode": "PVG",
          "fromAirport": "浦东国际机场",
          "fromTerminal": "T2",
          "arr": "07:45",
          "arrDate": "2026-09-24",
          "toCode": "KUL",
          "toAirport": "吉隆坡国际机场",
          "toTerminal": "T1"
        }
      ],
      "tickets": [
        {
          "name": "WANG HAORAN",
          "ticketNo": "232-9444542343",
          "bookRef": "ECN3AH"
        },
        {
          "name": "MIN YUTING",
          "ticketNo": "232-9444542342",
          "bookRef": "ECN3AH"
        }
      ],
      "ticketNote": "",
      "timezoneNote": "",
      "orderNo": "1128150135628711",
      "orderLabel": "上海 ⇄ 泗水 往返大机票",
      "layoverAfter": {
        "at": "吉隆坡",
        "airport": "吉隆坡国际机场",
        "duration": "5小时30分",
        "baggageThrough": true
      }
    },
    {
      "date": "2026-09-24",
      "from": "吉隆坡",
      "fromCode": "KUL",
      "to": "泗水",
      "toCode": "SUB",
      "dep": "13:15",
      "arr": "14:50",
      "titleRaw": "吉隆坡-泗水（14：50到达）",
      "layover": "",
      "flightNo": "MH873",
      "flightNoNote": "",
      "platform": "-",
      "rowRef": "最终版!A3",
      "airline": "马来西亚航空",
      "airlineEn": "Malaysia Airlines",
      "fromAirport": "吉隆坡国际机场",
      "fromTerminal": "T1",
      "toAirport": "朱安达国际机场",
      "toTerminal": "T2",
      "legs": [
        {
          "airline": "马来西亚航空",
          "airlineEn": "Malaysia Airlines",
          "flightNo": "MH873",
          "date": "2026-09-24",
          "dep": "13:15",
          "fromCode": "KUL",
          "fromAirport": "吉隆坡国际机场",
          "fromTerminal": "T1",
          "arr": "14:50",
          "arrDate": "2026-09-24",
          "toCode": "SUB",
          "toAirport": "朱安达国际机场",
          "toTerminal": "T2"
        }
      ],
      "tickets": [
        {
          "name": "WANG HAORAN",
          "ticketNo": "232-9444542343",
          "bookRef": "ECN3AH"
        },
        {
          "name": "MIN YUTING",
          "ticketNo": "232-9444542342",
          "bookRef": "ECN3AH"
        }
      ],
      "ticketNote": "",
      "timezoneNote": "",
      "orderNo": "1128150135628711",
      "orderLabel": "上海 ⇄ 泗水 往返大机票"
    },
    {
      "date": "2026-09-27",
      "from": "泗水",
      "fromCode": "SUB",
      "to": "巴厘岛",
      "toCode": "DPS",
      "dep": "11:15",
      "arr": "13:15",
      "titleRaw": "泗水-巴厘岛飞机（13:15到达）",
      "layover": "",
      "flightNo": "JT804",
      "flightNoNote": "",
      "platform": "携程",
      "rowRef": "最终版!A9",
      "airline": "印尼狮航",
      "airlineEn": "Lion Air",
      "fromAirport": "朱安达国际机场",
      "fromTerminal": "T1",
      "toAirport": "伍拉赖国际机场",
      "toTerminal": "D",
      "legs": [
        {
          "airline": "印尼狮航",
          "airlineEn": "Lion Air",
          "flightNo": "JT804",
          "date": "2026-09-27",
          "dep": "11:15",
          "fromCode": "SUB",
          "fromAirport": "朱安达国际机场",
          "fromTerminal": "T1",
          "arr": "13:15",
          "arrDate": "2026-09-27",
          "toCode": "DPS",
          "toAirport": "伍拉赖国际机场",
          "toTerminal": "D"
        }
      ],
      "tickets": [
        {
          "name": "WANG HAORAN",
          "ticketNo": "990-2147940097",
          "bookRef": "WZISLR"
        },
        {
          "name": "MIN YUTING",
          "ticketNo": "990-2147940098",
          "bookRef": "WZISLR"
        }
      ],
      "ticketNote": "",
      "timezoneNote": "",
      "orderNo": "1128150369640935",
      "orderLabel": "泗水 ⇄ 巴厘岛 往返"
    },
    {
      "date": "2026-09-29",
      "from": "巴厘岛",
      "fromCode": "DPS",
      "to": "科莫多岛",
      "toCode": "LBJ",
      "dep": "11:45",
      "arr": "13:00",
      "titleRaw": "巴厘岛-科莫多岛（13：00到达）",
      "layover": "",
      "flightNo": "ID6331",
      "flightNoNote": "",
      "platform": "携程",
      "rowRef": "最终版!A14",
      "airline": "印尼峇迪航空",
      "airlineEn": "Batik Air",
      "fromAirport": "伍拉赖国际机场",
      "fromTerminal": "D",
      "toAirport": "科莫多国际机场",
      "toTerminal": "",
      "legs": [
        {
          "airline": "印尼峇迪航空",
          "airlineEn": "Batik Air",
          "flightNo": "ID6331",
          "date": "2026-09-29",
          "dep": "11:45",
          "fromCode": "DPS",
          "fromAirport": "伍拉赖国际机场",
          "fromTerminal": "D",
          "arr": "13:00",
          "arrDate": "2026-09-29",
          "toCode": "LBJ",
          "toAirport": "科莫多国际机场",
          "toTerminal": ""
        }
      ],
      "tickets": [
        {
          "name": "WANG HAORAN",
          "ticketNo": null,
          "bookRef": "WWGNVG"
        },
        {
          "name": "MIN YUTING",
          "ticketNo": null,
          "bookRef": "WWGNVG"
        }
      ],
      "ticketNote": "行程单未提供票号，值机时可用航司预订编码 WWGNVG",
      "timezoneNote": "",
      "orderNo": "1128150369416423",
      "orderLabel": "巴厘岛 ⇄ 下拉布安 往返"
    },
    {
      "date": "2026-10-01",
      "from": "科莫多岛",
      "fromCode": "LBJ",
      "to": "巴厘岛",
      "toCode": "DPS",
      "dep": "09:50",
      "arr": "11:00",
      "titleRaw": "科莫多岛-巴厘岛（11：00到达）",
      "layover": "",
      "flightNo": "ID6332",
      "flightNoNote": "",
      "platform": "Booking",
      "rowRef": "最终版!A17",
      "airline": "印尼峇迪航空",
      "airlineEn": "Batik Air",
      "fromAirport": "科莫多国际机场",
      "fromTerminal": "",
      "toAirport": "伍拉赖国际机场",
      "toTerminal": "D",
      "legs": [
        {
          "airline": "印尼峇迪航空",
          "airlineEn": "Batik Air",
          "flightNo": "ID6332",
          "date": "2026-10-01",
          "dep": "09:50",
          "fromCode": "LBJ",
          "fromAirport": "科莫多国际机场",
          "fromTerminal": "",
          "arr": "11:00",
          "arrDate": "2026-10-01",
          "toCode": "DPS",
          "toAirport": "伍拉赖国际机场",
          "toTerminal": "D"
        }
      ],
      "tickets": [
        {
          "name": "WANG HAORAN",
          "ticketNo": null,
          "bookRef": "WWGNVG"
        },
        {
          "name": "MIN YUTING",
          "ticketNo": null,
          "bookRef": "WWGNVG"
        }
      ],
      "ticketNote": "行程单未提供票号，值机时可用航司预订编码 WWGNVG",
      "timezoneNote": "",
      "orderNo": "1128150369416423",
      "orderLabel": "巴厘岛 ⇄ 下拉布安 往返"
    },
    {
      "date": "2026-10-03",
      "from": "巴厘岛",
      "fromCode": "DPS",
      "to": "泗水",
      "toCode": "SUB",
      "dep": "13:55",
      "arr": "13:55",
      "titleRaw": "巴厘岛-泗水（泗水时间13：55到达）",
      "layover": "",
      "flightNo": "JT919",
      "flightNoNote": "",
      "platform": "携程",
      "rowRef": "最终版!A22",
      "airline": "印尼狮航",
      "airlineEn": "Lion Air",
      "fromAirport": "伍拉赖国际机场",
      "fromTerminal": "D",
      "toAirport": "朱安达国际机场",
      "toTerminal": "T1",
      "legs": [
        {
          "airline": "印尼狮航",
          "airlineEn": "Lion Air",
          "flightNo": "JT919",
          "date": "2026-10-03",
          "dep": "13:55",
          "fromCode": "DPS",
          "fromAirport": "伍拉赖国际机场",
          "fromTerminal": "D",
          "arr": "13:55",
          "arrDate": "2026-10-03",
          "toCode": "SUB",
          "toAirport": "朱安达国际机场",
          "toTerminal": "T1"
        }
      ],
      "tickets": [
        {
          "name": "WANG HAORAN",
          "ticketNo": "938-2116505870",
          "bookRef": "LDPNCI"
        },
        {
          "name": "MIN YUTING",
          "ticketNo": "938-2116505952",
          "bookRef": "CFKHUO"
        }
      ],
      "ticketNote": "",
      "timezoneNote": "巴厘岛比泗水快 1 小时，飞行约 1 小时，所以起飞与到达的钟点数字相同（13:55 巴厘岛时间起飞，13:55 泗水时间到达）",
      "orderNo": "1128150369640935",
      "orderLabel": "泗水 ⇄ 巴厘岛 往返"
    },
    {
      "date": "2026-10-04",
      "from": "泗水",
      "fromCode": "SUB",
      "to": "上海",
      "toCode": "PVG",
      "dep": "08:10",
      "arr": "22:10",
      "titleRaw": "泗水-上海",
      "layover": "在香港中转 · 停留 5小时10分 · 行李直挂",
      "flightNo": "CX780 + CX362",
      "flightNoNote": "",
      "platform": "-",
      "rowRef": "最终版!A23",
      "airline": "国泰航空",
      "airlineEn": "Cathay Pacific",
      "fromAirport": "朱安达国际机场",
      "fromTerminal": "T2",
      "toAirport": "浦东国际机场",
      "toTerminal": "T2",
      "legs": [
        {
          "airline": "国泰航空",
          "airlineEn": "Cathay Pacific",
          "flightNo": "CX780",
          "date": "2026-10-04",
          "dep": "08:10",
          "fromCode": "SUB",
          "fromAirport": "朱安达国际机场",
          "fromTerminal": "T2",
          "arr": "14:10",
          "arrDate": "2026-10-04",
          "toCode": "HKG",
          "toAirport": "香港国际机场",
          "toTerminal": "T1"
        },
        {
          "airline": "国泰航空",
          "airlineEn": "Cathay Pacific",
          "flightNo": "CX362",
          "date": "2026-10-04",
          "dep": "19:20",
          "fromCode": "HKG",
          "fromAirport": "香港国际机场",
          "fromTerminal": "T1",
          "arr": "22:10",
          "arrDate": "2026-10-04",
          "toCode": "PVG",
          "toAirport": "浦东国际机场",
          "toTerminal": "T2"
        }
      ],
      "tickets": [
        {
          "name": "WANG HAORAN",
          "ticketNo": "160-4833063807",
          "bookRef": "ECKC4E"
        },
        {
          "name": "MIN YUTING",
          "ticketNo": "160-4833063806",
          "bookRef": "ECKC4E"
        }
      ],
      "ticketNote": "",
      "timezoneNote": "",
      "orderNo": "1128150135628711",
      "orderLabel": "上海 ⇄ 泗水 往返大机票",
      "segments": [
        {
          "flightNo": "CX780",
          "airline": "国泰航空",
          "fromCity": "泗水",
          "fromCode": "SUB",
          "fromAirport": "朱安达国际机场",
          "fromTerminal": "T2",
          "toCity": "香港",
          "toCode": "HKG",
          "toAirport": "香港国际机场",
          "toTerminal": "T1",
          "dep": "08:10",
          "arr": "14:10"
        },
        {
          "flightNo": "CX362",
          "airline": "国泰航空",
          "fromCity": "香港",
          "fromCode": "HKG",
          "fromAirport": "香港国际机场",
          "fromTerminal": "T1",
          "toCity": "上海",
          "toCode": "PVG",
          "toAirport": "浦东国际机场",
          "toTerminal": "T2",
          "dep": "19:20",
          "arr": "22:10"
        }
      ],
      "layoverAfter": {
        "at": "香港",
        "airport": "香港国际机场",
        "duration": "5小时10分",
        "baggageThrough": true
      }
    }
  ],
  "transports": [
    {
      "date": "2026-09-24",
      "from": "泗水",
      "to": "bromo旁酒店",
      "dep": "15:30",
      "arr": "18:30",
      "duration": "约 2 小时",
      "detail": "包车1",
      "note": "",
      "rowRef": "最终版!A4"
    },
    {
      "date": "2026-09-25",
      "from": "bromo",
      "to": "赛武旁酒店",
      "dep": "12:00",
      "arr": "16:00",
      "duration": "约 4 小时",
      "detail": "回酒店再坐车，包车1",
      "note": "",
      "rowRef": "最终版!A6"
    },
    {
      "date": "2026-09-26",
      "from": "赛武",
      "to": "泗水机场旁酒店",
      "dep": "13:30",
      "arr": "17:30",
      "duration": "约 4 小时",
      "detail": "回酒店再坐车，包车1",
      "note": "",
      "rowRef": "最终版!A8"
    },
    {
      "date": "2026-09-27",
      "from": "巴厘岛",
      "to": "酒店",
      "dep": "13:45",
      "arr": "14:30",
      "duration": "",
      "detail": "包车",
      "note": "",
      "rowRef": "最终版!A10"
    }
  ],
  "guides": {
    "bromo": {
      "id": "bromo",
      "name": "bromo火山",
      "displayName": "Bromo 火山",
      "flow": "酒店 → Jeep → 日出观景点停车区 → 步行到观景点 → Jeep下山 → 沙海 → Bromo 火山脚下停车区 → 步行/骑马 → 火山口台阶 → 原路回来 → Jeep继续沙海/草原 → 酒店。",
      "blocks": [
        {
          "time": "02:00–03:00",
          "content": "酒店 → 日出观景点附近",
          "spot": "King Kong Hill",
          "note": "更近，人更少，云多的话选择Penanjakan 1"
        },
        {
          "time": "03:00–04:30",
          "content": "停车、步行、占位置",
          "spot": "",
          "note": ""
        },
        {
          "time": "约05:00–06:00",
          "content": "日出 + 蓝调时刻 + Bromo/Semeru全景",
          "spot": "",
          "note": ""
        },
        {
          "time": "06:00–07:00",
          "content": "Jeep 下到沙海",
          "spot": "",
          "note": ""
        },
        {
          "time": "07:00–07:30",
          "content": "沙海、Jeep、人像拍照",
          "spot": "",
          "note": ""
        },
        {
          "time": "07:30–09:00",
          "content": "Bromo 火山口 / 步行或骑马 + 台阶",
          "spot": "",
          "note": ""
        },
        {
          "time": "09:00–10:00",
          "content": "Whispering Sands / 草原 / Teletubbies Hill 选一两个",
          "spot": "Teletubbies Hill",
          "note": ""
        },
        {
          "time": "10:00–11:00",
          "content": "早餐 / 回酒店 / 收拾",
          "spot": "",
          "note": ""
        }
      ],
      "cautions": [
        "需要做好保暖",
        "山上5-10度，风巨大",
        "帽子，冲锋衣"
      ],
      "extras": [
        "手电筒/头灯",
        "口罩",
        "现金",
        "登山杖"
      ],
      "priceNote": "骑马价格对半砍：往返200k",
      "links": [
        "https://www.bilibili.com/video/BV11G411r7mN/",
        "https://www.bilibili.com/video/BV1i9S1BmEnd"
      ],
      "highlights": [
        "King Kong Hill",
        "沙海 Whispering Sands",
        "Teletubbies Hill",
        "Bromo 火山口"
      ]
    }
  },
  "foods": [
    {
      "id": "f01",
      "nameId": "Soto Ayam",
      "nameCn": "鸡肉黄汤",
      "nameCnSource": "ai",
      "category": "汤类",
      "spicy": "",
      "desc": "印尼国民鸡汤。汤色金黄（姜黄 + 香茅熬出），配米粉或米糕、豆芽、炸红葱，挤青柠提味。口味清淡不辣，是最稳妥的入门选择。",
      "ingredients": "鸡肉、姜黄、香茅、米粉、豆芽、炸红葱",
      "region": [],
      "supplemented": true,
      "excelRaw": "Soto Ayam",
      "rowRef": "食物攻略!A2",
      "img": "assets/food/f01.jpg"
    },
    {
      "id": "f02",
      "nameId": "Nasi Goreng",
      "nameCn": "炒饭",
      "nameCnSource": "excel",
      "category": "主食",
      "spicy": "",
      "desc": "印尼炒饭，用甜酱油（Kecap Manis）大火翻炒，锅气足、偏甜。常见配煎蛋、炸鸡、虾片、黄瓜番茄。",
      "ingredients": "米饭、甜酱油、蒜、红葱、鸡蛋、虾片",
      "region": [],
      "supplemented": true,
      "excelRaw": "Nasi Goreng 炒饭",
      "rowRef": "食物攻略!A3",
      "img": "assets/food/f02.jpg"
    },
    {
      "id": "f03",
      "nameId": "Mie Goreng",
      "nameCn": "炒面",
      "nameCnSource": "excel",
      "category": "主食",
      "spicy": "",
      "desc": "印尼炒面，酱汁与炒饭同类，甜咸口；常见配鸡肉或虾、青菜，上面加一个煎蛋。",
      "ingredients": "鸡蛋面、甜酱油、蒜、鸡肉/虾、青菜",
      "region": [],
      "supplemented": true,
      "excelRaw": "Mie Goreng 炒面",
      "rowRef": "食物攻略!A4",
      "img": "assets/food/f03.jpg"
    },
    {
      "id": "f04",
      "nameId": "Sate Ayam",
      "nameCn": "鸡肉沙爹",
      "nameCnSource": "excel",
      "category": "小吃",
      "spicy": "",
      "desc": "炭烤鸡肉串，先腌姜黄与香茅再烤。灵魂是花生酱（Bumbu Kacang），配黄瓜、洋葱与米糕 Lontong。微甜微辣。",
      "ingredients": "鸡肉、花生酱、姜黄、香茅、甜酱油",
      "region": [],
      "supplemented": true,
      "excelRaw": "Sate Ayam 鸡肉沙爹",
      "rowRef": "食物攻略!A5",
      "img": "assets/food/f04.jpg"
    },
    {
      "id": "f05",
      "nameId": "Gado-Gado",
      "nameCn": "花生酱拌蔬菜",
      "nameCnSource": "excel",
      "category": "其他",
      "spicy": "",
      "desc": "印尼式蔬菜沙拉：焯过的蔬菜 + 豆腐 + 天贝 + 水煮蛋，淋浓稠花生酱汁。本身不辣，辣来自另配的辣椒酱。",
      "ingredients": "豆角、卷心菜、豆腐、天贝、花生酱",
      "region": [],
      "supplemented": true,
      "excelRaw": "Gado-Gado 花生酱拌蔬菜",
      "rowRef": "食物攻略!A6",
      "img": "assets/food/f05.jpg"
    },
    {
      "id": "f06",
      "nameId": "Bakso",
      "nameCn": "肉丸汤",
      "nameCnSource": "excel",
      "category": "汤类",
      "spicy": "",
      "desc": "牛肉丸汤，丸子弹牙，汤头清亮，配米粉或面、炸红葱、芹菜，可另加辣椒酱。",
      "ingredients": "牛肉丸、牛骨汤、米粉/面、炸红葱、芹菜",
      "region": [],
      "supplemented": true,
      "excelRaw": "Bakso 肉丸汤",
      "rowRef": "食物攻略!A7",
      "img": "assets/food/f06.jpg"
    },
    {
      "id": "f07",
      "nameId": "Tempe Goreng",
      "nameCn": "豆饼",
      "nameCnSource": "excel",
      "category": "小吃",
      "spicy": "",
      "desc": "发酵大豆饼（天贝）切片油炸，带坚果般的发酵香。最常见的配菜，常蘸辣椒酱或甜酱油。",
      "ingredients": "天贝（发酵大豆）、盐、姜黄、油",
      "region": [],
      "supplemented": true,
      "excelRaw": "Tempe Goreng 豆饼",
      "rowRef": "食物攻略!A8",
      "img": "assets/food/f07.jpg"
    },
    {
      "id": "f08",
      "nameId": "Tahu Goreng",
      "nameCn": "炸豆腐",
      "nameCnSource": "excel",
      "category": "小吃",
      "spicy": "",
      "desc": "炸豆腐，外酥内软，通常蘸甜酱油辣椒或花生酱。素食友好。",
      "ingredients": "豆腐、蒜、盐、油",
      "region": [],
      "supplemented": true,
      "excelRaw": "Tahu Goreng 炸豆腐",
      "rowRef": "食物攻略!A9",
      "img": "assets/food/f08.jpg"
    },
    {
      "id": "f09",
      "nameId": "Rawon",
      "nameCn": "果仁牛肉汤",
      "nameCnSource": "excel",
      "category": "汤类",
      "spicy": "",
      "desc": "东爪哇名物。用黑果（Kluwek）熬出墨黑色汤底，牛肉炖到软烂，配豆芽与咸蛋。味道浓厚、带坚果香与轻微酸味，不算辣。",
      "ingredients": "牛肉、黑果（Kluwek）、香茅、南姜、豆芽",
      "region": [
        "东爪哇"
      ],
      "supplemented": true,
      "excelRaw": "Rawon 果仁牛肉汤",
      "rowRef": "食物攻略!A10",
      "img": "assets/food/f09.jpg"
    },
    {
      "id": "f10",
      "nameId": "Rujak Cingur",
      "nameCn": "牛嘴肉",
      "nameCnSource": "excel",
      "category": "小吃",
      "spicy": "",
      "desc": "泗水（东爪哇）特色沙拉。主角是煮软切片的水牛/牛嘴肉，配蔬果与米糕，浇虾酱花生酱汁（Petis）。味道浓郁偏甜辣，属当地『挑战型』小吃，敢吃再点。",
      "ingredients": "牛嘴肉、青木瓜/菠萝、米糕、虾酱（Petis）、花生",
      "region": [
        "东爪哇"
      ],
      "supplemented": true,
      "excelRaw": "Rujak Cingur 牛嘴肉",
      "rowRef": "食物攻略!A11",
      "img": "assets/food/f10.jpg"
    },
    {
      "id": "f11",
      "nameId": "Babi Guling",
      "nameCn": "烤乳猪饭",
      "nameCnSource": "excel",
      "category": "主食",
      "spicy": "",
      "desc": "巴厘岛招牌菜。整只乳猪塞满香料慢烤，皮脆肉嫩，配米饭、Lawar、香肠与猪皮。以香料味为主，辣来自另配的辣椒酱。",
      "ingredients": "乳猪、香茅、姜黄、南姜、香叶",
      "region": [
        "巴厘"
      ],
      "supplemented": true,
      "excelRaw": "Babi Guling 烤乳猪饭",
      "rowRef": "食物攻略!A12",
      "img": "assets/food/f11.jpg"
    },
    {
      "id": "f12",
      "nameId": "Ayam Betutu",
      "nameCn": "姜黄鸡/鸭",
      "nameCnSource": "excel",
      "category": "主食",
      "spicy": "",
      "desc": "巴厘岛传统做法：鸡或鸭裹满 Betutu 香料慢烤/慢炖数小时，肉极软、香气浓，微辣。",
      "ingredients": "鸡/鸭、姜黄、南姜、香茅、辣椒",
      "region": [
        "巴厘"
      ],
      "supplemented": true,
      "excelRaw": "Ayam Betutu 姜黄鸡/鸭",
      "rowRef": "食物攻略!A13",
      "img": "assets/food/f12.jpg"
    },
    {
      "id": "f13",
      "nameId": "Lawar",
      "nameCn": "四季豆肉沫",
      "nameCnSource": "excel",
      "category": "其他",
      "spicy": "",
      "desc": "巴厘岛配菜，四季豆（或椰子芯）拌肉沫、椰丝与香料。传统版本会加血，介意可以说 tidak pakai darah（不要血）。",
      "ingredients": "四季豆、肉沫、椰丝、香茅、辣椒",
      "region": [
        "巴厘"
      ],
      "supplemented": true,
      "excelRaw": "Lawar 四季豆肉沫",
      "rowRef": "食物攻略!A14",
      "img": "assets/food/f13.jpg"
    },
    {
      "id": "f14",
      "nameId": "Sate Lilit",
      "nameCn": "沙爹肉棒",
      "nameCnSource": "excel",
      "category": "小吃",
      "spicy": "",
      "desc": "巴厘版沙爹：把鱼肉或鸡肉碎加椰丝与香料，裹在香茅或竹签上炭烤，不蘸花生酱，肉香里带椰香。",
      "ingredients": "鱼肉/鸡肉碎、椰丝、姜黄、香茅",
      "region": [
        "巴厘"
      ],
      "supplemented": true,
      "excelRaw": "Sate Lilit 沙爹肉棒",
      "rowRef": "食物攻略!A15",
      "img": "assets/food/f14.jpg"
    },
    {
      "id": "f15",
      "nameId": "Sambal Matah",
      "nameCn": "辣椒酱",
      "nameCnSource": "excel",
      "category": "其他",
      "spicy": "",
      "desc": "巴厘岛标志性生辣椒酱：红葱、香茅、柠檬叶切碎后浇热油，酸辣清香。常用于配烤鱼、烤鸡。辣度中等偏上。",
      "ingredients": "红葱、香茅、柠檬叶、辣椒、椰油",
      "region": [
        "巴厘"
      ],
      "supplemented": true,
      "excelRaw": "Sambal Matah 辣椒酱",
      "rowRef": "食物攻略!A16",
      "img": "assets/food/f15.jpg"
    },
    {
      "id": "f16",
      "nameId": "Ikan Kuah Asam",
      "nameCn": "酸鱼汤",
      "nameCnSource": "excel",
      "category": "汤类",
      "spicy": "",
      "desc": "弗洛勒斯 / 纳闽巴霍一带的酸鱼汤，用罗望子或青柠让汤清酸开胃，鱼肉新鲜，通常微辣。",
      "ingredients": "鲜鱼、罗望子/青柠、番茄、香茅、辣椒",
      "region": [
        "科莫多/弗洛勒斯"
      ],
      "supplemented": true,
      "excelRaw": "Ikan Kuah Asam 酸鱼汤",
      "rowRef": "食物攻略!A17",
      "img": "assets/food/f16.jpg"
    },
    {
      "id": "f17",
      "nameId": "Catemak Jagung",
      "nameCn": "玉米炖菜",
      "nameCnSource": "excel",
      "category": "汤类",
      "spicy": "",
      "desc": "弗洛勒斯家常炖菜：玉米 + 长豆 + 南瓜或木薯煮在清汤里，味道清甜，素食友好。",
      "ingredients": "玉米、长豆、南瓜、香茅、南姜",
      "region": [
        "科莫多/弗洛勒斯"
      ],
      "supplemented": true,
      "excelRaw": "Catemak Jagung 玉米炖菜",
      "rowRef": "食物攻略!A18",
      "img": "assets/food/f17.jpg"
    },
    {
      "id": "f18",
      "nameId": "Tapa Kolo",
      "nameCn": "竹筒饭",
      "nameCnSource": "excel",
      "category": "主食",
      "spicy": "",
      "desc": "弗洛勒斯特色：米与配料装进竹筒明火烤熟，带淡淡竹香，常配烤鸡或熏肉。",
      "ingredients": "米、竹筒、椰浆、香叶",
      "region": [
        "科莫多/弗洛勒斯"
      ],
      "supplemented": true,
      "excelRaw": "Tapa Kolo 竹筒饭",
      "rowRef": "食物攻略!A19",
      "img": "assets/food/f18.jpg"
    },
    {
      "id": "f19",
      "nameId": "Se'i",
      "nameCn": "切片烟熏牛肉/猪肉",
      "nameCnSource": "excel",
      "category": "主食",
      "spicy": "",
      "desc": "弗洛勒斯与帝汶一带的名物。肉用木柴烟熏后再切片，风味浓烈，接近烟熏培根，常配米饭与辣椒酱。",
      "ingredients": "牛肉/猪肉、盐、木柴烟熏",
      "region": [
        "科莫多/弗洛勒斯"
      ],
      "supplemented": true,
      "excelRaw": "Se'i 切片烟熏牛肉/猪肉",
      "rowRef": "食物攻略!A20",
      "img": "assets/food/f19.jpg"
    },
    {
      "id": "f20",
      "nameId": "Ikan Bakar",
      "nameCn": "烤鱼",
      "nameCnSource": "excel",
      "category": "主食",
      "spicy": "",
      "desc": "炭烤鱼，抹香料或甜酱油，外皮焦香。海边餐厅常见，配辣椒酱与米饭。可以要求不辣（tidak pedas）。",
      "ingredients": "鲜鱼、甜酱油、香茅、青柠",
      "region": [],
      "supplemented": true,
      "excelRaw": "Ikan Bakar 烤鱼",
      "rowRef": "食物攻略!A21",
      "img": "assets/food/f20.jpg"
    },
    {
      "id": "f21",
      "nameId": "Es Cendol/Es Campur",
      "nameCn": "混合甜品",
      "nameCnSource": "excel",
      "category": "其他",
      "spicy": "",
      "desc": "冰甜品：椰浆 + 椰糖（Gula Melaka）+ 绿色米粉条 / 椰果 / 仙草，甜而不腻，天热时必点。",
      "ingredients": "椰浆、椰糖、米粉条、刨冰",
      "region": [],
      "supplemented": true,
      "excelRaw": "Es Cendol/Es Campur 混合甜品",
      "rowRef": "食物攻略!A22",
      "img": "assets/food/f21.jpg"
    },
    {
      "id": "f22",
      "nameId": "Pisang Goreng",
      "nameCn": "炸香蕉",
      "nameCnSource": "excel",
      "category": "小吃",
      "spicy": "",
      "desc": "裹面糊油炸的香蕉，外脆内甜，趁热吃最好，配咖啡或茶。",
      "ingredients": "香蕉、面糊、糖、油",
      "region": [],
      "supplemented": true,
      "excelRaw": "Pisang Goreng 炸香蕉",
      "rowRef": "食物攻略!A23",
      "img": "assets/food/f22.jpg"
    },
    {
      "id": "f23",
      "nameId": "Klepon",
      "nameCn": "椰丝棕榈糖球",
      "nameCnSource": "excel",
      "category": "小吃",
      "spicy": "",
      "desc": "糯米小球，咬开会流出棕榈糖浆，外层裹椰丝。整口吃、小心烫口。",
      "ingredients": "糯米粉、棕榈糖、椰丝",
      "region": [],
      "supplemented": true,
      "excelRaw": "Klepon 椰丝棕榈糖球",
      "rowRef": "食物攻略!A24",
      "img": "assets/food/f23.jpg"
    },
    {
      "id": "f24",
      "nameId": "Emping",
      "nameCn": "微苦薯片",
      "nameCnSource": "excel",
      "category": "小吃",
      "spicy": "",
      "desc": "用 Melinjo 果仁压片炸成的脆片，带轻微苦味，常作配菜或下酒小食。",
      "ingredients": "Melinjo 果仁、盐、油",
      "region": [],
      "supplemented": true,
      "excelRaw": "Emping 微苦薯片",
      "rowRef": "食物攻略!A25",
      "img": "assets/food/f24.jpg"
    },
    {
      "id": "f25",
      "nameId": "Sambal Terasi",
      "nameCn": "虾酱辣椒糊",
      "nameCnSource": "excel",
      "category": "其他",
      "spicy": "",
      "desc": "虾酱 + 辣椒 + 番茄舂捣成的辣酱，发酵鲜味重，是印尼餐桌最常见的蘸料之一。辣度偏高。",
      "ingredients": "辣椒、虾酱（Terasi）、番茄、糖",
      "region": [],
      "supplemented": true,
      "excelRaw": "Sambal Terasi 虾酱辣椒糊",
      "rowRef": "食物攻略!A26",
      "img": "assets/food/f25.jpg"
    },
    {
      "id": "f26",
      "nameId": "Sambal Bajak",
      "nameCn": "炒制型红辣椒酱",
      "nameCnSource": "excel",
      "category": "其他",
      "spicy": "",
      "desc": "用油炒过的辣椒酱，加红葱、蒜、棕榈糖熬制，辣中带甜香，比生辣椒酱温和一些。",
      "ingredients": "红辣椒、红葱、蒜、棕榈糖、油",
      "region": [],
      "supplemented": true,
      "excelRaw": "Sambal Bajak  炒制型红辣椒酱",
      "rowRef": "食物攻略!A27",
      "img": "assets/food/f26.jpg"
    },
    {
      "id": "f27",
      "nameId": "Sambal Kecap",
      "nameCn": "甜酱油＋生辣椒红葱",
      "nameCnSource": "excel",
      "category": "其他",
      "spicy": "",
      "desc": "甜酱油拌入生辣椒与红葱，几乎不辣，甜咸适口，常配烤鸡、烤鱼。怕辣可以选这个。",
      "ingredients": "甜酱油、辣椒、红葱、青柠",
      "region": [],
      "supplemented": true,
      "excelRaw": "Sambal Kecap 甜酱油＋生辣椒红葱",
      "rowRef": "食物攻略!A28",
      "img": "assets/food/f27.jpg"
    },
    {
      "id": "f28",
      "nameId": "Acar",
      "nameCn": "腌黄瓜胡萝卜",
      "nameCnSource": "excel",
      "category": "其他",
      "spicy": "",
      "desc": "糖醋腌渍的黄瓜、胡萝卜（有时加菠萝），酸甜清爽，用来中和油炸食物。",
      "ingredients": "黄瓜、胡萝卜、醋、糖",
      "region": [],
      "supplemented": true,
      "excelRaw": "Acar 腌黄瓜胡萝卜",
      "rowRef": "食物攻略!A29",
      "img": "assets/food/f28.jpg"
    },
    {
      "id": "r01",
      "type": "restaurant",
      "nameId": "Serai",
      "nameCn": "Serai 现代马来料理",
      "englishName": "Serai @ KLIA Terminal 1",
      "subtitle": "现代马来料理 · KLIA T1",
      "category": "机场餐厅",
      "region": ["吉隆坡机场"],
      "airport": "吉隆坡国际机场 (KLIA)",
      "terminal": "Terminal 1",
      "area": "卫星大楼 (Satellite Building) 夹层",
      "isAirside": true,
      "locationDesc": "KLIA T1 卫星大楼（Satellite Building）夹层 Mezzanine Level（出境禁区内，近搭乘航站接驳巴士/电车区域）",
      "hours": "06:00 - 22:30",
      "desc": "吉隆坡知名现代马来餐厅品牌，环境优雅明亮、绿植与现代南洋风设计，出品稳定，是吉隆坡机场转机极具口碑的高品质正餐选择。",
      "dishes": [
        { "name": "Serai Platter", "note": "招牌拼盘，集合香料饭、仁当牛肉、参巴鱿鱼与特制炸鸡等经典马来风味" },
        { "name": "Nasi Lemak with Rendang Beef", "note": "浓郁椰浆饭搭配慢炖醇厚仁当牛肉，香气浓郁" },
        { "name": "Serai Iced Tea", "note": "融入新鲜香茅与薄荷叶的招牌冷饮，甘冽解腻，长途飞行后提神首选" }
      ],
      "transferTip": "适合转机时间充裕（2小时以上）、想坐下来舒舒服服享用高品质马来正餐的旅客。",
      "img": "assets/food/serai-klia.webp",
      "mapUrl": "https://www.google.com/maps/search/?api=1&query=Serai+KLIA+Terminal+1"
    },
    {
      "id": "r02",
      "type": "restaurant",
      "nameId": "Grandmama's",
      "nameCn": "Grandmama's 传统马来风味",
      "englishName": "Grandmama's Flavours of Malaysia @ KLIA T1",
      "subtitle": "传统马来风味 · KLIA T1",
      "category": "机场餐厅",
      "region": ["吉隆坡机场"],
      "airport": "吉隆坡国际机场 (KLIA)",
      "terminal": "Terminal 1",
      "area": "卫星大楼 (Satellite Building) 夹层 Level 2",
      "isAirside": true,
      "locationDesc": "KLIA T1 卫星大楼（Satellite Building）夹层 Level 2 (Lot MSS 35 & 36)，店门口有标志性的老奶奶骑摩托车立体雕塑",
      "hours": "06:00 - 22:30",
      "desc": "主打马来西亚经典家常风味的知名连锁，门口标志性的老奶奶骑哈雷摩托非常醒目。集合了椰浆饭、怡保河粉、海南鸡饭等地道南洋美味，份量实在、出餐迅速。",
      "dishes": [
        { "name": "Nasi Lemak 招牌椰浆饭", "note": "经典传统风味，配酥脆大炸鸡腿、参巴小银鱼、水煮蛋与炸花生，香浓地道" },
        { "name": "怡保鸡丝河粉 / 炒粿条", "note": "大火翻炒镬气十足，清汤河粉鲜香暖胃，偏华人南洋亲切风味" },
        { "name": "珍多冰 Cendol", "note": "斑兰香兰粉条、椰浆与浓郁马六甲椰糖刨冰，清凉解暑" }
      ],
      "transferTip": "适合想快速吃上一顿地道传统马来西亚家常味道的旅客，出餐较快，口味亲切稳妥。",
      "img": "assets/food/grandmamas-klia.webp",
      "mapUrl": "https://www.google.com/maps/search/?api=1&query=Grandmamas+KLIA+Terminal+1"
    },
    {
      "id": "r03",
      "type": "restaurant",
      "nameId": "敏华冰厅",
      "nameCn": "敏华冰厅 经典港式茶餐厅",
      "englishName": "Men Wah Bing Teng @ HKIA Terminal 1",
      "subtitle": "经典港式茶餐厅 · 香港T1",
      "category": "机场餐厅",
      "region": ["香港机场"],
      "airport": "香港国际机场 (HKIA)",
      "terminal": "一号客运大楼 (Terminal 1)",
      "area": "离港层（L7）离境后禁区",
      "isAirside": true,
      "locationDesc": "一号客运大楼 离港层（L7）离境后禁区，近 40-80 号登机闸口的美食广场区域",
      "hours": "06:30 - 23:00",
      "desc": "源自 1970 年代香港九龙的经典冰厅品牌，主打厚切叉烧、流心煎蛋饭与怀旧港式饮品，出餐极快，是香港机场转机补充体能的超高人气热食之选。",
      "dishes": [
        { "name": "敏华黯然销魂饭", "note": "镇店招牌！厚切蜜汁叉烧外焦里嫩，搭配双流心太阳蛋与特调甜豉油，拌饭一绝" },
        { "name": "港式丝袜奶茶 / 滚水蛋", "note": "茶味浓郁厚重、奶香丝滑，长途飞行转机提神解乏首选" },
        { "name": "新鲜酥皮蛋挞", "note": "新鲜出炉外皮层层酥脆，蛋浆嫩滑奶香浓郁" }
      ],
      "transferTip": "适合登机前快速吃一顿暖胃充实的港式热餐，出餐节奏快，闸口前补充体力极佳。",
      "img": "assets/food/men-wah-hkia.webp",
      "mapUrl": "https://www.hongkongairport.com/sc/shop-dine/dining/men-wah-bing-teng"
    },
    {
      "id": "r04",
      "type": "restaurant",
      "nameId": "正斗粥面专家",
      "nameCn": "正斗粥面专家 经典粥面",
      "englishName": "Tasty Congee & Noodle Wantun Shop @ HKIA T1",
      "subtitle": "米其林推荐粥面 · 香港T1",
      "category": "机场餐厅",
      "region": ["香港机场"],
      "airport": "香港国际机场 (HKIA)",
      "terminal": "一号客运大楼 (Terminal 1)",
      "area": "离港层（L7）离境后禁区",
      "isAirside": true,
      "locationDesc": "一号客运大楼 离港层（L7）离境后禁区，近 21-28 号登机闸口（南美食广场）",
      "hours": "06:00 - 23:00",
      "desc": "香港米其林必比登 / 入选推荐的老牌名店，传承自何洪记云吞面世家。以慢火慢熬的顺滑生滚粥、大地鱼虾籽鲜汤以及爽脆弹牙的鲜虾云吞闻名，飞行前后暖胃舒坦之极。",
      "dishes": [
        { "name": "正斗鲜虾云吞面", "note": "米其林推荐！大地鱼鲜汤底清甜不腻，全鸭蛋竹升面爽脆弹牙，每颗云吞包裹整颗鲜甜海虾" },
        { "name": "干炒牛河", "note": "考量厨师功力的招牌，猛火快炒镬气十足，牛肉滑嫩，河粉油亮干爽不上头" },
        { "name": "状元及第粥 / 皮蛋瘦肉粥", "note": "生滚粥底熬至米粒开花如丝绢绵密，热气腾腾，长途飞行后最抚慰脾胃" }
      ],
      "transferTip": "米其林推荐名店，适合在转机时想喝一碗滚烫绵密生滚粥或清鲜云吞面暖胃养胃的旅客。",
      "img": "assets/food/tasty-congee-hkia.webp",
      "mapUrl": "https://www.hongkongairport.com/sc/shop-dine/dining/tasty-congee-noodle-wantun-shop"
    }
  ],
  "costs": [
    {
      "date": "2026-09-24",
      "item": "往返大机票",
      "cny": "10448",
      "idrK": "27708.096000000001",
      "status": "已支付",
      "platform": "携程",
      "cancelBy": "",
      "note": "",
      "rowRef": "最终版!L2"
    },
    {
      "date": "2026-09-24",
      "item": "bromo酒店",
      "cny": "286",
      "idrK": "758.47199999999998",
      "status": "已支付",
      "platform": "Airbnb",
      "cancelBy": "2026-09-10",
      "note": "",
      "rowRef": "最终版!L4"
    },
    {
      "date": "2026-09-25",
      "item": "爪洼岛定制行程",
      "cny": "2560",
      "idrK": "6789.12",
      "status": "已支付",
      "platform": "携程",
      "cancelBy": "2026-09-16",
      "note": "",
      "rowRef": "最终版!L5"
    },
    {
      "date": "2026-09-25",
      "item": "赛武酒店",
      "cny": "308",
      "idrK": "816.81600000000003",
      "status": "已支付",
      "platform": "Booking",
      "cancelBy": "2026-09-25",
      "note": "",
      "rowRef": "最终版!L6"
    },
    {
      "date": "2026-09-26",
      "item": "泗水酒店",
      "cny": "385.57",
      "idrK": "1022.53164",
      "status": "已支付",
      "platform": "携程",
      "cancelBy": "2026-09-24",
      "note": "",
      "rowRef": "最终版!L8"
    },
    {
      "date": "2026-09-27",
      "item": "印尼国内小机票",
      "cny": "1596",
      "idrK": "4232.5919999999996",
      "status": "已支付",
      "platform": "携程",
      "cancelBy": "",
      "note": "往返价格，返程：10.3",
      "rowRef": "最终版!L9"
    },
    {
      "date": "2026-09-27",
      "item": "巴厘岛住宿",
      "cny": "2166",
      "idrK": "5744.232",
      "status": "已支付",
      "platform": "Booking",
      "cancelBy": "2026-09-12",
      "note": "",
      "rowRef": "最终版!L10"
    },
    {
      "date": "2026-09-27",
      "item": "巴厘岛交通费用",
      "cny": "1600",
      "idrK": "4243.2",
      "status": "已支付",
      "platform": "微信",
      "cancelBy": "",
      "note": "含4趟机场酒店接送+佩妮达岛私人团1日游",
      "rowRef": "最终版!L12"
    },
    {
      "date": "2026-09-29",
      "item": "印尼国内小机票",
      "cny": "2342",
      "idrK": "6210.9840000000004",
      "status": "已支付",
      "platform": "携程",
      "cancelBy": "",
      "note": "往返价格，返程：10.3",
      "rowRef": "最终版!L14"
    },
    {
      "date": "2026-09-29",
      "item": "科莫多酒店",
      "cny": "819",
      "idrK": "2171.9879999999998",
      "status": "已支付",
      "platform": "Booking",
      "cancelBy": "2026-09-26",
      "note": "",
      "rowRef": "最终版!L15"
    },
    {
      "date": "2026-09-30",
      "item": "科莫多岛一日游",
      "cny": "1514",
      "idrK": "4015.1280000000002",
      "status": "已支付",
      "platform": "携程",
      "cancelBy": "2026-09-26",
      "note": "",
      "rowRef": "最终版!L16"
    },
    {
      "date": "2026-10-01",
      "item": "乌布酒店",
      "cny": "1505",
      "idrK": "3991.26",
      "status": "已支付",
      "platform": "Booking",
      "cancelBy": "2026-09-19",
      "note": "",
      "rowRef": "最终版!L17"
    },
    {
      "date": "2026-10-02",
      "item": "ATV费用+",
      "cny": "400",
      "idrK": "1060.8",
      "status": "未预订",
      "platform": "-",
      "cancelBy": "",
      "note": "",
      "rowRef": "最终版!L19"
    },
    {
      "date": "2026-10-03",
      "item": "泗水酒店",
      "cny": "354.93",
      "idrK": "941.27436",
      "status": "已支付",
      "platform": "携程",
      "cancelBy": "2026-09-24",
      "note": "",
      "rowRef": "最终版!L22"
    }
  ],
  "costTotals": {
    "总金额": "26284.5",
    "已支付金额": "25884.5",
    "未支付金额": "400"
  },
  "emergency": {
    "groups": [
      {
        "title": "印尼当地紧急电话",
        "icon": "🇮🇩",
        "items": [
          {
            "icon": "🚓",
            "label": "报警",
            "value": "110",
            "tel": "110"
          },
          {
            "icon": "🚑",
            "label": "医疗急救 / 救护车",
            "value": "119",
            "tel": "119",
            "note": "印尼卫生部 PSC 119 紧急医疗服务"
          }
        ]
      },
      {
        "title": "中国领事保护",
        "icon": "🇨🇳",
        "items": [
          {
            "icon": "☎️",
            "label": "外交部全球领事保护与服务应急热线（24小时）",
            "value": "+86-10-12308",
            "tel": "+861012308"
          },
          {
            "icon": "☎️",
            "label": "备用热线",
            "value": "+86-10-65612308",
            "tel": "+861065612308"
          },
          {
            "icon": "🏛️",
            "label": "中国驻印尼大使馆 领事保护",
            "value": "+62-21-5764135",
            "tel": "+62215764135"
          }
        ]
      },
      {
        "title": "沿线总领馆（优先联系）",
        "icon": "📍",
        "intro": "按你这趟路线，下面两个总领馆比雅加达大使馆更值得存。",
        "highlight": true,
        "items": [
          {
            "icon": "🏛️",
            "label": "中国驻泗水总领馆",
            "value": "+62-31-5678284",
            "tel": "+62315678284",
            "note": "管辖东爪哇 —— 在泗水、Bromo、赛武期间出事，优先联系它"
          },
          {
            "icon": "🏛️",
            "label": "中国驻登巴萨总领馆",
            "value": "+62-361-239902",
            "tel": "+62361239902",
            "note": "管辖巴厘省、东努沙登加拉省、西努沙登加拉省 —— 在巴厘岛、佩尼达、Labuan Bajo/科莫多期间，优先联系它"
          }
        ]
      }
    ],
    "embassy": {
      "name": "中国驻印尼大使馆",
      "address": "Jl. Mega Kuningan No.2, Jakarta Selatan 12950, Indonesia",
      "email": "jakarta_lb@csm.mfa.gov.cn"
    }
  }
};
