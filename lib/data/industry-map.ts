export interface Company {
  name: string;
  searchQuery: string;
}

export interface SupplyChainItem {
  layer: string;
  category: string;
  subCategory: string;
  companies: Company[];
  notes?: string;
}

export interface SubIndustry {
  id: string;
  name: string;
  parentCategory: string;
  color: string;
  mainLayers: string;
  representativeCompanies: string[];
  downstreamApplications: string[];
  supplyChain: SupplyChainItem[];
}

export const ALL_SUB_INDUSTRIES: SubIndustry[] = [
  {
    "id": "ic-overview",
    "name": "整體 IC 產業",
    "parentCategory": "IC 產業",
    "color": "pink",
    "mainLayers": "IC設計 / IC製造 / IC封測 / 下游應用",
    "representativeCompanies": [
      "台積電",
      "聯電",
      "日月光",
      "聯發科",
      "矽品"
    ],
    "downstreamApplications": [
      "PC/NB",
      "通訊",
      "消費性電子",
      "汽車電子",
      "工業",
      "國防"
    ],
    "supplyChain": [
      {
        "layer": "上游",
        "category": "EDA/矽智財",
        "subCategory": "EDA工具",
        "companies": [
          {
            "name": "晶心",
            "searchQuery": "晶心"
          },
          {
            "name": "力旺",
            "searchQuery": "力旺"
          }
        ]
      },
      {
        "layer": "上游",
        "category": "EDA/矽智財",
        "subCategory": "SIP矽智財",
        "companies": [
          {
            "name": "晶心",
            "searchQuery": "晶心"
          },
          {
            "name": "力旺",
            "searchQuery": "力旺"
          }
        ]
      },
      {
        "layer": "上游",
        "category": "EDA/矽智財",
        "subCategory": "設計服務",
        "companies": [
          {
            "name": "創意",
            "searchQuery": "創意"
          },
          {
            "name": "智原",
            "searchQuery": "智原"
          }
        ]
      },
      {
        "layer": "IC設計",
        "category": "Memory",
        "subCategory": "記憶體設計",
        "companies": [
          {
            "name": "晶豪科",
            "searchQuery": "晶豪科"
          },
          {
            "name": "鈺創",
            "searchQuery": "鈺創"
          }
        ]
      },
      {
        "layer": "IC設計",
        "category": "Microcomponent",
        "subCategory": "微控制器設計",
        "companies": [
          {
            "name": "威盛",
            "searchQuery": "威盛"
          },
          {
            "name": "凌陽",
            "searchQuery": "凌陽"
          },
          {
            "name": "盛群",
            "searchQuery": "盛群"
          }
        ]
      },
      {
        "layer": "IC設計",
        "category": "Logic IC",
        "subCategory": "邏輯IC設計",
        "companies": [
          {
            "name": "聯詠",
            "searchQuery": "聯詠"
          },
          {
            "name": "瑞昱",
            "searchQuery": "瑞昱"
          },
          {
            "name": "奇景",
            "searchQuery": "奇景"
          },
          {
            "name": "瑞鼎",
            "searchQuery": "瑞鼎"
          },
          {
            "name": "義隆",
            "searchQuery": "義隆"
          },
          {
            "name": "矽創",
            "searchQuery": "矽創"
          },
          {
            "name": "松翰",
            "searchQuery": "松翰"
          },
          {
            "name": "揚智",
            "searchQuery": "揚智"
          },
          {
            "name": "聯陽",
            "searchQuery": "聯陽"
          }
        ]
      },
      {
        "layer": "IC設計",
        "category": "Analog IC",
        "subCategory": "類比IC設計",
        "companies": [
          {
            "name": "致新",
            "searchQuery": "致新"
          },
          {
            "name": "富鼎",
            "searchQuery": "富鼎"
          },
          {
            "name": "茂達",
            "searchQuery": "茂達"
          },
          {
            "name": "尼克森",
            "searchQuery": "尼克森"
          }
        ]
      },
      {
        "layer": "IC設計",
        "category": "ASIC/ASSP",
        "subCategory": "特殊IC設計",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "群聯",
            "searchQuery": "群聯"
          }
        ]
      },
      {
        "layer": "IC製造",
        "category": "晶圓代工",
        "subCategory": "邏輯製程",
        "companies": [
          {
            "name": "台積電",
            "searchQuery": "台積電"
          },
          {
            "name": "聯電",
            "searchQuery": "聯電"
          },
          {
            "name": "力晶",
            "searchQuery": "力晶"
          },
          {
            "name": "世界先進",
            "searchQuery": "世界先進"
          },
          {
            "name": "漢磊",
            "searchQuery": "漢磊"
          },
          {
            "name": "茂矽",
            "searchQuery": "茂矽"
          },
          {
            "name": "穩懋",
            "searchQuery": "穩懋"
          }
        ]
      },
      {
        "layer": "IC製造",
        "category": "記憶體製造",
        "subCategory": "DRAM/NAND",
        "companies": [
          {
            "name": "南亞科技",
            "searchQuery": "南亞科技"
          },
          {
            "name": "華邦",
            "searchQuery": "華邦"
          },
          {
            "name": "旺宏",
            "searchQuery": "旺宏"
          },
          {
            "name": "台灣美光",
            "searchQuery": "台灣美光"
          }
        ]
      },
      {
        "layer": "IC製造",
        "category": "IC製造設備",
        "subCategory": "製造設備",
        "companies": [
          {
            "name": "漢微科",
            "searchQuery": "漢微科"
          },
          {
            "name": "盟立自動化",
            "searchQuery": "盟立自動化"
          },
          {
            "name": "家登精密",
            "searchQuery": "家登精密"
          },
          {
            "name": "漢辰科技",
            "searchQuery": "漢辰科技"
          }
        ]
      },
      {
        "layer": "IC製造",
        "category": "IC製造材料",
        "subCategory": "製造材料",
        "companies": [
          {
            "name": "台灣光罩",
            "searchQuery": "台灣光罩"
          },
          {
            "name": "中美矽晶",
            "searchQuery": "中美矽晶"
          }
        ]
      },
      {
        "layer": "IC封測",
        "category": "IC封裝",
        "subCategory": "封裝服務",
        "companies": [
          {
            "name": "日月光",
            "searchQuery": "日月光"
          },
          {
            "name": "矽品",
            "searchQuery": "矽品"
          },
          {
            "name": "力成",
            "searchQuery": "力成"
          },
          {
            "name": "華東",
            "searchQuery": "華東"
          },
          {
            "name": "南茂",
            "searchQuery": "南茂"
          }
        ]
      },
      {
        "layer": "IC封測",
        "category": "IC測試",
        "subCategory": "測試服務",
        "companies": [
          {
            "name": "京元電",
            "searchQuery": "京元電"
          },
          {
            "name": "欣銓",
            "searchQuery": "欣銓"
          },
          {
            "name": "矽格",
            "searchQuery": "矽格"
          }
        ]
      },
      {
        "layer": "IC封測",
        "category": "IC封裝設備",
        "subCategory": "封裝設備",
        "companies": [
          {
            "name": "均豪精密",
            "searchQuery": "均豪精密"
          },
          {
            "name": "弘塑",
            "searchQuery": "弘塑"
          },
          {
            "name": "基丞科技",
            "searchQuery": "基丞科技"
          }
        ]
      },
      {
        "layer": "IC封測",
        "category": "IC封裝材料",
        "subCategory": "封裝材料",
        "companies": [
          {
            "name": "長華電材",
            "searchQuery": "長華電材"
          },
          {
            "name": "欣興",
            "searchQuery": "欣興"
          },
          {
            "name": "景碩",
            "searchQuery": "景碩"
          }
        ]
      },
      {
        "layer": "IC封測",
        "category": "IC測試設備",
        "subCategory": "測試設備",
        "companies": [
          {
            "name": "致茂電子",
            "searchQuery": "致茂電子"
          },
          {
            "name": "德律科技",
            "searchQuery": "德律科技"
          }
        ]
      },
      {
        "layer": "下游應用",
        "category": "PC/NB",
        "subCategory": "個人電腦",
        "companies": [
          {
            "name": "（各大電腦品牌）",
            "searchQuery": "（各大電腦品牌）"
          }
        ]
      },
      {
        "layer": "下游應用",
        "category": "通訊",
        "subCategory": "通訊設備",
        "companies": [
          {
            "name": "（各大通訊廠商）",
            "searchQuery": "（各大通訊廠商）"
          }
        ]
      },
      {
        "layer": "下游應用",
        "category": "消費性電子",
        "subCategory": "消費電子",
        "companies": [
          {
            "name": "（各大消費電子廠商）",
            "searchQuery": "（各大消費電子廠商）"
          }
        ]
      },
      {
        "layer": "下游應用",
        "category": "汽車電子",
        "subCategory": "車用電子",
        "companies": [
          {
            "name": "（各大汽車廠商）",
            "searchQuery": "（各大汽車廠商）"
          }
        ]
      },
      {
        "layer": "下游應用",
        "category": "工業",
        "subCategory": "工業應用",
        "companies": [
          {
            "name": "（各大工業廠商）",
            "searchQuery": "（各大工業廠商）"
          }
        ]
      },
      {
        "layer": "下游應用",
        "category": "國防",
        "subCategory": "國防應用",
        "companies": [
          {
            "name": "（國防相關廠商）",
            "searchQuery": "（國防相關廠商）"
          }
        ]
      }
    ]
  },
  {
    "id": "ic-design",
    "name": "IC 設計產業",
    "parentCategory": "IC 產業",
    "color": "pink",
    "mainLayers": "上游工具矽智財 / IC設計 / IC製造 / 下游應用",
    "representativeCompanies": [
      "聯發科",
      "群聯",
      "聯詠",
      "瑞昱",
      "威盛",
      "凌陽"
    ],
    "downstreamApplications": [
      "PC/NB",
      "通訊",
      "消費性電子",
      "汽車電子",
      "工業",
      "國防"
    ],
    "supplyChain": [
      {
        "layer": "IC設計",
        "category": "Memory",
        "subCategory": "記憶體設計",
        "companies": [
          {
            "name": "晶豪科",
            "searchQuery": "晶豪科"
          },
          {
            "name": "鈺創",
            "searchQuery": "鈺創"
          }
        ]
      },
      {
        "layer": "IC設計",
        "category": "Microcomponent",
        "subCategory": "微控制器設計",
        "companies": [
          {
            "name": "威盛",
            "searchQuery": "威盛"
          },
          {
            "name": "凌陽",
            "searchQuery": "凌陽"
          },
          {
            "name": "盛群",
            "searchQuery": "盛群"
          }
        ]
      },
      {
        "layer": "IC設計",
        "category": "Logic IC",
        "subCategory": "邏輯IC設計",
        "companies": [
          {
            "name": "聯詠",
            "searchQuery": "聯詠"
          },
          {
            "name": "瑞昱",
            "searchQuery": "瑞昱"
          },
          {
            "name": "奇景",
            "searchQuery": "奇景"
          },
          {
            "name": "瑞鼎",
            "searchQuery": "瑞鼎"
          },
          {
            "name": "義隆",
            "searchQuery": "義隆"
          },
          {
            "name": "矽創",
            "searchQuery": "矽創"
          },
          {
            "name": "松翰",
            "searchQuery": "松翰"
          },
          {
            "name": "揚智",
            "searchQuery": "揚智"
          },
          {
            "name": "聯陽",
            "searchQuery": "聯陽"
          }
        ]
      },
      {
        "layer": "IC設計",
        "category": "Analog IC",
        "subCategory": "類比IC設計",
        "companies": [
          {
            "name": "致新",
            "searchQuery": "致新"
          },
          {
            "name": "富鼎",
            "searchQuery": "富鼎"
          },
          {
            "name": "茂達",
            "searchQuery": "茂達"
          },
          {
            "name": "尼克森",
            "searchQuery": "尼克森"
          }
        ]
      },
      {
        "layer": "IC設計",
        "category": "ASIC/ASSP",
        "subCategory": "特殊IC設計",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "群聯",
            "searchQuery": "群聯"
          }
        ]
      }
    ]
  },
  {
    "id": "ic-manufacturing",
    "name": "IC 製造產業",
    "parentCategory": "IC 產業",
    "color": "pink",
    "mainLayers": "IC設計及材料 / IC製造 / IC封測 / 下游應用",
    "representativeCompanies": [
      "台積電",
      "聯電",
      "世界先進",
      "漢磊",
      "力晶"
    ],
    "downstreamApplications": [
      "PC/NB",
      "通訊",
      "消費性電子",
      "汽車電子",
      "工業",
      "國防"
    ],
    "supplyChain": [
      {
        "layer": "IC製造",
        "category": "晶圓代工",
        "subCategory": "邏輯製程",
        "companies": [
          {
            "name": "台積電",
            "searchQuery": "台積電"
          },
          {
            "name": "聯電",
            "searchQuery": "聯電"
          },
          {
            "name": "力晶",
            "searchQuery": "力晶"
          },
          {
            "name": "世界先進",
            "searchQuery": "世界先進"
          },
          {
            "name": "漢磊",
            "searchQuery": "漢磊"
          },
          {
            "name": "茂矽",
            "searchQuery": "茂矽"
          },
          {
            "name": "穩懋",
            "searchQuery": "穩懋"
          }
        ]
      },
      {
        "layer": "IC製造",
        "category": "記憶體製造",
        "subCategory": "DRAM/NAND",
        "companies": [
          {
            "name": "南亞科技",
            "searchQuery": "南亞科技"
          },
          {
            "name": "華邦",
            "searchQuery": "華邦"
          },
          {
            "name": "旺宏",
            "searchQuery": "旺宏"
          },
          {
            "name": "台灣美光",
            "searchQuery": "台灣美光"
          }
        ]
      },
      {
        "layer": "IC製造",
        "category": "IC製造設備",
        "subCategory": "製造設備",
        "companies": [
          {
            "name": "漢微科",
            "searchQuery": "漢微科"
          },
          {
            "name": "盟立自動化",
            "searchQuery": "盟立自動化"
          },
          {
            "name": "家登精密",
            "searchQuery": "家登精密"
          },
          {
            "name": "漢辰科技",
            "searchQuery": "漢辰科技"
          }
        ]
      },
      {
        "layer": "IC製造",
        "category": "IC製造材料",
        "subCategory": "製造材料",
        "companies": [
          {
            "name": "台灣光罩",
            "searchQuery": "台灣光罩"
          },
          {
            "name": "中美矽晶",
            "searchQuery": "中美矽晶"
          }
        ]
      }
    ]
  },
  {
    "id": "ic-package-test",
    "name": "IC 封測產業",
    "parentCategory": "IC 產業",
    "color": "pink",
    "mainLayers": "IC設計及製造 / IC封裝材料 / IC封測 / 下游應用",
    "representativeCompanies": [
      "日月光",
      "矽品",
      "力成",
      "京元電",
      "欣銓"
    ],
    "downstreamApplications": [
      "PC/NB",
      "通訊",
      "消費性電子",
      "汽車電子",
      "工業",
      "國防"
    ],
    "supplyChain": [
      {
        "layer": "IC封測",
        "category": "IC封裝",
        "subCategory": "封裝服務",
        "companies": [
          {
            "name": "日月光",
            "searchQuery": "日月光"
          },
          {
            "name": "矽品",
            "searchQuery": "矽品"
          },
          {
            "name": "力成",
            "searchQuery": "力成"
          },
          {
            "name": "華東",
            "searchQuery": "華東"
          },
          {
            "name": "南茂",
            "searchQuery": "南茂"
          }
        ]
      },
      {
        "layer": "IC封測",
        "category": "IC測試",
        "subCategory": "測試服務",
        "companies": [
          {
            "name": "京元電",
            "searchQuery": "京元電"
          },
          {
            "name": "欣銓",
            "searchQuery": "欣銓"
          },
          {
            "name": "矽格",
            "searchQuery": "矽格"
          }
        ]
      },
      {
        "layer": "IC封測",
        "category": "IC封裝設備",
        "subCategory": "封裝設備",
        "companies": [
          {
            "name": "均豪精密",
            "searchQuery": "均豪精密"
          },
          {
            "name": "弘塑",
            "searchQuery": "弘塑"
          },
          {
            "name": "基丞科技",
            "searchQuery": "基丞科技"
          }
        ]
      },
      {
        "layer": "IC封測",
        "category": "IC封裝材料",
        "subCategory": "封裝材料",
        "companies": [
          {
            "name": "長華電材",
            "searchQuery": "長華電材"
          },
          {
            "name": "欣興",
            "searchQuery": "欣興"
          },
          {
            "name": "景碩",
            "searchQuery": "景碩"
          }
        ]
      },
      {
        "layer": "IC封測",
        "category": "IC測試設備",
        "subCategory": "測試設備",
        "companies": [
          {
            "name": "致茂電子",
            "searchQuery": "致茂電子"
          },
          {
            "name": "德律科技",
            "searchQuery": "德律科技"
          }
        ]
      }
    ]
  },
  {
    "id": "telecom-overview",
    "name": "整體通訊產業",
    "parentCategory": "通訊產業",
    "color": "pink",
    "mainLayers": "關鍵晶片 / 設計製造及組裝 / 品牌終端 / 下游",
    "representativeCompanies": [
      "鴻海",
      "廣達",
      "神達",
      "宏碁",
      "宏達電"
    ],
    "downstreamApplications": [
      "電信營運商",
      "企業",
      "零售通路"
    ],
    "supplyChain": [
      {
        "layer": "關鍵晶片",
        "category": "手機晶片",
        "subCategory": "基頻/射頻/應用處理器",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "威睿",
            "searchQuery": "威睿"
          },
          {
            "name": "迅宏",
            "searchQuery": "迅宏"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "GPS晶片",
        "subCategory": "GPS定位晶片",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "WLAN晶片",
        "subCategory": "無線區域網路晶片",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "瑞昱",
            "searchQuery": "瑞昱"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "4G接取產品晶片",
        "subCategory": "4G行動接取晶片",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "威睿",
            "searchQuery": "威睿"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "藍牙晶片",
        "subCategory": "藍牙通訊晶片",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "笙科",
            "searchQuery": "笙科"
          },
          {
            "name": "九暘",
            "searchQuery": "九暘"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "Switch晶片",
        "subCategory": "交換器晶片",
        "companies": [
          {
            "name": "瑞昱",
            "searchQuery": "瑞昱"
          },
          {
            "name": "九暘",
            "searchQuery": "九暘"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "DSL晶片",
        "subCategory": "DSL數位訂戶線路晶片",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "瑞昱",
            "searchQuery": "瑞昱"
          },
          {
            "name": "義傳",
            "searchQuery": "義傳"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "Cable晶片",
        "subCategory": "有線電視晶片",
        "companies": [
          {
            "name": "（相關廠商）",
            "searchQuery": "（相關廠商）"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "IP STB晶片",
        "subCategory": "機上盒晶片",
        "companies": [
          {
            "name": "揚智",
            "searchQuery": "揚智"
          },
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "IP Phone晶片",
        "subCategory": "IP電話晶片",
        "companies": [
          {
            "name": "九暘",
            "searchQuery": "九暘"
          },
          {
            "name": "世紀民生",
            "searchQuery": "世紀民生"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "手機",
        "subCategory": "手機製造",
        "companies": [
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "仁寶",
            "searchQuery": "仁寶"
          },
          {
            "name": "華冠",
            "searchQuery": "華冠"
          },
          {
            "name": "英華達",
            "searchQuery": "英華達"
          },
          {
            "name": "佳世達",
            "searchQuery": "佳世達"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "和碩",
            "searchQuery": "和碩"
          },
          {
            "name": "緯創",
            "searchQuery": "緯創"
          },
          {
            "name": "集嘉",
            "searchQuery": "集嘉"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "GPS",
        "subCategory": "GPS裝置製造",
        "companies": [
          {
            "name": "台灣國際航電",
            "searchQuery": "台灣國際航電"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "英華達",
            "searchQuery": "英華達"
          },
          {
            "name": "緯創",
            "searchQuery": "緯創"
          },
          {
            "name": "神達",
            "searchQuery": "神達"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "WLAN",
        "subCategory": "WLAN設備製造",
        "companies": [
          {
            "name": "建漢",
            "searchQuery": "建漢"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "明泰",
            "searchQuery": "明泰"
          },
          {
            "name": "正文",
            "searchQuery": "正文"
          },
          {
            "name": "智易",
            "searchQuery": "智易"
          },
          {
            "name": "光寶",
            "searchQuery": "光寶"
          },
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "4G接取產品",
        "subCategory": "4G設備製造",
        "companies": [
          {
            "name": "正文",
            "searchQuery": "正文"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "中磊",
            "searchQuery": "中磊"
          },
          {
            "name": "智易",
            "searchQuery": "智易"
          },
          {
            "name": "啟碁",
            "searchQuery": "啟碁"
          },
          {
            "name": "盟創",
            "searchQuery": "盟創"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "藍牙模組/耳機",
        "subCategory": "藍牙模組製造",
        "companies": [
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "環電",
            "searchQuery": "環電"
          },
          {
            "name": "海華",
            "searchQuery": "海華"
          },
          {
            "name": "正嵗",
            "searchQuery": "正嵗"
          },
          {
            "name": "美律",
            "searchQuery": "美律"
          },
          {
            "name": "致伸",
            "searchQuery": "致伸"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "Switch",
        "subCategory": "交換器製造",
        "companies": [
          {
            "name": "智邦",
            "searchQuery": "智邦"
          },
          {
            "name": "達創",
            "searchQuery": "達創"
          },
          {
            "name": "明泰",
            "searchQuery": "明泰"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "神準",
            "searchQuery": "神準"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "DSL CPE",
        "subCategory": "DSL用戶端設備",
        "companies": [
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          },
          {
            "name": "智易",
            "searchQuery": "智易"
          },
          {
            "name": "明泰",
            "searchQuery": "明泰"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "中磊",
            "searchQuery": "中磊"
          },
          {
            "name": "盟創",
            "searchQuery": "盟創"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "Cable CPE",
        "subCategory": "有線電視用戶端設備",
        "companies": [
          {
            "name": "和碩",
            "searchQuery": "和碩"
          },
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          },
          {
            "name": "中磊",
            "searchQuery": "中磊"
          },
          {
            "name": "仲琦",
            "searchQuery": "仲琦"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "IP STB",
        "subCategory": "機上盒製造",
        "companies": [
          {
            "name": "和碩",
            "searchQuery": "和碩"
          },
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          },
          {
            "name": "智易",
            "searchQuery": "智易"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "明泰",
            "searchQuery": "明泰"
          },
          {
            "name": "正文",
            "searchQuery": "正文"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "IP Phone",
        "subCategory": "IP電話製造",
        "companies": [
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          },
          {
            "name": "東訊",
            "searchQuery": "東訊"
          },
          {
            "name": "緯創",
            "searchQuery": "緯創"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "手機品牌",
        "subCategory": "手機品牌商",
        "companies": [
          {
            "name": "宏達電",
            "searchQuery": "宏達電"
          },
          {
            "name": "宏碁",
            "searchQuery": "宏碁"
          },
          {
            "name": "華碩",
            "searchQuery": "華碩"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "GPS品牌",
        "subCategory": "GPS品牌商",
        "companies": [
          {
            "name": "台灣國際航電",
            "searchQuery": "台灣國際航電"
          },
          {
            "name": "神達",
            "searchQuery": "神達"
          },
          {
            "name": "長天",
            "searchQuery": "長天"
          },
          {
            "name": "環天",
            "searchQuery": "環天"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "WLAN品牌",
        "subCategory": "WLAN品牌商",
        "companies": [
          {
            "name": "友訊",
            "searchQuery": "友訊"
          },
          {
            "name": "合勤",
            "searchQuery": "合勤"
          },
          {
            "name": "華碩",
            "searchQuery": "華碩"
          },
          {
            "name": "盛達",
            "searchQuery": "盛達"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "4G接取產品品牌",
        "subCategory": "4G品牌商",
        "companies": [
          {
            "name": "華碩",
            "searchQuery": "華碩"
          },
          {
            "name": "合勤",
            "searchQuery": "合勤"
          },
          {
            "name": "友訊",
            "searchQuery": "友訊"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "藍牙/耳機品牌",
        "subCategory": "藍牙品牌商",
        "companies": [
          {
            "name": "宏達電",
            "searchQuery": "宏達電"
          },
          {
            "name": "宏碁",
            "searchQuery": "宏碁"
          },
          {
            "name": "華碩",
            "searchQuery": "華碩"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "Switch品牌",
        "subCategory": "交換器品牌",
        "companies": [
          {
            "name": "友訊",
            "searchQuery": "友訊"
          },
          {
            "name": "智邦",
            "searchQuery": "智邦"
          },
          {
            "name": "合勤",
            "searchQuery": "合勤"
          },
          {
            "name": "華碩",
            "searchQuery": "華碩"
          },
          {
            "name": "神準",
            "searchQuery": "神準"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "DSL CPE品牌",
        "subCategory": "DSL品牌商",
        "companies": [
          {
            "name": "友訊",
            "searchQuery": "友訊"
          },
          {
            "name": "合勤",
            "searchQuery": "合勤"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "Cable CPE品牌",
        "subCategory": "有線電視品牌",
        "companies": [
          {
            "name": "互動寬頻",
            "searchQuery": "互動寬頻"
          },
          {
            "name": "仲琦",
            "searchQuery": "仲琦"
          },
          {
            "name": "銓寶",
            "searchQuery": "銓寶"
          },
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "IP STB品牌",
        "subCategory": "機上盒品牌",
        "companies": [
          {
            "name": "大同",
            "searchQuery": "大同"
          },
          {
            "name": "合勤",
            "searchQuery": "合勤"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "IP Phone品牌",
        "subCategory": "IP電話品牌",
        "companies": [
          {
            "name": "德士通",
            "searchQuery": "德士通"
          },
          {
            "name": "偉僑",
            "searchQuery": "偉僑"
          }
        ]
      },
      {
        "layer": "下游",
        "category": "電信營運商",
        "subCategory": "電信服務",
        "companies": [
          {
            "name": "中華電信",
            "searchQuery": "中華電信"
          },
          {
            "name": "遠傳電信",
            "searchQuery": "遠傳電信"
          },
          {
            "name": "台灣大哥大",
            "searchQuery": "台灣大哥大"
          },
          {
            "name": "台灣之星",
            "searchQuery": "台灣之星"
          },
          {
            "name": "亞太電信",
            "searchQuery": "亞太電信"
          }
        ]
      },
      {
        "layer": "下游",
        "category": "企業",
        "subCategory": "企業用戶",
        "companies": [
          {
            "name": "（各類企業）",
            "searchQuery": "（各類企業）"
          }
        ]
      },
      {
        "layer": "下游",
        "category": "零售通路",
        "subCategory": "零售商",
        "companies": [
          {
            "name": "（各大通路商）",
            "searchQuery": "（各大通路商）"
          }
        ]
      }
    ]
  },
  {
    "id": "network-equipment",
    "name": "網路通訊設備產業",
    "parentCategory": "通訊產業",
    "color": "pink",
    "mainLayers": "關鍵晶片 / 零組件 / 設計製造組裝 / 品牌終端",
    "representativeCompanies": [
      "友訊",
      "合勤",
      "華碩",
      "聯發科",
      "瑞昱"
    ],
    "downstreamApplications": [
      "WLAN",
      "4G接取產品",
      "Switch",
      "藍牙"
    ],
    "supplyChain": [
      {
        "layer": "關鍵晶片",
        "category": "GPS晶片",
        "subCategory": "GPS定位晶片",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "WLAN晶片",
        "subCategory": "無線區域網路晶片",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "瑞昱",
            "searchQuery": "瑞昱"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "4G接取產品晶片",
        "subCategory": "4G行動接取晶片",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "威睿",
            "searchQuery": "威睿"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "藍牙晶片",
        "subCategory": "藍牙通訊晶片",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "笙科",
            "searchQuery": "笙科"
          },
          {
            "name": "九暘",
            "searchQuery": "九暘"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "Switch晶片",
        "subCategory": "交換器晶片",
        "companies": [
          {
            "name": "瑞昱",
            "searchQuery": "瑞昱"
          },
          {
            "name": "九暘",
            "searchQuery": "九暘"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "DSL晶片",
        "subCategory": "DSL數位訂戶線路晶片",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "瑞昱",
            "searchQuery": "瑞昱"
          },
          {
            "name": "義傳",
            "searchQuery": "義傳"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "Cable晶片",
        "subCategory": "有線電視晶片",
        "companies": [
          {
            "name": "（相關廠商）",
            "searchQuery": "（相關廠商）"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "IP STB晶片",
        "subCategory": "機上盒晶片",
        "companies": [
          {
            "name": "揚智",
            "searchQuery": "揚智"
          },
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          }
        ]
      },
      {
        "layer": "關鍵晶片",
        "category": "IP Phone晶片",
        "subCategory": "IP電話晶片",
        "companies": [
          {
            "name": "九暘",
            "searchQuery": "九暘"
          },
          {
            "name": "世紀民生",
            "searchQuery": "世紀民生"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "GPS",
        "subCategory": "GPS裝置製造",
        "companies": [
          {
            "name": "台灣國際航電",
            "searchQuery": "台灣國際航電"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "英華達",
            "searchQuery": "英華達"
          },
          {
            "name": "緯創",
            "searchQuery": "緯創"
          },
          {
            "name": "神達",
            "searchQuery": "神達"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "WLAN",
        "subCategory": "WLAN設備製造",
        "companies": [
          {
            "name": "建漢",
            "searchQuery": "建漢"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "明泰",
            "searchQuery": "明泰"
          },
          {
            "name": "正文",
            "searchQuery": "正文"
          },
          {
            "name": "智易",
            "searchQuery": "智易"
          },
          {
            "name": "光寶",
            "searchQuery": "光寶"
          },
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "4G接取產品",
        "subCategory": "4G設備製造",
        "companies": [
          {
            "name": "正文",
            "searchQuery": "正文"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "中磊",
            "searchQuery": "中磊"
          },
          {
            "name": "智易",
            "searchQuery": "智易"
          },
          {
            "name": "啟碁",
            "searchQuery": "啟碁"
          },
          {
            "name": "盟創",
            "searchQuery": "盟創"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "藍牙模組/耳機",
        "subCategory": "藍牙模組製造",
        "companies": [
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "環電",
            "searchQuery": "環電"
          },
          {
            "name": "海華",
            "searchQuery": "海華"
          },
          {
            "name": "正嵗",
            "searchQuery": "正嵗"
          },
          {
            "name": "美律",
            "searchQuery": "美律"
          },
          {
            "name": "致伸",
            "searchQuery": "致伸"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "Switch",
        "subCategory": "交換器製造",
        "companies": [
          {
            "name": "智邦",
            "searchQuery": "智邦"
          },
          {
            "name": "達創",
            "searchQuery": "達創"
          },
          {
            "name": "明泰",
            "searchQuery": "明泰"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "神準",
            "searchQuery": "神準"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "DSL CPE",
        "subCategory": "DSL用戶端設備",
        "companies": [
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          },
          {
            "name": "智易",
            "searchQuery": "智易"
          },
          {
            "name": "明泰",
            "searchQuery": "明泰"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "中磊",
            "searchQuery": "中磊"
          },
          {
            "name": "盟創",
            "searchQuery": "盟創"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "Cable CPE",
        "subCategory": "有線電視用戶端設備",
        "companies": [
          {
            "name": "和碩",
            "searchQuery": "和碩"
          },
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          },
          {
            "name": "中磊",
            "searchQuery": "中磊"
          },
          {
            "name": "仲琦",
            "searchQuery": "仲琦"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "IP STB",
        "subCategory": "機上盒製造",
        "companies": [
          {
            "name": "和碩",
            "searchQuery": "和碩"
          },
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          },
          {
            "name": "智易",
            "searchQuery": "智易"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "明泰",
            "searchQuery": "明泰"
          },
          {
            "name": "正文",
            "searchQuery": "正文"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "IP Phone",
        "subCategory": "IP電話製造",
        "companies": [
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          },
          {
            "name": "東訊",
            "searchQuery": "東訊"
          },
          {
            "name": "緯創",
            "searchQuery": "緯創"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "GPS品牌",
        "subCategory": "GPS品牌商",
        "companies": [
          {
            "name": "台灣國際航電",
            "searchQuery": "台灣國際航電"
          },
          {
            "name": "神達",
            "searchQuery": "神達"
          },
          {
            "name": "長天",
            "searchQuery": "長天"
          },
          {
            "name": "環天",
            "searchQuery": "環天"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "WLAN品牌",
        "subCategory": "WLAN品牌商",
        "companies": [
          {
            "name": "友訊",
            "searchQuery": "友訊"
          },
          {
            "name": "合勤",
            "searchQuery": "合勤"
          },
          {
            "name": "華碩",
            "searchQuery": "華碩"
          },
          {
            "name": "盛達",
            "searchQuery": "盛達"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "4G接取產品品牌",
        "subCategory": "4G品牌商",
        "companies": [
          {
            "name": "華碩",
            "searchQuery": "華碩"
          },
          {
            "name": "合勤",
            "searchQuery": "合勤"
          },
          {
            "name": "友訊",
            "searchQuery": "友訊"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "藍牙/耳機品牌",
        "subCategory": "藍牙品牌商",
        "companies": [
          {
            "name": "宏達電",
            "searchQuery": "宏達電"
          },
          {
            "name": "宏碁",
            "searchQuery": "宏碁"
          },
          {
            "name": "華碩",
            "searchQuery": "華碩"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "Switch品牌",
        "subCategory": "交換器品牌",
        "companies": [
          {
            "name": "友訊",
            "searchQuery": "友訊"
          },
          {
            "name": "智邦",
            "searchQuery": "智邦"
          },
          {
            "name": "合勤",
            "searchQuery": "合勤"
          },
          {
            "name": "華碩",
            "searchQuery": "華碩"
          },
          {
            "name": "神準",
            "searchQuery": "神準"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "DSL CPE品牌",
        "subCategory": "DSL品牌商",
        "companies": [
          {
            "name": "友訊",
            "searchQuery": "友訊"
          },
          {
            "name": "合勤",
            "searchQuery": "合勤"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "Cable CPE品牌",
        "subCategory": "有線電視品牌",
        "companies": [
          {
            "name": "互動寬頻",
            "searchQuery": "互動寬頻"
          },
          {
            "name": "仲琦",
            "searchQuery": "仲琦"
          },
          {
            "name": "銓寶",
            "searchQuery": "銓寶"
          },
          {
            "name": "亞旭",
            "searchQuery": "亞旭"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "IP STB品牌",
        "subCategory": "機上盒品牌",
        "companies": [
          {
            "name": "大同",
            "searchQuery": "大同"
          },
          {
            "name": "合勤",
            "searchQuery": "合勤"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "IP Phone品牌",
        "subCategory": "IP電話品牌",
        "companies": [
          {
            "name": "德士通",
            "searchQuery": "德士通"
          },
          {
            "name": "偉僑",
            "searchQuery": "偉僑"
          }
        ]
      },
      {
        "layer": "下游",
        "category": "電信營運商",
        "subCategory": "電信服務",
        "companies": [
          {
            "name": "中華電信",
            "searchQuery": "中華電信"
          },
          {
            "name": "遠傳電信",
            "searchQuery": "遠傳電信"
          },
          {
            "name": "台灣大哥大",
            "searchQuery": "台灣大哥大"
          },
          {
            "name": "台灣之星",
            "searchQuery": "台灣之星"
          },
          {
            "name": "亞太電信",
            "searchQuery": "亞太電信"
          }
        ]
      },
      {
        "layer": "下游",
        "category": "企業",
        "subCategory": "企業用戶",
        "companies": [
          {
            "name": "（各類企業）",
            "searchQuery": "（各類企業）"
          }
        ]
      },
      {
        "layer": "下游",
        "category": "零售通路",
        "subCategory": "零售商",
        "companies": [
          {
            "name": "（各大通路商）",
            "searchQuery": "（各大通路商）"
          }
        ]
      }
    ]
  },
  {
    "id": "mobile-phones",
    "name": "手機產業",
    "parentCategory": "通訊產業",
    "color": "pink",
    "mainLayers": "關鍵晶片 / 零組件 / 設計製造及組裝 / 品牌",
    "representativeCompanies": [
      "鴻海（富智康）",
      "仁寶",
      "華碩",
      "宏達電"
    ],
    "downstreamApplications": [
      "手機品牌"
    ],
    "supplyChain": [
      {
        "layer": "關鍵晶片",
        "category": "手機晶片",
        "subCategory": "基頻/射頻/應用處理器",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "威睿",
            "searchQuery": "威睿"
          },
          {
            "name": "迅宏",
            "searchQuery": "迅宏"
          }
        ]
      },
      {
        "layer": "設計製造及組裝",
        "category": "手機",
        "subCategory": "手機製造",
        "companies": [
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "仁寶",
            "searchQuery": "仁寶"
          },
          {
            "name": "華冠",
            "searchQuery": "華冠"
          },
          {
            "name": "英華達",
            "searchQuery": "英華達"
          },
          {
            "name": "佳世達",
            "searchQuery": "佳世達"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "和碩",
            "searchQuery": "和碩"
          },
          {
            "name": "緯創",
            "searchQuery": "緯創"
          },
          {
            "name": "集嘉",
            "searchQuery": "集嘉"
          }
        ]
      },
      {
        "layer": "品牌終端",
        "category": "手機品牌",
        "subCategory": "手機品牌商",
        "companies": [
          {
            "name": "宏達電",
            "searchQuery": "宏達電"
          },
          {
            "name": "宏碁",
            "searchQuery": "宏碁"
          },
          {
            "name": "華碩",
            "searchQuery": "華碩"
          }
        ]
      }
    ]
  },
  {
    "id": "tft-lcd",
    "name": "TFT LCD 產業",
    "parentCategory": "顯示器產業",
    "color": "pink",
    "mainLayers": "上游材料與零組件 / 面板廠 / 模組組裝廠 / 下游應用",
    "representativeCompanies": [
      "友達",
      "群創",
      "中華映管",
      "瀚宇彩晶"
    ],
    "downstreamApplications": [
      "筆記型電腦",
      "LCD TV",
      "Monitor",
      "行動電話"
    ],
    "supplyChain": []
  },
  {
    "id": "oled",
    "name": "OLED 產業",
    "parentCategory": "顯示器產業",
    "color": "pink",
    "mainLayers": "上游材料與零組件 / 面板廠 / 下游應用",
    "representativeCompanies": [
      "錸寶",
      "智晶（PMOLED）",
      "友達",
      "群創（AMOLED）"
    ],
    "downstreamApplications": [
      "行動電話",
      "穿戴裝置",
      "產業用面板",
      "家電"
    ],
    "supplyChain": []
  },
  {
    "id": "led",
    "name": "LED 元件產業",
    "parentCategory": "顯示器產業",
    "color": "pink",
    "mainLayers": "材料/設備 / 元件（磊晶、晶粒、封裝）/ 應用",
    "representativeCompanies": [
      "晶電",
      "璨圓",
      "泰谷",
      "光鋭",
      "今台",
      "光寶"
    ],
    "downstreamApplications": [
      "顯示器",
      "看板",
      "照明",
      "汽車",
      "通訊"
    ],
    "supplyChain": []
  },
  {
    "id": "pcb",
    "name": "印刷電路板產業",
    "parentCategory": "電子零組件",
    "color": "pink",
    "mainLayers": "上游材料 / 銅箔基板 / 印刷電路板 / 系統組裝 / 下游應用",
    "representativeCompanies": [
      "欣興電子",
      "臻鼎",
      "健鼎",
      "日月光",
      "南電"
    ],
    "downstreamApplications": [
      "電腦及週邊",
      "行動電話",
      "數位電視",
      "數位相機"
    ],
    "supplyChain": []
  },
  {
    "id": "passive-components",
    "name": "被動元件產業",
    "parentCategory": "電子零組件",
    "color": "pink",
    "mainLayers": "上游材料 / 被動元件製造 / 下游應用",
    "representativeCompanies": [
      "國巨",
      "大毅",
      "華新科",
      "禾伸堂",
      "乾坤"
    ],
    "downstreamApplications": [
      "電腦及週邊",
      "行動電話",
      "數位電視",
      "數位相機"
    ],
    "supplyChain": []
  },
  {
    "id": "lithium-battery",
    "name": "鋰電池產業",
    "parentCategory": "電子零組件",
    "color": "pink",
    "mainLayers": "上游材料 / 電池製造 / 電池組裝 / 下游",
    "representativeCompanies": [
      "能元",
      "有量",
      "必翔電",
      "新普",
      "加百裕"
    ],
    "downstreamApplications": [
      "筆記型電腦",
      "行動電話",
      "數位相機",
      "電動工具機"
    ],
    "supplyChain": []
  },
  {
    "id": "sensors",
    "name": "感測器產業",
    "parentCategory": "電子零組件",
    "color": "pink",
    "mainLayers": "上游材料 / 中游製造 / 下游應用",
    "representativeCompanies": [
      "矽創",
      "立錡",
      "智動全球",
      "原相",
      "恆景"
    ],
    "downstreamApplications": [
      "電腦及週邊",
      "智慧手持裝置",
      "穿戴裝置",
      "IoT"
    ],
    "supplyChain": []
  },
  {
    "id": "desktop-pc",
    "name": "桌上型電腦產業",
    "parentCategory": "電腦產業",
    "color": "pink",
    "mainLayers": "半導體 / 零組件 / 生產製造(ODM) / 品牌",
    "representativeCompanies": [
      "鴻海",
      "緯創",
      "廣達",
      "和碩",
      "精英",
      "微星"
    ],
    "downstreamApplications": [
      "HP",
      "Dell",
      "聯想",
      "宏碁",
      "華碩",
      "微星"
    ],
    "supplyChain": []
  },
  {
    "id": "notebook-pc",
    "name": "筆記型電腦產業",
    "parentCategory": "電腦產業",
    "color": "pink",
    "mainLayers": "半導體 / 零組件 / 生產製造(ODM) / 品牌",
    "representativeCompanies": [
      "廣達",
      "仁寶",
      "緯創",
      "英業達",
      "鴻海"
    ],
    "downstreamApplications": [
      "宏碁",
      "華碩",
      "微星",
      "技嘉",
      "精英",
      "倫飛"
    ],
    "supplyChain": []
  },
  {
    "id": "server",
    "name": "伺服器產業",
    "parentCategory": "電腦產業",
    "color": "pink",
    "mainLayers": "半導體 / 零組件 / 組裝(ODM) / 品牌",
    "representativeCompanies": [
      "鴻海",
      "英業達",
      "緯創",
      "廣達",
      "神達"
    ],
    "downstreamApplications": [
      "HPE",
      "Dell EMC",
      "Lenovo",
      "Cisco",
      "Fujitsu"
    ],
    "supplyChain": []
  },
  {
    "id": "smart-speaker",
    "name": "智慧音箱產業",
    "parentCategory": "電腦產業",
    "color": "pink",
    "mainLayers": "半導體 / 零組件 / 組裝(ODM) / 品牌",
    "representativeCompanies": [
      "鴻海",
      "英業達",
      "仁寶",
      "廣達",
      "和碩"
    ],
    "downstreamApplications": [
      "Amazon",
      "Google",
      "Apple",
      "Microsoft",
      "Sony"
    ],
    "supplyChain": []
  },
  {
    "id": "semiconductor-materials",
    "name": "半導體材料產業",
    "parentCategory": "材料產業",
    "color": "blue",
    "mainLayers": "上游材料 / 製程 / 晶片製造",
    "representativeCompanies": [
      "台積電",
      "台灣光罩",
      "永光",
      "聯華氣體"
    ],
    "downstreamApplications": [
      "IC製造"
    ],
    "supplyChain": [
      {
        "layer": "半導體材料",
        "category": "上游材料",
        "subCategory": "光阻",
        "companies": [
          {
            "name": "永光",
            "searchQuery": "永光"
          },
          {
            "name": "（信越）",
            "searchQuery": "（信越）"
          },
          {
            "name": "（Fujifilm）",
            "searchQuery": "（Fujifilm）"
          }
        ],
        "notes": "（）內為外商駐台設廠"
      },
      {
        "layer": "半導體材料",
        "category": "上游材料",
        "subCategory": "光罩",
        "companies": [
          {
            "name": "台積電",
            "searchQuery": "台積電"
          },
          {
            "name": "台灣光罩",
            "searchQuery": "台灣光罩"
          },
          {
            "name": "（中華凸版）",
            "searchQuery": "（中華凸版）"
          },
          {
            "name": "（台灣美日先進光罩）",
            "searchQuery": "（台灣美日先進光罩）"
          }
        ]
      },
      {
        "layer": "半導體材料",
        "category": "上游材料",
        "subCategory": "矽晶圓",
        "companies": [
          {
            "name": "台勝科",
            "searchQuery": "台勝科"
          },
          {
            "name": "合晶",
            "searchQuery": "合晶"
          },
          {
            "name": "環球晶圓",
            "searchQuery": "環球晶圓"
          },
          {
            "name": "嘉晶",
            "searchQuery": "嘉晶"
          },
          {
            "name": "尚志",
            "searchQuery": "尚志"
          },
          {
            "name": "中砂",
            "searchQuery": "中砂"
          },
          {
            "name": "（信越）",
            "searchQuery": "（信越）"
          }
        ]
      },
      {
        "layer": "半導體材料",
        "category": "上游材料",
        "subCategory": "金屬靶材",
        "companies": [
          {
            "name": "光洋科",
            "searchQuery": "光洋科"
          },
          {
            "name": "鑫科",
            "searchQuery": "鑫科"
          },
          {
            "name": "優美科",
            "searchQuery": "優美科"
          },
          {
            "name": "（台灣日鐳）",
            "searchQuery": "（台灣日鐳）"
          }
        ]
      },
      {
        "layer": "半導體材料",
        "category": "上游材料",
        "subCategory": "介電材料",
        "companies": [
          {
            "name": "南美特",
            "searchQuery": "南美特"
          },
          {
            "name": "（三化科技）",
            "searchQuery": "（三化科技）"
          }
        ]
      },
      {
        "layer": "半導體材料",
        "category": "上游材料",
        "subCategory": "氣體",
        "companies": [
          {
            "name": "聯華氣體",
            "searchQuery": "聯華氣體"
          },
          {
            "name": "聯亞科技",
            "searchQuery": "聯亞科技"
          },
          {
            "name": "聯友科技",
            "searchQuery": "聯友科技"
          },
          {
            "name": "（AirProducts）",
            "searchQuery": "（AirProducts）"
          },
          {
            "name": "（AirLiquid）",
            "searchQuery": "（AirLiquid）"
          }
        ]
      },
      {
        "layer": "半導體材料",
        "category": "下游",
        "subCategory": "IC製造",
        "companies": [
          {
            "name": "台積電",
            "searchQuery": "台積電"
          },
          {
            "name": "聯電",
            "searchQuery": "聯電"
          },
          {
            "name": "力晶",
            "searchQuery": "力晶"
          },
          {
            "name": "南亞科",
            "searchQuery": "南亞科"
          },
          {
            "name": "華邦",
            "searchQuery": "華邦"
          },
          {
            "name": "旺宏",
            "searchQuery": "旺宏"
          },
          {
            "name": "世界先進",
            "searchQuery": "世界先進"
          },
          {
            "name": "鉅晶",
            "searchQuery": "鉅晶"
          }
        ]
      }
    ]
  },
  {
    "id": "packaging-materials",
    "name": "構裝材料產業",
    "parentCategory": "材料產業",
    "color": "blue",
    "mainLayers": "上游材料 / 製程 / 晶片封裝 / 下游應用",
    "representativeCompanies": [
      "日月光",
      "矽品",
      "南茂",
      "力成",
      "頎邦"
    ],
    "downstreamApplications": [
      "筆記型電腦",
      "行動電話",
      "數位相機",
      "GPS"
    ],
    "supplyChain": [
      {
        "layer": "構裝材料",
        "category": "上游材料",
        "subCategory": "模封材料",
        "companies": [
          {
            "name": "長春",
            "searchQuery": "長春"
          },
          {
            "name": "長興",
            "searchQuery": "長興"
          },
          {
            "name": "（日立化成）",
            "searchQuery": "（日立化成）"
          },
          {
            "name": "（住友培科）",
            "searchQuery": "（住友培科）"
          },
          {
            "name": "（Kyocera）",
            "searchQuery": "（Kyocera）"
          }
        ]
      },
      {
        "layer": "構裝材料",
        "category": "上游材料",
        "subCategory": "底部充填膠",
        "companies": [
          {
            "name": "（信越化學）",
            "searchQuery": "（信越化學）"
          },
          {
            "name": "（住友培科）",
            "searchQuery": "（住友培科）"
          },
          {
            "name": "（Namics）",
            "searchQuery": "（Namics）"
          },
          {
            "name": "（日立化成）",
            "searchQuery": "（日立化成）"
          }
        ]
      },
      {
        "layer": "構裝材料",
        "category": "上游材料",
        "subCategory": "導線架",
        "companies": [
          {
            "name": "復盛",
            "searchQuery": "復盛"
          },
          {
            "name": "利汎",
            "searchQuery": "利汎"
          },
          {
            "name": "順德",
            "searchQuery": "順德"
          },
          {
            "name": "一詮",
            "searchQuery": "一詮"
          },
          {
            "name": "長華電材",
            "searchQuery": "長華電材"
          },
          {
            "name": "（台灣住礦）",
            "searchQuery": "（台灣住礦）"
          },
          {
            "name": "（三井高科）",
            "searchQuery": "（三井高科）"
          }
        ]
      },
      {
        "layer": "構裝材料",
        "category": "上游材料",
        "subCategory": "IC載板",
        "companies": [
          {
            "name": "欣興",
            "searchQuery": "欣興"
          },
          {
            "name": "南亞",
            "searchQuery": "南亞"
          },
          {
            "name": "景碩",
            "searchQuery": "景碩"
          },
          {
            "name": "日月光",
            "searchQuery": "日月光"
          },
          {
            "name": "臻鼎",
            "searchQuery": "臻鼎"
          },
          {
            "name": "恆勤",
            "searchQuery": "恆勤"
          }
        ]
      },
      {
        "layer": "構裝材料",
        "category": "上游材料",
        "subCategory": "金/銅線",
        "companies": [
          {
            "name": "日茂新材料",
            "searchQuery": "日茂新材料"
          },
          {
            "name": "大亞",
            "searchQuery": "大亞"
          },
          {
            "name": "樂金",
            "searchQuery": "樂金"
          },
          {
            "name": "大瑞",
            "searchQuery": "大瑞"
          },
          {
            "name": "大瑞",
            "searchQuery": "大瑞"
          },
          {
            "name": "昇茂",
            "searchQuery": "昇茂"
          },
          {
            "name": "恆碩",
            "searchQuery": "恆碩"
          },
          {
            "name": "（千住金屬）",
            "searchQuery": "（千住金屬）"
          },
          {
            "name": "日茂新",
            "searchQuery": "日茂新"
          }
        ]
      },
      {
        "layer": "構裝材料",
        "category": "晶片封裝",
        "subCategory": "IC封裝",
        "companies": [
          {
            "name": "日月光",
            "searchQuery": "日月光"
          },
          {
            "name": "矽品",
            "searchQuery": "矽品"
          },
          {
            "name": "南茂",
            "searchQuery": "南茂"
          },
          {
            "name": "力成",
            "searchQuery": "力成"
          },
          {
            "name": "頎邦",
            "searchQuery": "頎邦"
          },
          {
            "name": "超豐",
            "searchQuery": "超豐"
          },
          {
            "name": "華東",
            "searchQuery": "華東"
          }
        ]
      }
    ]
  },
  {
    "id": "tft-lcd-materials",
    "name": "TFT LCD 材料產業",
    "parentCategory": "材料產業",
    "color": "blue",
    "mainLayers": "上游材料 / 中游 / 下游",
    "representativeCompanies": [
      "友達",
      "群創",
      "華映",
      "元太",
      "彩晶",
      "凌巨"
    ],
    "downstreamApplications": [
      "TFT LCD 面板廠"
    ],
    "supplyChain": [
      {
        "layer": "TFT LCD材料",
        "category": "上游材料",
        "subCategory": "配向膜",
        "companies": [
          {
            "name": "大立高",
            "searchQuery": "大立高"
          },
          {
            "name": "達興",
            "searchQuery": "達興"
          }
        ]
      },
      {
        "layer": "TFT LCD材料",
        "category": "上游材料",
        "subCategory": "液晶",
        "companies": [
          {
            "name": "（Merck）",
            "searchQuery": "（Merck）"
          },
          {
            "name": "（JNC）",
            "searchQuery": "（JNC）"
          }
        ]
      },
      {
        "layer": "TFT LCD材料",
        "category": "上游材料",
        "subCategory": "彩色光阻/BM",
        "companies": [
          {
            "name": "（台灣東洋彩光）",
            "searchQuery": "（台灣東洋彩光）"
          },
          {
            "name": "錯暘",
            "searchQuery": "錯暘"
          },
          {
            "name": "（JSR）",
            "searchQuery": "（JSR）"
          },
          {
            "name": "達興",
            "searchQuery": "達興"
          }
        ]
      },
      {
        "layer": "TFT LCD材料",
        "category": "上游材料",
        "subCategory": "擴散膜/板",
        "companies": [
          {
            "name": "宣茂",
            "searchQuery": "宣茂"
          },
          {
            "name": "長興",
            "searchQuery": "長興"
          },
          {
            "name": "穎台",
            "searchQuery": "穎台"
          },
          {
            "name": "奇美實業",
            "searchQuery": "奇美實業"
          },
          {
            "name": "華宏",
            "searchQuery": "華宏"
          },
          {
            "name": "岱稜",
            "searchQuery": "岱稜"
          },
          {
            "name": "伸昌",
            "searchQuery": "伸昌"
          }
        ]
      },
      {
        "layer": "TFT LCD材料",
        "category": "上游材料",
        "subCategory": "玻璃基板",
        "companies": [
          {
            "name": "（康寧）",
            "searchQuery": "（康寧）"
          },
          {
            "name": "（旭硝子）",
            "searchQuery": "（旭硝子）"
          },
          {
            "name": "（日本電氣硝子）",
            "searchQuery": "（日本電氣硝子）"
          },
          {
            "name": "（安瀚視特）",
            "searchQuery": "（安瀚視特）"
          }
        ]
      },
      {
        "layer": "TFT LCD材料",
        "category": "中游",
        "subCategory": "偏光板",
        "companies": [
          {
            "name": "力特",
            "searchQuery": "力特"
          },
          {
            "name": "明基材料",
            "searchQuery": "明基材料"
          },
          {
            "name": "奇美材料",
            "searchQuery": "奇美材料"
          },
          {
            "name": "（日東）",
            "searchQuery": "（日東）"
          },
          {
            "name": "（住華）",
            "searchQuery": "（住華）"
          }
        ]
      },
      {
        "layer": "TFT LCD材料",
        "category": "中游",
        "subCategory": "背光模組",
        "companies": [
          {
            "name": "瑞儀",
            "searchQuery": "瑞儀"
          },
          {
            "name": "中光電",
            "searchQuery": "中光電"
          },
          {
            "name": "達運精密",
            "searchQuery": "達運精密"
          },
          {
            "name": "福華電",
            "searchQuery": "福華電"
          },
          {
            "name": "茂林",
            "searchQuery": "茂林"
          }
        ]
      },
      {
        "layer": "TFT LCD材料",
        "category": "中游",
        "subCategory": "彩色濾光片",
        "companies": [
          {
            "name": "群創",
            "searchQuery": "群創"
          },
          {
            "name": "友達",
            "searchQuery": "友達"
          },
          {
            "name": "華映",
            "searchQuery": "華映"
          }
        ]
      },
      {
        "layer": "TFT LCD材料",
        "category": "下游",
        "subCategory": "TFT LCD",
        "companies": [
          {
            "name": "友達",
            "searchQuery": "友達"
          },
          {
            "name": "群創",
            "searchQuery": "群創"
          },
          {
            "name": "華映",
            "searchQuery": "華映"
          },
          {
            "name": "元太",
            "searchQuery": "元太"
          },
          {
            "name": "彩晶",
            "searchQuery": "彩晶"
          },
          {
            "name": "凌巨",
            "searchQuery": "凌巨"
          }
        ]
      }
    ]
  },
  {
    "id": "basic-chemicals",
    "name": "基本原料產業",
    "parentCategory": "化學原料產業",
    "color": "blue",
    "mainLayers": "上游原物料 / 中游基本原料 / 下游衍生物與化學品",
    "representativeCompanies": [
      "台灣中油",
      "台塑石化",
      "台灣化纖"
    ],
    "downstreamApplications": [
      "塑膠原料",
      "人纖原料",
      "橡膠原料",
      "化學品"
    ],
    "supplyChain": [
      {
        "layer": "基本原料",
        "category": "上游原物料",
        "subCategory": "原油/生質酒精/煤炭",
        "companies": [
          {
            "name": "台灣中油",
            "searchQuery": "台灣中油"
          },
          {
            "name": "台塑石化（國外進口）",
            "searchQuery": "台塑石化（國外進口）"
          }
        ]
      },
      {
        "layer": "基本原料",
        "category": "中游基本原料",
        "subCategory": "乙烯",
        "companies": [
          {
            "name": "台灣中油",
            "searchQuery": "台灣中油"
          },
          {
            "name": "台塑石化",
            "searchQuery": "台塑石化"
          }
        ]
      },
      {
        "layer": "基本原料",
        "category": "中游基本原料",
        "subCategory": "丙烯",
        "companies": [
          {
            "name": "台灣中油",
            "searchQuery": "台灣中油"
          },
          {
            "name": "台塑石化",
            "searchQuery": "台塑石化"
          }
        ]
      },
      {
        "layer": "基本原料",
        "category": "中游基本原料",
        "subCategory": "丁二烯",
        "companies": [
          {
            "name": "台灣中油",
            "searchQuery": "台灣中油"
          },
          {
            "name": "台塑石化",
            "searchQuery": "台塑石化"
          }
        ]
      },
      {
        "layer": "基本原料",
        "category": "中游基本原料",
        "subCategory": "苯/甲苯/二甲苯",
        "companies": [
          {
            "name": "台灣化纖",
            "searchQuery": "台灣化纖"
          },
          {
            "name": "台灣中油",
            "searchQuery": "台灣中油"
          },
          {
            "name": "中鋼碳素",
            "searchQuery": "中鋼碳素"
          }
        ]
      },
      {
        "layer": "基本原料",
        "category": "下游衍生物與化學品",
        "subCategory": "塑膠原料",
        "companies": [
          {
            "name": "台灣塑膠",
            "searchQuery": "台灣塑膠"
          },
          {
            "name": "台灣化纖",
            "searchQuery": "台灣化纖"
          },
          {
            "name": "台灣聚合",
            "searchQuery": "台灣聚合"
          },
          {
            "name": "奇美實業",
            "searchQuery": "奇美實業"
          },
          {
            "name": "李長榮",
            "searchQuery": "李長榮"
          }
        ]
      },
      {
        "layer": "基本原料",
        "category": "下游衍生物與化學品",
        "subCategory": "人纖原料",
        "companies": [
          {
            "name": "東聯化工",
            "searchQuery": "東聯化工"
          },
          {
            "name": "南亞塑膠",
            "searchQuery": "南亞塑膠"
          },
          {
            "name": "台灣化纖",
            "searchQuery": "台灣化纖"
          },
          {
            "name": "中石化",
            "searchQuery": "中石化"
          }
        ]
      },
      {
        "layer": "基本原料",
        "category": "下游衍生物與化學品",
        "subCategory": "橡膠原料",
        "companies": [
          {
            "name": "台橡公司",
            "searchQuery": "台橡公司"
          },
          {
            "name": "李長榮化學",
            "searchQuery": "李長榮化學"
          },
          {
            "name": "奇美實業",
            "searchQuery": "奇美實業"
          },
          {
            "name": "南帝化工",
            "searchQuery": "南帝化工"
          }
        ]
      },
      {
        "layer": "基本原料",
        "category": "下游衍生物與化學品",
        "subCategory": "化學品",
        "companies": [
          {
            "name": "聯成化學",
            "searchQuery": "聯成化學"
          },
          {
            "name": "南亞塑膠",
            "searchQuery": "南亞塑膠"
          },
          {
            "name": "長春石化",
            "searchQuery": "長春石化"
          }
        ]
      }
    ]
  },
  {
    "id": "plastics",
    "name": "塑膠原料產業",
    "parentCategory": "化學原料產業",
    "color": "blue",
    "mainLayers": "上游原料 / 中游原料 / 下游應用",
    "representativeCompanies": [
      "台灣塑膠",
      "台灣聚合",
      "奇美實業"
    ],
    "downstreamApplications": [
      "塑膠製品",
      "包裝容器",
      "運輸工具",
      "電子產品"
    ],
    "supplyChain": [
      {
        "layer": "塑膠原料",
        "category": "上游原料",
        "subCategory": "乙烯/丙烯/丁二烯/芳香烴類",
        "companies": [
          {
            "name": "台灣中油",
            "searchQuery": "台灣中油"
          },
          {
            "name": "台塑石化",
            "searchQuery": "台塑石化"
          },
          {
            "name": "台灣化纖",
            "searchQuery": "台灣化纖"
          },
          {
            "name": "中鋼碳素",
            "searchQuery": "中鋼碳素"
          }
        ]
      },
      {
        "layer": "塑膠原料",
        "category": "中游原料",
        "subCategory": "聚乙烯(PE)",
        "companies": [
          {
            "name": "台灣塑膠",
            "searchQuery": "台灣塑膠"
          },
          {
            "name": "台灣聚合",
            "searchQuery": "台灣聚合"
          },
          {
            "name": "亞洲聚合",
            "searchQuery": "亞洲聚合"
          }
        ]
      },
      {
        "layer": "塑膠原料",
        "category": "中游原料",
        "subCategory": "聚丙烯(PP)",
        "companies": [
          {
            "name": "李長榮",
            "searchQuery": "李長榮"
          },
          {
            "name": "台灣化纖",
            "searchQuery": "台灣化纖"
          },
          {
            "name": "台灣塑膠",
            "searchQuery": "台灣塑膠"
          }
        ]
      },
      {
        "layer": "塑膠原料",
        "category": "中游原料",
        "subCategory": "聚氯乙烯(PVC)",
        "companies": [
          {
            "name": "台灣塑膠",
            "searchQuery": "台灣塑膠"
          },
          {
            "name": "華夏海灣",
            "searchQuery": "華夏海灣"
          },
          {
            "name": "大洋塑膠",
            "searchQuery": "大洋塑膠"
          }
        ]
      },
      {
        "layer": "塑膠原料",
        "category": "中游原料",
        "subCategory": "聚苯乙烯(PS)",
        "companies": [
          {
            "name": "奇美",
            "searchQuery": "奇美"
          },
          {
            "name": "台達化工",
            "searchQuery": "台達化工"
          },
          {
            "name": "台灣化纖",
            "searchQuery": "台灣化纖"
          },
          {
            "name": "高福化工",
            "searchQuery": "高福化工"
          }
        ]
      },
      {
        "layer": "塑膠原料",
        "category": "中游原料",
        "subCategory": "ABS",
        "companies": [
          {
            "name": "奇美",
            "searchQuery": "奇美"
          },
          {
            "name": "台達化工",
            "searchQuery": "台達化工"
          },
          {
            "name": "國喬石化",
            "searchQuery": "國喬石化"
          },
          {
            "name": "台灣化纖",
            "searchQuery": "台灣化纖"
          }
        ]
      },
      {
        "layer": "塑膠原料",
        "category": "中游原料",
        "subCategory": "工程塑膠",
        "companies": [
          {
            "name": "奇美",
            "searchQuery": "奇美"
          },
          {
            "name": "國喬",
            "searchQuery": "國喬"
          },
          {
            "name": "台化出光",
            "searchQuery": "台化出光"
          },
          {
            "name": "集盛實業",
            "searchQuery": "集盛實業"
          },
          {
            "name": "新光合纖",
            "searchQuery": "新光合纖"
          },
          {
            "name": "長春石化",
            "searchQuery": "長春石化"
          }
        ]
      },
      {
        "layer": "塑膠原料",
        "category": "下游應用",
        "subCategory": "塑膠製品",
        "companies": [
          {
            "name": "南亞塑膠",
            "searchQuery": "南亞塑膠"
          },
          {
            "name": "地球綜合",
            "searchQuery": "地球綜合"
          },
          {
            "name": "華夏海灣",
            "searchQuery": "華夏海灣"
          },
          {
            "name": "華南塑膠",
            "searchQuery": "華南塑膠"
          },
          {
            "name": "順昶塑膠",
            "searchQuery": "順昶塑膠"
          },
          {
            "name": "正豐塑膠",
            "searchQuery": "正豐塑膠"
          }
        ]
      },
      {
        "layer": "塑膠原料",
        "category": "下游應用",
        "subCategory": "包裝容器",
        "companies": [
          {
            "name": "永裕塑膠",
            "searchQuery": "永裕塑膠"
          },
          {
            "name": "遠東新世紀",
            "searchQuery": "遠東新世紀"
          },
          {
            "name": "景陽製瓶",
            "searchQuery": "景陽製瓶"
          },
          {
            "name": "祥好塑膠",
            "searchQuery": "祥好塑膠"
          },
          {
            "name": "宏全",
            "searchQuery": "宏全"
          },
          {
            "name": "欣全",
            "searchQuery": "欣全"
          }
        ]
      },
      {
        "layer": "塑膠原料",
        "category": "下游應用",
        "subCategory": "電子產品",
        "companies": [
          {
            "name": "協益電子",
            "searchQuery": "協益電子"
          },
          {
            "name": "鴻海精密",
            "searchQuery": "鴻海精密"
          },
          {
            "name": "富士康",
            "searchQuery": "富士康"
          },
          {
            "name": "福豪精密",
            "searchQuery": "福豪精密"
          },
          {
            "name": "聯育科技",
            "searchQuery": "聯育科技"
          },
          {
            "name": "奇菱",
            "searchQuery": "奇菱"
          }
        ]
      }
    ]
  },
  {
    "id": "rubber",
    "name": "橡膠原料產業",
    "parentCategory": "化學原料產業",
    "color": "blue",
    "mainLayers": "上游原料 / 中游原料 / 下游應用",
    "representativeCompanies": [
      "奇美",
      "台橡",
      "南帝化工"
    ],
    "downstreamApplications": [
      "輪胎製品",
      "工業用橡膠",
      "鞋類製品"
    ],
    "supplyChain": [
      {
        "layer": "橡膠原料",
        "category": "中游原料",
        "subCategory": "苯乙烯-丁二烯橡膠",
        "companies": [
          {
            "name": "奇美",
            "searchQuery": "奇美"
          },
          {
            "name": "台橡",
            "searchQuery": "台橡"
          }
        ]
      },
      {
        "layer": "橡膠原料",
        "category": "中游原料",
        "subCategory": "聚丁二烯橡膠",
        "companies": [
          {
            "name": "奇美",
            "searchQuery": "奇美"
          },
          {
            "name": "台橡",
            "searchQuery": "台橡"
          }
        ]
      },
      {
        "layer": "橡膠原料",
        "category": "中游原料",
        "subCategory": "熱可塑性橡膠",
        "companies": [
          {
            "name": "奇美",
            "searchQuery": "奇美"
          },
          {
            "name": "台橡",
            "searchQuery": "台橡"
          },
          {
            "name": "李長榮",
            "searchQuery": "李長榮"
          },
          {
            "name": "英全",
            "searchQuery": "英全"
          },
          {
            "name": "台塑科騰",
            "searchQuery": "台塑科騰"
          }
        ]
      },
      {
        "layer": "橡膠原料",
        "category": "中游原料",
        "subCategory": "丁腈橡膠",
        "companies": [
          {
            "name": "南帝化工",
            "searchQuery": "南帝化工"
          }
        ]
      },
      {
        "layer": "橡膠原料",
        "category": "下游應用",
        "subCategory": "輪胎製品",
        "companies": [
          {
            "name": "南港輪胎",
            "searchQuery": "南港輪胎"
          },
          {
            "name": "正新橡膠",
            "searchQuery": "正新橡膠"
          },
          {
            "name": "建大",
            "searchQuery": "建大"
          },
          {
            "name": "泰豐輪胎",
            "searchQuery": "泰豐輪胎"
          },
          {
            "name": "台灣普利通",
            "searchQuery": "台灣普利通"
          }
        ]
      },
      {
        "layer": "橡膠原料",
        "category": "下游應用",
        "subCategory": "工業用橡膠",
        "companies": [
          {
            "name": "三五橡膠",
            "searchQuery": "三五橡膠"
          },
          {
            "name": "鑫永銓",
            "searchQuery": "鑫永銓"
          },
          {
            "name": "茂順",
            "searchQuery": "茂順"
          },
          {
            "name": "繼茂",
            "searchQuery": "繼茂"
          },
          {
            "name": "台灣優力膠業",
            "searchQuery": "台灣優力膠業"
          }
        ]
      }
    ]
  },
  {
    "id": "synthetic-fiber",
    "name": "人纖原料產業",
    "parentCategory": "化學原料產業",
    "color": "blue",
    "mainLayers": "上游原料 / 中游原料 / 下游應用",
    "representativeCompanies": [
      "中纖",
      "南亞塑膠",
      "遠東新世紀"
    ],
    "downstreamApplications": [
      "聚酯纖維",
      "聚丙腈纖維",
      "尼龍纖維"
    ],
    "supplyChain": [
      {
        "layer": "人纖原料",
        "category": "上游原料",
        "subCategory": "乙烯/丙烯/芳香烴類",
        "companies": [
          {
            "name": "台灣中油",
            "searchQuery": "台灣中油"
          },
          {
            "name": "台塑石化",
            "searchQuery": "台塑石化"
          },
          {
            "name": "台灣化纖",
            "searchQuery": "台灣化纖"
          },
          {
            "name": "中鋼碳素",
            "searchQuery": "中鋼碳素"
          }
        ]
      },
      {
        "layer": "人纖原料",
        "category": "中游原料",
        "subCategory": "純對苯二甲酸(PTA)",
        "companies": [
          {
            "name": "中美和",
            "searchQuery": "中美和"
          },
          {
            "name": "亞東石化",
            "searchQuery": "亞東石化"
          },
          {
            "name": "東展興業",
            "searchQuery": "東展興業"
          },
          {
            "name": "台灣化纖",
            "searchQuery": "台灣化纖"
          }
        ]
      },
      {
        "layer": "人纖原料",
        "category": "中游原料",
        "subCategory": "乙二醇(EG)",
        "companies": [
          {
            "name": "中纖",
            "searchQuery": "中纖"
          },
          {
            "name": "南中石化",
            "searchQuery": "南中石化"
          },
          {
            "name": "東聯化學",
            "searchQuery": "東聯化學"
          },
          {
            "name": "南亞塑膠",
            "searchQuery": "南亞塑膠"
          }
        ]
      },
      {
        "layer": "人纖原料",
        "category": "下游應用",
        "subCategory": "聚酯纖維",
        "companies": [
          {
            "name": "新光合纖",
            "searchQuery": "新光合纖"
          },
          {
            "name": "遠東新世紀",
            "searchQuery": "遠東新世紀"
          },
          {
            "name": "力麗",
            "searchQuery": "力麗"
          },
          {
            "name": "南亞塑膠",
            "searchQuery": "南亞塑膠"
          },
          {
            "name": "台南紡織",
            "searchQuery": "台南紡織"
          },
          {
            "name": "中興紡織",
            "searchQuery": "中興紡織"
          }
        ]
      },
      {
        "layer": "人纖原料",
        "category": "下游應用",
        "subCategory": "聚丙腈纖維",
        "companies": [
          {
            "name": "台灣塑膠",
            "searchQuery": "台灣塑膠"
          },
          {
            "name": "東華合纖",
            "searchQuery": "東華合纖"
          }
        ]
      },
      {
        "layer": "人纖原料",
        "category": "下游應用",
        "subCategory": "尼龍纖維",
        "companies": [
          {
            "name": "集盛實業",
            "searchQuery": "集盛實業"
          },
          {
            "name": "力鵬企業",
            "searchQuery": "力鵬企業"
          },
          {
            "name": "台灣化纖",
            "searchQuery": "台灣化纖"
          },
          {
            "name": "展頡",
            "searchQuery": "展頡"
          }
        ]
      }
    ]
  },
  {
    "id": "plastic-additives",
    "name": "塑膠添加劑產業",
    "parentCategory": "化學原料產業",
    "color": "blue",
    "mainLayers": "上游化學原料 / 塑膠添加劑合成與純化 / 塑膠摻配 / 下游應用",
    "representativeCompanies": [
      "南亞",
      "台塑",
      "奇鈦",
      "永光",
      "豪元"
    ],
    "downstreamApplications": [
      "3C電器",
      "民生日用品",
      "運動用品",
      "醫療器材"
    ],
    "supplyChain": [
      {
        "layer": "塑膠添加劑",
        "category": "上游化學原料",
        "subCategory": "單體原料",
        "companies": [
          {
            "name": "台塑",
            "searchQuery": "台塑"
          },
          {
            "name": "南亞",
            "searchQuery": "南亞"
          },
          {
            "name": "長春",
            "searchQuery": "長春"
          },
          {
            "name": "台石化",
            "searchQuery": "台石化"
          },
          {
            "name": "中石化",
            "searchQuery": "中石化"
          },
          {
            "name": "聯成",
            "searchQuery": "聯成"
          }
        ]
      },
      {
        "layer": "塑膠添加劑",
        "category": "塑膠添加劑合成與純化",
        "subCategory": "可塑劑",
        "companies": [
          {
            "name": "聯成",
            "searchQuery": "聯成"
          },
          {
            "name": "南亞",
            "searchQuery": "南亞"
          }
        ],
        "notes": "3C電器、民生日用品、運動用品、醫療器材"
      },
      {
        "layer": "塑膠添加劑",
        "category": "塑膠添加劑合成與純化",
        "subCategory": "難燃劑",
        "companies": [
          {
            "name": "奇鈦",
            "searchQuery": "奇鈦"
          },
          {
            "name": "三晃",
            "searchQuery": "三晃"
          }
        ]
      },
      {
        "layer": "塑膠添加劑",
        "category": "塑膠添加劑合成與純化",
        "subCategory": "PVC用熱安定劑",
        "companies": [
          {
            "name": "豪元",
            "searchQuery": "豪元"
          },
          {
            "name": "高銀化學",
            "searchQuery": "高銀化學"
          }
        ]
      },
      {
        "layer": "塑膠添加劑",
        "category": "塑膠添加劑合成與純化",
        "subCategory": "抗氧化劑",
        "companies": [
          {
            "name": "妙春",
            "searchQuery": "妙春"
          },
          {
            "name": "有郁",
            "searchQuery": "有郁"
          },
          {
            "name": "長春",
            "searchQuery": "長春"
          },
          {
            "name": "台灣巴斯夫",
            "searchQuery": "台灣巴斯夫"
          }
        ]
      }
    ]
  },
  {
    "id": "dyes-pigments",
    "name": "染顏料產業",
    "parentCategory": "化學原料產業",
    "color": "blue",
    "mainLayers": "上游化學原料 / 中間體工業 / 染顏料製品 / 下游應用",
    "representativeCompanies": [
      "永光",
      "台唐",
      "有化",
      "大恭",
      "色真"
    ],
    "downstreamApplications": [
      "紡織產業",
      "塑膠產業",
      "光電產業",
      "印刷產業"
    ],
    "supplyChain": [
      {
        "layer": "染顏料",
        "category": "染顏料製品",
        "subCategory": "合成染料",
        "companies": [
          {
            "name": "永光",
            "searchQuery": "永光"
          },
          {
            "name": "台唐",
            "searchQuery": "台唐"
          },
          {
            "name": "泰鋒",
            "searchQuery": "泰鋒"
          },
          {
            "name": "明儒",
            "searchQuery": "明儒"
          }
        ],
        "notes": "紡織產業、塑膠產業、光電產業、印刷產業"
      },
      {
        "layer": "染顏料",
        "category": "染顏料製品",
        "subCategory": "功能性染顏料",
        "companies": [
          {
            "name": "有化",
            "searchQuery": "有化"
          },
          {
            "name": "永光",
            "searchQuery": "永光"
          },
          {
            "name": "常禾菁研",
            "searchQuery": "常禾菁研"
          }
        ]
      },
      {
        "layer": "染顏料",
        "category": "染顏料製品",
        "subCategory": "有機顏料",
        "companies": [
          {
            "name": "大恭",
            "searchQuery": "大恭"
          },
          {
            "name": "色真",
            "searchQuery": "色真"
          },
          {
            "name": "大甲",
            "searchQuery": "大甲"
          },
          {
            "name": "員和",
            "searchQuery": "員和"
          }
        ]
      },
      {
        "layer": "染顏料",
        "category": "染顏料製品",
        "subCategory": "無機顏料",
        "companies": [
          {
            "name": "Chemours",
            "searchQuery": "Chemours"
          },
          {
            "name": "中橡",
            "searchQuery": "中橡"
          },
          {
            "name": "福基",
            "searchQuery": "福基"
          },
          {
            "name": "員和",
            "searchQuery": "員和"
          },
          {
            "name": "中釉",
            "searchQuery": "中釉"
          }
        ]
      }
    ]
  },
  {
    "id": "adhesives",
    "name": "接著劑產業",
    "parentCategory": "化學原料產業",
    "color": "blue",
    "mainLayers": "上游化學原料 / 樹脂合成 / 接著劑配方 / 下游應用產業",
    "representativeCompanies": [
      "長春",
      "長興",
      "南寶",
      "德淵"
    ],
    "downstreamApplications": [
      "建築營造業",
      "光電產業",
      "汽機車產業"
    ],
    "supplyChain": [
      {
        "layer": "接著劑",
        "category": "樹脂合成",
        "subCategory": "酚醛樹脂",
        "companies": [
          {
            "name": "南寶",
            "searchQuery": "南寶"
          },
          {
            "name": "長春",
            "searchQuery": "長春"
          }
        ],
        "notes": "建築營造業、光電產業、汽機車產業"
      },
      {
        "layer": "接著劑",
        "category": "樹脂合成",
        "subCategory": "環氧樹脂",
        "companies": [
          {
            "name": "南亞",
            "searchQuery": "南亞"
          },
          {
            "name": "長春",
            "searchQuery": "長春"
          }
        ]
      },
      {
        "layer": "接著劑",
        "category": "樹脂合成",
        "subCategory": "壓克力系樹脂",
        "companies": [
          {
            "name": "長興",
            "searchQuery": "長興"
          },
          {
            "name": "大立",
            "searchQuery": "大立"
          },
          {
            "name": "石梅",
            "searchQuery": "石梅"
          },
          {
            "name": "國泰樹脂",
            "searchQuery": "國泰樹脂"
          }
        ]
      },
      {
        "layer": "接著劑",
        "category": "樹脂合成",
        "subCategory": "PU樹脂",
        "companies": [
          {
            "name": "日勝化",
            "searchQuery": "日勝化"
          },
          {
            "name": "南寶",
            "searchQuery": "南寶"
          },
          {
            "name": "大東樹脂",
            "searchQuery": "大東樹脂"
          },
          {
            "name": "三晃",
            "searchQuery": "三晃"
          }
        ]
      },
      {
        "layer": "接著劑",
        "category": "接著劑配方",
        "subCategory": "水溶型接著劑",
        "companies": [
          {
            "name": "長春",
            "searchQuery": "長春"
          },
          {
            "name": "長興",
            "searchQuery": "長興"
          },
          {
            "name": "台灣黏劑",
            "searchQuery": "台灣黏劑"
          }
        ]
      },
      {
        "layer": "接著劑",
        "category": "接著劑配方",
        "subCategory": "熱熔膠",
        "companies": [
          {
            "name": "德淵",
            "searchQuery": "德淵"
          },
          {
            "name": "宏盛",
            "searchQuery": "宏盛"
          },
          {
            "name": "誠泰",
            "searchQuery": "誠泰"
          },
          {
            "name": "日邦",
            "searchQuery": "日邦"
          }
        ]
      },
      {
        "layer": "接著劑",
        "category": "接著劑配方",
        "subCategory": "威壓膠",
        "companies": [
          {
            "name": "德淵",
            "searchQuery": "德淵"
          },
          {
            "name": "大東樹脂",
            "searchQuery": "大東樹脂"
          }
        ]
      }
    ]
  },
  {
    "id": "coatings",
    "name": "塗料產業",
    "parentCategory": "化學原料產業",
    "color": "blue",
    "mainLayers": "上游化學原料 / 塗料組成物 / 參配混煉塗料製造 / 下游應用",
    "representativeCompanies": [
      "永記",
      "唐榮",
      "新美華",
      "永記"
    ],
    "downstreamApplications": [
      "建築營造業",
      "鋼鐵產業",
      "汽機車產業"
    ],
    "supplyChain": [
      {
        "layer": "塗料",
        "category": "塗料組成物",
        "subCategory": "樹脂原料",
        "companies": [
          {
            "name": "長春",
            "searchQuery": "長春"
          },
          {
            "name": "南亞",
            "searchQuery": "南亞"
          },
          {
            "name": "科思創",
            "searchQuery": "科思創"
          }
        ],
        "notes": "建築營造業、鋼鐵產業、汽機車產業、木器產品業"
      },
      {
        "layer": "塗料",
        "category": "塗料組成物",
        "subCategory": "化學顏料",
        "companies": [
          {
            "name": "大恭",
            "searchQuery": "大恭"
          },
          {
            "name": "色真",
            "searchQuery": "色真"
          },
          {
            "name": "台灣東洋",
            "searchQuery": "台灣東洋"
          },
          {
            "name": "Chemrous",
            "searchQuery": "Chemrous"
          },
          {
            "name": "台色",
            "searchQuery": "台色"
          }
        ]
      },
      {
        "layer": "塗料",
        "category": "塗料組成物",
        "subCategory": "溶劑",
        "companies": [
          {
            "name": "台塑",
            "searchQuery": "台塑"
          },
          {
            "name": "榮化",
            "searchQuery": "榮化"
          },
          {
            "name": "長春",
            "searchQuery": "長春"
          },
          {
            "name": "勝一",
            "searchQuery": "勝一"
          },
          {
            "name": "台石化",
            "searchQuery": "台石化"
          }
        ]
      },
      {
        "layer": "塗料",
        "category": "參配混煉塗料製造",
        "subCategory": "油性塗料",
        "companies": [
          {
            "name": "永記",
            "searchQuery": "永記"
          },
          {
            "name": "唐榮",
            "searchQuery": "唐榮"
          },
          {
            "name": "新美華",
            "searchQuery": "新美華"
          },
          {
            "name": "柏林",
            "searchQuery": "柏林"
          }
        ]
      },
      {
        "layer": "塗料",
        "category": "參配混煉塗料製造",
        "subCategory": "水性塗料",
        "companies": [
          {
            "name": "永記",
            "searchQuery": "永記"
          },
          {
            "name": "三葉",
            "searchQuery": "三葉"
          },
          {
            "name": "新美華",
            "searchQuery": "新美華"
          }
        ]
      },
      {
        "layer": "塗料",
        "category": "參配混煉塗料製造",
        "subCategory": "粉體塗料",
        "companies": [
          {
            "name": "永記",
            "searchQuery": "永記"
          },
          {
            "name": "阿克蘇諾貝爾常誠",
            "searchQuery": "阿克蘇諾貝爾常誠"
          },
          {
            "name": "大東樹脂",
            "searchQuery": "大東樹脂"
          },
          {
            "name": "帝興",
            "searchQuery": "帝興"
          }
        ]
      }
    ]
  },
  {
    "id": "surfactants-cleaning",
    "name": "界面活性劑與清潔用品產業",
    "parentCategory": "化學原料產業",
    "color": "blue",
    "mainLayers": "化學中間體 / 界面活性劑 / 清潔用品製造 / 下游應用",
    "representativeCompanies": [
      "台灣新日化",
      "中日合成",
      "南僑化工"
    ],
    "downstreamApplications": [
      "一般家用",
      "工業應用"
    ],
    "supplyChain": [
      {
        "layer": "界面活性劑與清潔用品",
        "category": "界面活性劑",
        "subCategory": "陰離子型/陽離子型",
        "companies": [
          {
            "name": "台灣新日化",
            "searchQuery": "台灣新日化"
          },
          {
            "name": "中日合成",
            "searchQuery": "中日合成"
          }
        ],
        "notes": "一般家用、工業應用"
      },
      {
        "layer": "界面活性劑與清潔用品",
        "category": "界面活性劑",
        "subCategory": "非離子型",
        "companies": [
          {
            "name": "台灣新日化",
            "searchQuery": "台灣新日化"
          },
          {
            "name": "中日合成",
            "searchQuery": "中日合成"
          },
          {
            "name": "穩好高分子",
            "searchQuery": "穩好高分子"
          },
          {
            "name": "盤亞",
            "searchQuery": "盤亞"
          }
        ]
      },
      {
        "layer": "界面活性劑與清潔用品",
        "category": "清潔用品製造",
        "subCategory": "肥皂",
        "companies": [
          {
            "name": "南僑化工",
            "searchQuery": "南僑化工"
          },
          {
            "name": "美琪生技",
            "searchQuery": "美琪生技"
          },
          {
            "name": "寶豐化學",
            "searchQuery": "寶豐化學"
          },
          {
            "name": "益豐化工",
            "searchQuery": "益豐化工"
          }
        ]
      },
      {
        "layer": "界面活性劑與清潔用品",
        "category": "清潔用品製造",
        "subCategory": "牙膏",
        "companies": [
          {
            "name": "好來化工",
            "searchQuery": "好來化工"
          },
          {
            "name": "嘉聯實業",
            "searchQuery": "嘉聯實業"
          },
          {
            "name": "獅王工業",
            "searchQuery": "獅王工業"
          },
          {
            "name": "台塑生醫",
            "searchQuery": "台塑生醫"
          }
        ]
      },
      {
        "layer": "界面活性劑與清潔用品",
        "category": "清潔用品製造",
        "subCategory": "其他清潔用品",
        "companies": [
          {
            "name": "毛寶",
            "searchQuery": "毛寶"
          },
          {
            "name": "花仙子",
            "searchQuery": "花仙子"
          },
          {
            "name": "美吾髮",
            "searchQuery": "美吾髮"
          },
          {
            "name": "台灣新日化",
            "searchQuery": "台灣新日化"
          },
          {
            "name": "金美克能",
            "searchQuery": "金美克能"
          },
          {
            "name": "獅王工業",
            "searchQuery": "獅王工業"
          },
          {
            "name": "台塑生醫",
            "searchQuery": "台塑生醫"
          }
        ]
      }
    ]
  },
  {
    "id": "bioplastics",
    "name": "生質塑膠產業",
    "parentCategory": "化學原料產業",
    "color": "blue",
    "mainLayers": "上游原料 / 中游原料 / 下游應用",
    "representativeCompanies": [
      "銘安",
      "僑福",
      "金元福",
      "永裕塑膠"
    ],
    "downstreamApplications": [
      "塑膠製品",
      "包裝容器",
      "電子產品",
      "農膜"
    ],
    "supplyChain": [
      {
        "layer": "生質塑膠",
        "category": "中游原料",
        "subCategory": "PLA（聚乳酸）",
        "companies": [
          {
            "name": "國外進口",
            "searchQuery": "國外進口"
          },
          {
            "name": "NatureWorks",
            "searchQuery": "NatureWorks"
          },
          {
            "name": "Total-Corbion",
            "searchQuery": "Total-Corbion"
          },
          {
            "name": "Purac",
            "searchQuery": "Purac"
          }
        ],
        "notes": "塑膠製品、包裝容器、電子產品、農膜"
      },
      {
        "layer": "生質塑膠",
        "category": "中游原料",
        "subCategory": "PBS",
        "companies": [
          {
            "name": "國外進口",
            "searchQuery": "國外進口"
          },
          {
            "name": "三菱化學",
            "searchQuery": "三菱化學"
          }
        ]
      },
      {
        "layer": "生質塑膠",
        "category": "下游應用",
        "subCategory": "塑膠製品",
        "companies": [
          {
            "name": "銘安",
            "searchQuery": "銘安"
          },
          {
            "name": "易來旺",
            "searchQuery": "易來旺"
          },
          {
            "name": "萊呈",
            "searchQuery": "萊呈"
          },
          {
            "name": "原始本色",
            "searchQuery": "原始本色"
          },
          {
            "name": "鍵發",
            "searchQuery": "鍵發"
          },
          {
            "name": "佑懋興",
            "searchQuery": "佑懋興"
          },
          {
            "name": "協鈺",
            "searchQuery": "協鈺"
          },
          {
            "name": "南部化成",
            "searchQuery": "南部化成"
          }
        ]
      },
      {
        "layer": "生質塑膠",
        "category": "下游應用",
        "subCategory": "包裝容器",
        "companies": [
          {
            "name": "金元福",
            "searchQuery": "金元福"
          },
          {
            "name": "永裕塑膠",
            "searchQuery": "永裕塑膠"
          },
          {
            "name": "遠東新世紀",
            "searchQuery": "遠東新世紀"
          },
          {
            "name": "景陽製瓶",
            "searchQuery": "景陽製瓶"
          },
          {
            "name": "祥好塑膠",
            "searchQuery": "祥好塑膠"
          },
          {
            "name": "宏全",
            "searchQuery": "宏全"
          },
          {
            "name": "欣全",
            "searchQuery": "欣全"
          }
        ]
      }
    ]
  },
  {
    "id": "machine-tools",
    "name": "工具機產業",
    "parentCategory": "機械產業",
    "color": "purple",
    "mainLayers": "材料 / 零組件 / 整機 / 應用",
    "representativeCompanies": [
      "東台",
      "油機",
      "金妏",
      "亞崴",
      "高富",
      "福聯"
    ],
    "downstreamApplications": [
      "汽車",
      "航太",
      "模具製造",
      "3C產品"
    ],
    "supplyChain": [
      {
        "layer": "工具機",
        "category": "材料",
        "subCategory": "軸承/馬達/聯軸器",
        "companies": [
          {
            "name": "勁越",
            "searchQuery": "勁越"
          },
          {
            "name": "東培",
            "searchQuery": "東培"
          },
          {
            "name": "盤鍚",
            "searchQuery": "盤鍚"
          },
          {
            "name": "東元",
            "searchQuery": "東元"
          },
          {
            "name": "大同",
            "searchQuery": "大同"
          },
          {
            "name": "大山梣",
            "searchQuery": "大山梣"
          },
          {
            "name": "享盛",
            "searchQuery": "享盛"
          },
          {
            "name": "捷鎮",
            "searchQuery": "捷鎮"
          },
          {
            "name": "聯川",
            "searchQuery": "聯川"
          }
        ]
      },
      {
        "layer": "工具機",
        "category": "材料",
        "subCategory": "齒輪/蝸輪/蝸桿",
        "companies": [
          {
            "name": "伍德福",
            "searchQuery": "伍德福"
          },
          {
            "name": "達基",
            "searchQuery": "達基"
          },
          {
            "name": "金梨",
            "searchQuery": "金梨"
          }
        ]
      },
      {
        "layer": "工具機",
        "category": "材料",
        "subCategory": "編碼器",
        "companies": [
          {
            "name": "台達電",
            "searchQuery": "台達電"
          }
        ]
      },
      {
        "layer": "工具機",
        "category": "材料",
        "subCategory": "刀具",
        "companies": [
          {
            "name": "晟安",
            "searchQuery": "晟安"
          },
          {
            "name": "建德",
            "searchQuery": "建德"
          },
          {
            "name": "鉑寶",
            "searchQuery": "鉑寶"
          },
          {
            "name": "德大",
            "searchQuery": "德大"
          },
          {
            "name": "北鉅",
            "searchQuery": "北鉅"
          },
          {
            "name": "吉輔",
            "searchQuery": "吉輔"
          }
        ]
      },
      {
        "layer": "工具機",
        "category": "零組件",
        "subCategory": "旋轉工作台",
        "companies": [
          {
            "name": "綜欣工業",
            "searchQuery": "綜欣工業"
          },
          {
            "name": "芳嘉工業",
            "searchQuery": "芳嘉工業"
          },
          {
            "name": "旭陽國際精機",
            "searchQuery": "旭陽國際精機"
          },
          {
            "name": "互隆國際精機",
            "searchQuery": "互隆國際精機"
          },
          {
            "name": "世聖精密",
            "searchQuery": "世聖精密"
          }
        ]
      },
      {
        "layer": "工具機",
        "category": "零組件",
        "subCategory": "主軸",
        "companies": [
          {
            "name": "健椿",
            "searchQuery": "健椿"
          },
          {
            "name": "和進機械",
            "searchQuery": "和進機械"
          },
          {
            "name": "飛浦實業",
            "searchQuery": "飛浦實業"
          },
          {
            "name": "羅夐科技",
            "searchQuery": "羅夐科技"
          },
          {
            "name": "普森精密",
            "searchQuery": "普森精密"
          },
          {
            "name": "睿堂精密",
            "searchQuery": "睿堂精密"
          }
        ]
      },
      {
        "layer": "工具機",
        "category": "零組件",
        "subCategory": "CNC控制器",
        "companies": [
          {
            "name": "寶元",
            "searchQuery": "寶元"
          },
          {
            "name": "舜鵬",
            "searchQuery": "舜鵬"
          },
          {
            "name": "新代科技",
            "searchQuery": "新代科技"
          },
          {
            "name": "賜福科技",
            "searchQuery": "賜福科技"
          },
          {
            "name": "台達電",
            "searchQuery": "台達電"
          }
        ]
      },
      {
        "layer": "工具機",
        "category": "整機",
        "subCategory": "工具機製造",
        "companies": [
          {
            "name": "亞崴精機",
            "searchQuery": "亞崴精機"
          },
          {
            "name": "鑫峰精機",
            "searchQuery": "鑫峰精機"
          },
          {
            "name": "新穎機械",
            "searchQuery": "新穎機械"
          },
          {
            "name": "台一電子",
            "searchQuery": "台一電子"
          },
          {
            "name": "茗亞",
            "searchQuery": "茗亞"
          },
          {
            "name": "健晟",
            "searchQuery": "健晟"
          },
          {
            "name": "常銘",
            "searchQuery": "常銘"
          },
          {
            "name": "徠通",
            "searchQuery": "徠通"
          },
          {
            "name": "慶鴻",
            "searchQuery": "慶鴻"
          },
          {
            "name": "永進",
            "searchQuery": "永進"
          }
        ],
        "notes": "汽車、航太、模具製造、3C產品"
      }
    ]
  },
  {
    "id": "industrial-robots",
    "name": "工業機器人產業",
    "parentCategory": "機械產業",
    "color": "purple",
    "mainLayers": "機器人零組件 / 工業機器人本體產品 / 機器人與自動化系統整合",
    "representativeCompanies": [
      "上銀",
      "台灣精銳",
      "和椿",
      "台達電",
      "鴻海"
    ],
    "downstreamApplications": [
      "製程系統E化",
      "汽車及零組件",
      "機械金屬加工",
      "3C電子零組件"
    ],
    "supplyChain": []
  },
  {
    "id": "smart-automation",
    "name": "智慧自動化產業",
    "parentCategory": "機械產業",
    "color": "purple",
    "mainLayers": "自動化設備/軟體 / 次系統 / 系統 / 下游",
    "representativeCompanies": [
      "盟立",
      "廣運",
      "旭東",
      "均豪",
      "高橋"
    ],
    "downstreamApplications": [
      "顯示器產業",
      "半導體產業",
      "太陽能產業",
      "車輛產業"
    ],
    "supplyChain": []
  },
  {
    "id": "semiconductor-equipment",
    "name": "半導體設備產業",
    "parentCategory": "機械產業",
    "color": "purple",
    "mainLayers": "上游零組件 / 中游製程設備 / 下游應用",
    "representativeCompanies": [
      "京鼎",
      "均豪",
      "弘塑",
      "漢微科",
      "漢辰"
    ],
    "downstreamApplications": [
      "記憶體製造廠",
      "晶圓製造",
      "封裝測試"
    ],
    "supplyChain": [
      {
        "layer": "半導體設備",
        "category": "上游零組件",
        "subCategory": "真空泵浦",
        "companies": [
          {
            "name": "弘毅",
            "searchQuery": "弘毅"
          },
          {
            "name": "達欣",
            "searchQuery": "達欣"
          },
          {
            "name": "漢矗",
            "searchQuery": "漢矗"
          },
          {
            "name": "漢鐘",
            "searchQuery": "漢鐘"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "上游零組件",
        "subCategory": "氣體管件/流量控制器",
        "companies": [
          {
            "name": "日揚",
            "searchQuery": "日揚"
          },
          {
            "name": "聯毅",
            "searchQuery": "聯毅"
          },
          {
            "name": "詠晟",
            "searchQuery": "詠晟"
          },
          {
            "name": "富臨",
            "searchQuery": "富臨"
          },
          {
            "name": "智伸",
            "searchQuery": "智伸"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "上游零組件",
        "subCategory": "滾珠導螺桿/線性滑軌",
        "companies": [
          {
            "name": "台灣滾珠",
            "searchQuery": "台灣滾珠"
          },
          {
            "name": "上銀",
            "searchQuery": "上銀"
          },
          {
            "name": "上銀科技",
            "searchQuery": "上銀科技"
          },
          {
            "name": "直得",
            "searchQuery": "直得"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "中游製程設備",
        "subCategory": "薄膜",
        "companies": [
          {
            "name": "京鼎",
            "searchQuery": "京鼎"
          },
          {
            "name": "帆宣",
            "searchQuery": "帆宣"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "中游製程設備",
        "subCategory": "微影",
        "companies": [
          {
            "name": "（相關廠商）",
            "searchQuery": "（相關廠商）"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "中游製程設備",
        "subCategory": "蝕刻",
        "companies": [
          {
            "name": "京鼎",
            "searchQuery": "京鼎"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "中游製程設備",
        "subCategory": "測試",
        "companies": [
          {
            "name": "致茂",
            "searchQuery": "致茂"
          },
          {
            "name": "德律",
            "searchQuery": "德律"
          },
          {
            "name": "蔚華",
            "searchQuery": "蔚華"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "中游製程設備",
        "subCategory": "切割",
        "companies": [
          {
            "name": "博磊",
            "searchQuery": "博磊"
          },
          {
            "name": "禾宇",
            "searchQuery": "禾宇"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "中游製程設備",
        "subCategory": "封裝與基板檢查",
        "companies": [
          {
            "name": "乘遠",
            "searchQuery": "乘遠"
          },
          {
            "name": "詳維",
            "searchQuery": "詳維"
          },
          {
            "name": "由田",
            "searchQuery": "由田"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "下游應用",
        "subCategory": "記憶體製造廠",
        "companies": [
          {
            "name": "茂德",
            "searchQuery": "茂德"
          },
          {
            "name": "華邦",
            "searchQuery": "華邦"
          },
          {
            "name": "南亞科",
            "searchQuery": "南亞科"
          },
          {
            "name": "力晶",
            "searchQuery": "力晶"
          },
          {
            "name": "華亞科",
            "searchQuery": "華亞科"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "下游應用",
        "subCategory": "晶圓製造",
        "companies": [
          {
            "name": "台積電",
            "searchQuery": "台積電"
          },
          {
            "name": "聯電",
            "searchQuery": "聯電"
          },
          {
            "name": "世界先進",
            "searchQuery": "世界先進"
          },
          {
            "name": "漢磊",
            "searchQuery": "漢磊"
          },
          {
            "name": "穩懋",
            "searchQuery": "穩懋"
          }
        ]
      },
      {
        "layer": "半導體設備",
        "category": "下游應用",
        "subCategory": "封裝測試",
        "companies": [
          {
            "name": "日月光",
            "searchQuery": "日月光"
          },
          {
            "name": "矽品",
            "searchQuery": "矽品"
          },
          {
            "name": "力成",
            "searchQuery": "力成"
          },
          {
            "name": "矽格",
            "searchQuery": "矽格"
          },
          {
            "name": "欣銓",
            "searchQuery": "欣銓"
          },
          {
            "name": "環真",
            "searchQuery": "環真"
          },
          {
            "name": "京元",
            "searchQuery": "京元"
          },
          {
            "name": "南茂",
            "searchQuery": "南茂"
          },
          {
            "name": "華東",
            "searchQuery": "華東"
          },
          {
            "name": "菱生",
            "searchQuery": "菱生"
          },
          {
            "name": "華泰",
            "searchQuery": "華泰"
          },
          {
            "name": "頎邦",
            "searchQuery": "頎邦"
          }
        ]
      }
    ]
  },
  {
    "id": "fpd-equipment",
    "name": "平面顯示器(FPD)設備產業",
    "parentCategory": "機械產業",
    "color": "purple",
    "mainLayers": "上游零組件 / 中游製程設備 / 下游面板",
    "representativeCompanies": [
      "均豪",
      "亞智",
      "東捷",
      "旭東",
      "志聖"
    ],
    "downstreamApplications": [
      "OLED",
      "TN/STN LCD",
      "TFT LCD"
    ],
    "supplyChain": [
      {
        "layer": "FPD設備",
        "category": "上游零組件",
        "subCategory": "真空泵浦",
        "companies": [
          {
            "name": "旭豪實業",
            "searchQuery": "旭豪實業"
          },
          {
            "name": "漢鐘精機",
            "searchQuery": "漢鐘精機"
          }
        ]
      },
      {
        "layer": "FPD設備",
        "category": "上游零組件",
        "subCategory": "精密氣體管件",
        "companies": [
          {
            "name": "日揚科技",
            "searchQuery": "日揚科技"
          }
        ]
      },
      {
        "layer": "FPD設備",
        "category": "上游零組件",
        "subCategory": "線性滑軌",
        "companies": [
          {
            "name": "上銀科技",
            "searchQuery": "上銀科技"
          },
          {
            "name": "全球傳動",
            "searchQuery": "全球傳動"
          },
          {
            "name": "直得科技",
            "searchQuery": "直得科技"
          }
        ]
      },
      {
        "layer": "FPD設備",
        "category": "中游製程設備（Array段）",
        "subCategory": "清洗/塗佈/薄膜/曝光",
        "companies": [
          {
            "name": "志聖",
            "searchQuery": "志聖"
          },
          {
            "name": "東捷",
            "searchQuery": "東捷"
          },
          {
            "name": "均豪",
            "searchQuery": "均豪"
          },
          {
            "name": "亞智",
            "searchQuery": "亞智"
          },
          {
            "name": "陽程",
            "searchQuery": "陽程"
          },
          {
            "name": "亞智",
            "searchQuery": "亞智"
          },
          {
            "name": "富臨",
            "searchQuery": "富臨"
          },
          {
            "name": "亞樹",
            "searchQuery": "亞樹"
          }
        ]
      },
      {
        "layer": "FPD設備",
        "category": "中游製程設備（Cell段）",
        "subCategory": "清洗/配向/液晶滴入/切裂",
        "companies": [
          {
            "name": "志聖",
            "searchQuery": "志聖"
          },
          {
            "name": "東捷",
            "searchQuery": "東捷"
          },
          {
            "name": "均豪",
            "searchQuery": "均豪"
          },
          {
            "name": "亞智",
            "searchQuery": "亞智"
          },
          {
            "name": "韶陽",
            "searchQuery": "韶陽"
          },
          {
            "name": "緯壁",
            "searchQuery": "緯壁"
          },
          {
            "name": "億尚",
            "searchQuery": "億尚"
          }
        ]
      },
      {
        "layer": "FPD設備",
        "category": "中游製程設備（Module段）",
        "subCategory": "構裝/塗膠/測試/檢查",
        "companies": [
          {
            "name": "億尚",
            "searchQuery": "億尚"
          },
          {
            "name": "韶陽",
            "searchQuery": "韶陽"
          },
          {
            "name": "陽程",
            "searchQuery": "陽程"
          },
          {
            "name": "東捷",
            "searchQuery": "東捷"
          },
          {
            "name": "致茂",
            "searchQuery": "致茂"
          },
          {
            "name": "旭東",
            "searchQuery": "旭東"
          },
          {
            "name": "由田",
            "searchQuery": "由田"
          },
          {
            "name": "均豪",
            "searchQuery": "均豪"
          }
        ]
      },
      {
        "layer": "FPD設備",
        "category": "下游面板",
        "subCategory": "OLED",
        "companies": [
          {
            "name": "友達",
            "searchQuery": "友達"
          },
          {
            "name": "群創",
            "searchQuery": "群創"
          },
          {
            "name": "華映",
            "searchQuery": "華映"
          },
          {
            "name": "錸寶",
            "searchQuery": "錸寶"
          },
          {
            "name": "智晶",
            "searchQuery": "智晶"
          }
        ]
      },
      {
        "layer": "FPD設備",
        "category": "下游面板",
        "subCategory": "TFT LCD",
        "companies": [
          {
            "name": "友達",
            "searchQuery": "友達"
          },
          {
            "name": "群創",
            "searchQuery": "群創"
          },
          {
            "name": "彩晶",
            "searchQuery": "彩晶"
          },
          {
            "name": "華映",
            "searchQuery": "華映"
          },
          {
            "name": "凌巨",
            "searchQuery": "凌巨"
          }
        ]
      }
    ]
  },
  {
    "id": "auto-vehicle",
    "name": "汽車整車產業",
    "parentCategory": "車輛產業",
    "color": "purple",
    "mainLayers": "上游整合系統 / 中游整車組裝 / 下游服務體系",
    "representativeCompanies": [
      "國瑞",
      "裕隆",
      "中華",
      "福特六和",
      "臺灣本田"
    ],
    "downstreamApplications": [
      "整車銷售/維修",
      "保險公司",
      "租賃"
    ],
    "supplyChain": [
      {
        "layer": "汽車整車",
        "category": "上游整合系統",
        "subCategory": "引擎系統",
        "companies": [
          {
            "name": "華擎",
            "searchQuery": "華擎"
          },
          {
            "name": "華創",
            "searchQuery": "華創"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "上游整合系統",
        "subCategory": "進排氣系統",
        "companies": [
          {
            "name": "信通",
            "searchQuery": "信通"
          },
          {
            "name": "華洋",
            "searchQuery": "華洋"
          },
          {
            "name": "健泰",
            "searchQuery": "健泰"
          },
          {
            "name": "協祥",
            "searchQuery": "協祥"
          },
          {
            "name": "富惟",
            "searchQuery": "富惟"
          },
          {
            "name": "聚惠",
            "searchQuery": "聚惠"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "上游整合系統",
        "subCategory": "冷卻空調系統",
        "companies": [
          {
            "name": "永彰",
            "searchQuery": "永彰"
          },
          {
            "name": "元成",
            "searchQuery": "元成"
          },
          {
            "name": "萬在",
            "searchQuery": "萬在"
          },
          {
            "name": "士電",
            "searchQuery": "士電"
          },
          {
            "name": "植大",
            "searchQuery": "植大"
          },
          {
            "name": "明揚",
            "searchQuery": "明揚"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "上游整合系統",
        "subCategory": "轉向系統",
        "companies": [
          {
            "name": "台灣厚木",
            "searchQuery": "台灣厚木"
          },
          {
            "name": "六和",
            "searchQuery": "六和"
          },
          {
            "name": "協祥",
            "searchQuery": "協祥"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "上游整合系統",
        "subCategory": "懸吊系統",
        "companies": [
          {
            "name": "中華台亞",
            "searchQuery": "中華台亞"
          },
          {
            "name": "和勝",
            "searchQuery": "和勝"
          },
          {
            "name": "永華",
            "searchQuery": "永華"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "上游整合系統",
        "subCategory": "燃油系統",
        "companies": [
          {
            "name": "元華",
            "searchQuery": "元華"
          },
          {
            "name": "台裕",
            "searchQuery": "台裕"
          },
          {
            "name": "富本",
            "searchQuery": "富本"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "上游整合系統",
        "subCategory": "剎車系統",
        "companies": [
          {
            "name": "亨通",
            "searchQuery": "亨通"
          },
          {
            "name": "光隆",
            "searchQuery": "光隆"
          },
          {
            "name": "六和",
            "searchQuery": "六和"
          },
          {
            "name": "合信",
            "searchQuery": "合信"
          },
          {
            "name": "慧國",
            "searchQuery": "慧國"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "上游整合系統",
        "subCategory": "傳動/底盤系統",
        "companies": [
          {
            "name": "永華",
            "searchQuery": "永華"
          },
          {
            "name": "中華台亞",
            "searchQuery": "中華台亞"
          },
          {
            "name": "台惟",
            "searchQuery": "台惟"
          },
          {
            "name": "協祥",
            "searchQuery": "協祥"
          },
          {
            "name": "華創",
            "searchQuery": "華創"
          },
          {
            "name": "和大",
            "searchQuery": "和大"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "上游整合系統",
        "subCategory": "駕駛安全輔助系統",
        "companies": [
          {
            "name": "環鴻",
            "searchQuery": "環鴻"
          },
          {
            "name": "光寶",
            "searchQuery": "光寶"
          },
          {
            "name": "同致",
            "searchQuery": "同致"
          },
          {
            "name": "輝創",
            "searchQuery": "輝創"
          },
          {
            "name": "峰鼎",
            "searchQuery": "峰鼎"
          },
          {
            "name": "車王",
            "searchQuery": "車王"
          },
          {
            "name": "經昌",
            "searchQuery": "經昌"
          },
          {
            "name": "美安",
            "searchQuery": "美安"
          },
          {
            "name": "全興",
            "searchQuery": "全興"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "中游整車組裝",
        "subCategory": "整車組裝廠",
        "companies": [
          {
            "name": "國瑞",
            "searchQuery": "國瑞"
          },
          {
            "name": "裕隆",
            "searchQuery": "裕隆"
          },
          {
            "name": "中華",
            "searchQuery": "中華"
          },
          {
            "name": "福特六和",
            "searchQuery": "福特六和"
          },
          {
            "name": "臺灣本田",
            "searchQuery": "臺灣本田"
          },
          {
            "name": "三陽現代",
            "searchQuery": "三陽現代"
          },
          {
            "name": "台塑",
            "searchQuery": "台塑"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "下游服務體系",
        "subCategory": "整車銷售/維修",
        "companies": [
          {
            "name": "和泰",
            "searchQuery": "和泰"
          },
          {
            "name": "納智捷",
            "searchQuery": "納智捷"
          },
          {
            "name": "中華",
            "searchQuery": "中華"
          },
          {
            "name": "福特六和",
            "searchQuery": "福特六和"
          },
          {
            "name": "臺灣本田",
            "searchQuery": "臺灣本田"
          },
          {
            "name": "三陽現代",
            "searchQuery": "三陽現代"
          },
          {
            "name": "裕日車",
            "searchQuery": "裕日車"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "下游服務體系",
        "subCategory": "保險公司",
        "companies": [
          {
            "name": "國泰",
            "searchQuery": "國泰"
          },
          {
            "name": "新安東京海上",
            "searchQuery": "新安東京海上"
          },
          {
            "name": "富邦",
            "searchQuery": "富邦"
          },
          {
            "name": "華南",
            "searchQuery": "華南"
          },
          {
            "name": "新光",
            "searchQuery": "新光"
          },
          {
            "name": "明台",
            "searchQuery": "明台"
          }
        ]
      },
      {
        "layer": "汽車整車",
        "category": "下游服務體系",
        "subCategory": "車貸",
        "companies": [
          {
            "name": "台新",
            "searchQuery": "台新"
          },
          {
            "name": "新光",
            "searchQuery": "新光"
          },
          {
            "name": "三信",
            "searchQuery": "三信"
          },
          {
            "name": "中信",
            "searchQuery": "中信"
          },
          {
            "name": "國泰",
            "searchQuery": "國泰"
          },
          {
            "name": "和潤",
            "searchQuery": "和潤"
          }
        ]
      }
    ]
  },
  {
    "id": "auto-parts",
    "name": "汽車零組件產業",
    "parentCategory": "車輛產業",
    "color": "purple",
    "mainLayers": "上游零組件 / 中游功能模組 / 下游整合系統 / 整車",
    "representativeCompanies": [
      "和大",
      "協祥",
      "信通",
      "正新",
      "建大",
      "南港"
    ],
    "downstreamApplications": [
      "整車組裝廠"
    ],
    "supplyChain": []
  },
  {
    "id": "motorcycle",
    "name": "機車產業",
    "parentCategory": "車輛產業",
    "color": "purple",
    "mainLayers": "上游零組件 / 中游零組件/模組總成 / 下游系統 / 整車",
    "representativeCompanies": [
      "光陽",
      "三陽",
      "山葉",
      "鈴木"
    ],
    "downstreamApplications": [
      "機車廠"
    ],
    "supplyChain": []
  },
  {
    "id": "bicycle",
    "name": "自行車產業",
    "parentCategory": "車輛產業",
    "color": "purple",
    "mainLayers": "上游材料 / 中游零組件 / 整車",
    "representativeCompanies": [
      "巨大",
      "美利達",
      "愛地雅",
      "郁珺"
    ],
    "downstreamApplications": [
      "登山車",
      "公路車",
      "代步車"
    ],
    "supplyChain": []
  },
  {
    "id": "ev-car",
    "name": "電動汽車產業",
    "parentCategory": "車輛產業",
    "color": "purple",
    "mainLayers": "上游材料/零組件 / 中游模組/系統 / 下游整車/服務",
    "representativeCompanies": [
      "台達電",
      "新普",
      "致茂",
      "能元",
      "新普"
    ],
    "downstreamApplications": [
      "電動車整車",
      "營運/充電服務"
    ],
    "supplyChain": [
      {
        "layer": "電動汽車",
        "category": "上游材料/零組件",
        "subCategory": "銅線/矽鋼片",
        "companies": [
          {
            "name": "大亞",
            "searchQuery": "大亞"
          },
          {
            "name": "台一",
            "searchQuery": "台一"
          },
          {
            "name": "太平洋",
            "searchQuery": "太平洋"
          },
          {
            "name": "中鋼",
            "searchQuery": "中鋼"
          },
          {
            "name": "永泰豐",
            "searchQuery": "永泰豐"
          },
          {
            "name": "大亞",
            "searchQuery": "大亞"
          }
        ]
      },
      {
        "layer": "電動汽車",
        "category": "上游材料/零組件",
        "subCategory": "正極材料",
        "companies": [
          {
            "name": "康普",
            "searchQuery": "康普"
          },
          {
            "name": "長園科技",
            "searchQuery": "長園科技"
          },
          {
            "name": "台塑鋰鐵",
            "searchQuery": "台塑鋰鐵"
          },
          {
            "name": "鐵研",
            "searchQuery": "鐵研"
          },
          {
            "name": "立凱",
            "searchQuery": "立凱"
          },
          {
            "name": "尚志",
            "searchQuery": "尚志"
          },
          {
            "name": "宏潮",
            "searchQuery": "宏潮"
          }
        ]
      },
      {
        "layer": "電動汽車",
        "category": "上游材料/零組件",
        "subCategory": "負極材料",
        "companies": [
          {
            "name": "中碳",
            "searchQuery": "中碳"
          },
          {
            "name": "榮碳",
            "searchQuery": "榮碳"
          }
        ]
      },
      {
        "layer": "電動汽車",
        "category": "上游材料/零組件",
        "subCategory": "隔離膜",
        "companies": [
          {
            "name": "高銀",
            "searchQuery": "高銀"
          },
          {
            "name": "明基材料",
            "searchQuery": "明基材料"
          },
          {
            "name": "前瞻能源",
            "searchQuery": "前瞻能源"
          }
        ]
      },
      {
        "layer": "電動汽車",
        "category": "中游模組/系統",
        "subCategory": "馬達",
        "companies": [
          {
            "name": "富田",
            "searchQuery": "富田"
          },
          {
            "name": "士電",
            "searchQuery": "士電"
          },
          {
            "name": "東元",
            "searchQuery": "東元"
          },
          {
            "name": "大同",
            "searchQuery": "大同"
          },
          {
            "name": "八達",
            "searchQuery": "八達"
          }
        ]
      },
      {
        "layer": "電動汽車",
        "category": "中游模組/系統",
        "subCategory": "驅控器",
        "companies": [
          {
            "name": "利佳",
            "searchQuery": "利佳"
          },
          {
            "name": "台達電",
            "searchQuery": "台達電"
          },
          {
            "name": "致茂",
            "searchQuery": "致茂"
          },
          {
            "name": "臺灣動能",
            "searchQuery": "臺灣動能"
          }
        ]
      },
      {
        "layer": "電動汽車",
        "category": "中游模組/系統",
        "subCategory": "電池模組",
        "companies": [
          {
            "name": "新普",
            "searchQuery": "新普"
          },
          {
            "name": "能元",
            "searchQuery": "能元"
          },
          {
            "name": "統達",
            "searchQuery": "統達"
          },
          {
            "name": "必翔",
            "searchQuery": "必翔"
          }
        ]
      },
      {
        "layer": "電動汽車",
        "category": "下游整車/服務",
        "subCategory": "電動車整車",
        "companies": [
          {
            "name": "納智捷",
            "searchQuery": "納智捷"
          },
          {
            "name": "中華汽車",
            "searchQuery": "中華汽車"
          },
          {
            "name": "華德",
            "searchQuery": "華德"
          },
          {
            "name": "饗盛",
            "searchQuery": "饗盛"
          },
          {
            "name": "唐榮",
            "searchQuery": "唐榮"
          },
          {
            "name": "聯華聚能",
            "searchQuery": "聯華聚能"
          },
          {
            "name": "凱勝",
            "searchQuery": "凱勝"
          }
        ]
      }
    ]
  },
  {
    "id": "ev-motorcycle",
    "name": "電動機車產業",
    "parentCategory": "車輛產業",
    "color": "purple",
    "mainLayers": "上游材料 / 上游零組件 / 中游零組件/模組總成 / 下游系統 / 整車",
    "representativeCompanies": [
      "光陽",
      "三陽",
      "山葉",
      "中華汽車"
    ],
    "downstreamApplications": [
      "電動機車廠"
    ],
    "supplyChain": []
  },
  {
    "id": "automotive-electronics",
    "name": "汽車電子產業",
    "parentCategory": "車輛產業",
    "color": "purple",
    "mainLayers": "上游零組件 / 中游零組件/模組總成 / 下游系統 / 整車",
    "representativeCompanies": [
      "台積電",
      "聯電",
      "聯發科",
      "光寶",
      "友達"
    ],
    "downstreamApplications": [
      "裕隆",
      "中華",
      "福特",
      "Tesla",
      "GM"
    ],
    "supplyChain": [
      {
        "layer": "汽車電子",
        "category": "上游零組件",
        "subCategory": "車用IC",
        "companies": [
          {
            "name": "台積電",
            "searchQuery": "台積電"
          },
          {
            "name": "聯電",
            "searchQuery": "聯電"
          },
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "凌揚",
            "searchQuery": "凌揚"
          },
          {
            "name": "華邦",
            "searchQuery": "華邦"
          },
          {
            "name": "世界先進",
            "searchQuery": "世界先進"
          },
          {
            "name": "世紀民生",
            "searchQuery": "世紀民生"
          },
          {
            "name": "日月光",
            "searchQuery": "日月光"
          },
          {
            "name": "創意",
            "searchQuery": "創意"
          },
          {
            "name": "義隆電",
            "searchQuery": "義隆電"
          },
          {
            "name": "瑞昱",
            "searchQuery": "瑞昱"
          }
        ]
      },
      {
        "layer": "汽車電子",
        "category": "上游零組件",
        "subCategory": "車用連接器/線束",
        "companies": [
          {
            "name": "胡連",
            "searchQuery": "胡連"
          },
          {
            "name": "貿聯",
            "searchQuery": "貿聯"
          },
          {
            "name": "安泰",
            "searchQuery": "安泰"
          }
        ]
      },
      {
        "layer": "汽車電子",
        "category": "上游零組件",
        "subCategory": "車用印刷電路板",
        "companies": [
          {
            "name": "建鼎",
            "searchQuery": "建鼎"
          },
          {
            "name": "敬鵬",
            "searchQuery": "敬鵬"
          },
          {
            "name": "華通",
            "searchQuery": "華通"
          }
        ]
      },
      {
        "layer": "汽車電子",
        "category": "中游模組/系統",
        "subCategory": "車用導航模組",
        "companies": [
          {
            "name": "國際航電",
            "searchQuery": "國際航電"
          },
          {
            "name": "TomTom",
            "searchQuery": "TomTom"
          },
          {
            "name": "Mio",
            "searchQuery": "Mio"
          },
          {
            "name": "Papago",
            "searchQuery": "Papago"
          },
          {
            "name": "動崴",
            "searchQuery": "動崴"
          }
        ]
      },
      {
        "layer": "汽車電子",
        "category": "中游模組/系統",
        "subCategory": "車用照明模組",
        "companies": [
          {
            "name": "光寶",
            "searchQuery": "光寶"
          },
          {
            "name": "億光",
            "searchQuery": "億光"
          },
          {
            "name": "慧展",
            "searchQuery": "慧展"
          }
        ]
      },
      {
        "layer": "汽車電子",
        "category": "中游模組/系統",
        "subCategory": "車用影像模組",
        "companies": [
          {
            "name": "合盈光電",
            "searchQuery": "合盈光電"
          },
          {
            "name": "為昇科",
            "searchQuery": "為昇科"
          },
          {
            "name": "致伸",
            "searchQuery": "致伸"
          }
        ]
      },
      {
        "layer": "汽車電子",
        "category": "中游模組/系統",
        "subCategory": "電動驅動系統",
        "companies": [
          {
            "name": "台達",
            "searchQuery": "台達"
          },
          {
            "name": "致茂",
            "searchQuery": "致茂"
          },
          {
            "name": "裕隆電能",
            "searchQuery": "裕隆電能"
          },
          {
            "name": "寧茂",
            "searchQuery": "寧茂"
          }
        ]
      },
      {
        "layer": "汽車電子",
        "category": "下游系統",
        "subCategory": "先進駕駛安全輔助",
        "companies": [
          {
            "name": "輝創",
            "searchQuery": "輝創"
          },
          {
            "name": "光寶",
            "searchQuery": "光寶"
          },
          {
            "name": "峰鼎",
            "searchQuery": "峰鼎"
          },
          {
            "name": "奇美電",
            "searchQuery": "奇美電"
          },
          {
            "name": "經昌",
            "searchQuery": "經昌"
          }
        ]
      },
      {
        "layer": "汽車電子",
        "category": "下游系統",
        "subCategory": "車用駕駛資訊娛樂",
        "companies": [
          {
            "name": "國際航電",
            "searchQuery": "國際航電"
          },
          {
            "name": "宏碁",
            "searchQuery": "宏碁"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "仁寶",
            "searchQuery": "仁寶"
          },
          {
            "name": "怡利",
            "searchQuery": "怡利"
          },
          {
            "name": "光寶",
            "searchQuery": "光寶"
          }
        ]
      }
    ]
  },
  {
    "id": "wearables",
    "name": "穿戴裝置產業",
    "parentCategory": "新興產業",
    "color": "green",
    "mainLayers": "關鍵零組件 / 終端製造 / 應用服務",
    "representativeCompanies": [
      "宏達電",
      "宏碁",
      "廣達",
      "英業達",
      "聯發科"
    ],
    "downstreamApplications": [
      "頭戴顯示型",
      "手錶型",
      "穿著式",
      "配戴式"
    ],
    "supplyChain": [
      {
        "layer": "穿戴裝置",
        "category": "關鍵零組件",
        "subCategory": "半導體",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "新唐",
            "searchQuery": "新唐"
          },
          {
            "name": "晶心",
            "searchQuery": "晶心"
          },
          {
            "name": "威盛",
            "searchQuery": "威盛"
          },
          {
            "name": "義隆",
            "searchQuery": "義隆"
          },
          {
            "name": "凌陽",
            "searchQuery": "凌陽"
          }
        ]
      },
      {
        "layer": "穿戴裝置",
        "category": "關鍵零組件",
        "subCategory": "威測器",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "鈺創",
            "searchQuery": "鈺創"
          },
          {
            "name": "原相",
            "searchQuery": "原相"
          },
          {
            "name": "敦南",
            "searchQuery": "敦南"
          },
          {
            "name": "矽創",
            "searchQuery": "矽創"
          },
          {
            "name": "義隆",
            "searchQuery": "義隆"
          },
          {
            "name": "利順",
            "searchQuery": "利順"
          },
          {
            "name": "鑫創",
            "searchQuery": "鑫創"
          }
        ]
      },
      {
        "layer": "穿戴裝置",
        "category": "關鍵零組件",
        "subCategory": "顯示器",
        "companies": [
          {
            "name": "友達",
            "searchQuery": "友達"
          },
          {
            "name": "群創",
            "searchQuery": "群創"
          },
          {
            "name": "奇景",
            "searchQuery": "奇景"
          },
          {
            "name": "晶奇",
            "searchQuery": "晶奇"
          },
          {
            "name": "禾銓",
            "searchQuery": "禾銓"
          },
          {
            "name": "晶宏",
            "searchQuery": "晶宏"
          },
          {
            "name": "元太",
            "searchQuery": "元太"
          },
          {
            "name": "錸寶",
            "searchQuery": "錸寶"
          }
        ]
      },
      {
        "layer": "穿戴裝置",
        "category": "關鍵零組件",
        "subCategory": "電池",
        "companies": [
          {
            "name": "興能高",
            "searchQuery": "興能高"
          },
          {
            "name": "輝能",
            "searchQuery": "輝能"
          },
          {
            "name": "新普",
            "searchQuery": "新普"
          },
          {
            "name": "台達電",
            "searchQuery": "台達電"
          },
          {
            "name": "順達",
            "searchQuery": "順達"
          },
          {
            "name": "光寶",
            "searchQuery": "光寶"
          }
        ]
      },
      {
        "layer": "穿戴裝置",
        "category": "終端製造",
        "subCategory": "頭戴顯示型",
        "companies": [
          {
            "name": "宏達電",
            "searchQuery": "宏達電"
          },
          {
            "name": "宏碁(宏星)",
            "searchQuery": "宏碁(宏星)"
          },
          {
            "name": "華碩",
            "searchQuery": "華碩"
          },
          {
            "name": "和碩",
            "searchQuery": "和碩"
          },
          {
            "name": "佐臻",
            "searchQuery": "佐臻"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "英業達",
            "searchQuery": "英業達"
          },
          {
            "name": "富智康",
            "searchQuery": "富智康"
          },
          {
            "name": "偉信",
            "searchQuery": "偉信"
          }
        ]
      },
      {
        "layer": "穿戴裝置",
        "category": "終端製造",
        "subCategory": "手錶型",
        "companies": [
          {
            "name": "正嵗",
            "searchQuery": "正嵗"
          },
          {
            "name": "宏碁",
            "searchQuery": "宏碁"
          },
          {
            "name": "華碩",
            "searchQuery": "華碩"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "英業達",
            "searchQuery": "英業達"
          },
          {
            "name": "仁寶",
            "searchQuery": "仁寶"
          },
          {
            "name": "環天",
            "searchQuery": "環天"
          },
          {
            "name": "台灣國際航電",
            "searchQuery": "台灣國際航電"
          }
        ]
      },
      {
        "layer": "穿戴裝置",
        "category": "終端製造",
        "subCategory": "穿著式",
        "companies": [
          {
            "name": "聚陽",
            "searchQuery": "聚陽"
          },
          {
            "name": "金寶電子",
            "searchQuery": "金寶電子"
          },
          {
            "name": "儒鴻",
            "searchQuery": "儒鴻"
          },
          {
            "name": "南緯(愛剋)",
            "searchQuery": "南緯(愛剋)"
          },
          {
            "name": "宏遠",
            "searchQuery": "宏遠"
          },
          {
            "name": "潤泰",
            "searchQuery": "潤泰"
          },
          {
            "name": "福懋",
            "searchQuery": "福懋"
          },
          {
            "name": "遠東新",
            "searchQuery": "遠東新"
          },
          {
            "name": "新纖",
            "searchQuery": "新纖"
          }
        ]
      },
      {
        "layer": "穿戴裝置",
        "category": "應用服務",
        "subCategory": "應用服務",
        "companies": [
          {
            "name": "蓋德",
            "searchQuery": "蓋德"
          },
          {
            "name": "遠傳",
            "searchQuery": "遠傳"
          },
          {
            "name": "宇碩健康",
            "searchQuery": "宇碩健康"
          },
          {
            "name": "中華電信",
            "searchQuery": "中華電信"
          },
          {
            "name": "明碁智能",
            "searchQuery": "明碁智能"
          }
        ]
      },
      {
        "layer": "穿戴裝置",
        "category": "應用服務",
        "subCategory": "雲端服務平台",
        "companies": [
          {
            "name": "麗臺",
            "searchQuery": "麗臺"
          },
          {
            "name": "華碩健康",
            "searchQuery": "華碩健康"
          },
          {
            "name": "宏碁雲端",
            "searchQuery": "宏碁雲端"
          }
        ]
      }
    ]
  },
  {
    "id": "iot",
    "name": "物聯網產業",
    "parentCategory": "新興產業",
    "color": "green",
    "mainLayers": "感測層 / 網路層 / 平台層 / 應用服務層",
    "representativeCompanies": [
      "聯發科",
      "盛群",
      "新唐",
      "松翰",
      "啟碁"
    ],
    "downstreamApplications": [
      "智慧家庭",
      "智慧運輸",
      "智慧製造",
      "智慧零售"
    ],
    "supplyChain": [
      {
        "layer": "物聯網",
        "category": "感測層",
        "subCategory": "處理器/微控制器",
        "companies": [
          {
            "name": "聯發科",
            "searchQuery": "聯發科"
          },
          {
            "name": "盛群",
            "searchQuery": "盛群"
          },
          {
            "name": "新唐",
            "searchQuery": "新唐"
          },
          {
            "name": "松翰",
            "searchQuery": "松翰"
          }
        ]
      },
      {
        "layer": "物聯網",
        "category": "感測層",
        "subCategory": "威測器",
        "companies": [
          {
            "name": "原相",
            "searchQuery": "原相"
          },
          {
            "name": "矽創",
            "searchQuery": "矽創"
          },
          {
            "name": "昇佳",
            "searchQuery": "昇佳"
          },
          {
            "name": "創惟",
            "searchQuery": "創惟"
          },
          {
            "name": "聯興微",
            "searchQuery": "聯興微"
          },
          {
            "name": "美律",
            "searchQuery": "美律"
          },
          {
            "name": "鑫創",
            "searchQuery": "鑫創"
          }
        ]
      },
      {
        "layer": "物聯網",
        "category": "感測層",
        "subCategory": "無線模組",
        "companies": [
          {
            "name": "啟碁",
            "searchQuery": "啟碁"
          },
          {
            "name": "正文",
            "searchQuery": "正文"
          },
          {
            "name": "智易",
            "searchQuery": "智易"
          },
          {
            "name": "海華",
            "searchQuery": "海華"
          },
          {
            "name": "光寶",
            "searchQuery": "光寶"
          },
          {
            "name": "群登",
            "searchQuery": "群登"
          },
          {
            "name": "長天",
            "searchQuery": "長天"
          },
          {
            "name": "鼎天",
            "searchQuery": "鼎天"
          }
        ]
      },
      {
        "layer": "物聯網",
        "category": "網路層",
        "subCategory": "固網寬頻",
        "companies": [
          {
            "name": "中華電信",
            "searchQuery": "中華電信"
          },
          {
            "name": "新世紀資通",
            "searchQuery": "新世紀資通"
          },
          {
            "name": "台灣固網",
            "searchQuery": "台灣固網"
          },
          {
            "name": "亞太固網",
            "searchQuery": "亞太固網"
          }
        ]
      },
      {
        "layer": "物聯網",
        "category": "網路層",
        "subCategory": "行動網路",
        "companies": [
          {
            "name": "中華電",
            "searchQuery": "中華電"
          },
          {
            "name": "台灣大",
            "searchQuery": "台灣大"
          },
          {
            "name": "遠傳",
            "searchQuery": "遠傳"
          },
          {
            "name": "亞太",
            "searchQuery": "亞太"
          },
          {
            "name": "台灣之星",
            "searchQuery": "台灣之星"
          }
        ]
      },
      {
        "layer": "物聯網",
        "category": "平台層",
        "subCategory": "物聯網應用平台",
        "companies": [
          {
            "name": "研華",
            "searchQuery": "研華"
          },
          {
            "name": "中華電",
            "searchQuery": "中華電"
          },
          {
            "name": "台達電",
            "searchQuery": "台達電"
          },
          {
            "name": "華碩雲端",
            "searchQuery": "華碩雲端"
          },
          {
            "name": "鴻海",
            "searchQuery": "鴻海"
          },
          {
            "name": "宏碁自建雲",
            "searchQuery": "宏碁自建雲"
          }
        ]
      },
      {
        "layer": "物聯網",
        "category": "應用服務層",
        "subCategory": "智慧家庭",
        "companies": [
          {
            "name": "中興保全",
            "searchQuery": "中興保全"
          },
          {
            "name": "新光保全",
            "searchQuery": "新光保全"
          },
          {
            "name": "中華電信",
            "searchQuery": "中華電信"
          },
          {
            "name": "凱擘",
            "searchQuery": "凱擘"
          },
          {
            "name": "遠雄",
            "searchQuery": "遠雄"
          }
        ]
      },
      {
        "layer": "物聯網",
        "category": "應用服務層",
        "subCategory": "智慧製造",
        "companies": [
          {
            "name": "羽冠",
            "searchQuery": "羽冠"
          },
          {
            "name": "亞士德",
            "searchQuery": "亞士德"
          },
          {
            "name": "鼎新",
            "searchQuery": "鼎新"
          },
          {
            "name": "資通",
            "searchQuery": "資通"
          },
          {
            "name": "敦陽科",
            "searchQuery": "敦陽科"
          },
          {
            "name": "凌群",
            "searchQuery": "凌群"
          },
          {
            "name": "精誠",
            "searchQuery": "精誠"
          },
          {
            "name": "帆宣",
            "searchQuery": "帆宣"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "緯創軟體",
            "searchQuery": "緯創軟體"
          }
        ]
      }
    ]
  },
  {
    "id": "cloud-computing",
    "name": "雲端運算產業",
    "parentCategory": "新興產業",
    "color": "green",
    "mainLayers": "硬體設備 / 資料中心 / 雲端運算服務",
    "representativeCompanies": [
      "鴻海",
      "雲達",
      "英業達",
      "緯創",
      "中華電信"
    ],
    "downstreamApplications": [
      "IaaS",
      "PaaS",
      "SaaS"
    ],
    "supplyChain": []
  },
  {
    "id": "ai",
    "name": "人工智慧產業",
    "parentCategory": "新興產業",
    "color": "green",
    "mainLayers": "軟體 / 運算平台 / 服務",
    "representativeCompanies": [
      "IBM",
      "HP",
      "DELL",
      "宏達電",
      "廣達"
    ],
    "downstreamApplications": [
      "機器學習",
      "電腦視覺",
      "自然語言處理",
      "移動控制"
    ],
    "supplyChain": [
      {
        "layer": "人工智慧",
        "category": "軟體",
        "subCategory": "機器學習",
        "companies": [
          {
            "name": "沛星互動",
            "searchQuery": "沛星互動"
          },
          {
            "name": "宇匯知識",
            "searchQuery": "宇匯知識"
          },
          {
            "name": "策略無限",
            "searchQuery": "策略無限"
          },
          {
            "name": "諦諾科技",
            "searchQuery": "諦諾科技"
          },
          {
            "name": "傑騰智能",
            "searchQuery": "傑騰智能"
          },
          {
            "name": "HiHedge",
            "searchQuery": "HiHedge"
          }
        ]
      },
      {
        "layer": "人工智慧",
        "category": "軟體",
        "subCategory": "電腦視覺",
        "companies": [
          {
            "name": "Google",
            "searchQuery": "Google"
          },
          {
            "name": "Microsoft",
            "searchQuery": "Microsoft"
          },
          {
            "name": "IBM",
            "searchQuery": "IBM"
          },
          {
            "name": "Amazon",
            "searchQuery": "Amazon"
          },
          {
            "name": "創意引晴",
            "searchQuery": "創意引晴"
          },
          {
            "name": "盾心科技",
            "searchQuery": "盾心科技"
          },
          {
            "name": "灼灼科技",
            "searchQuery": "灼灼科技"
          }
        ]
      },
      {
        "layer": "人工智慧",
        "category": "軟體",
        "subCategory": "自然語言處理(含語音)",
        "companies": [
          {
            "name": "Google",
            "searchQuery": "Google"
          },
          {
            "name": "Microsoft",
            "searchQuery": "Microsoft"
          },
          {
            "name": "IBM",
            "searchQuery": "IBM"
          },
          {
            "name": "Amazon",
            "searchQuery": "Amazon"
          },
          {
            "name": "科大訊飛",
            "searchQuery": "科大訊飛"
          },
          {
            "name": "竹間智能",
            "searchQuery": "竹間智能"
          }
        ]
      },
      {
        "layer": "人工智慧",
        "category": "運算平台",
        "subCategory": "本地運算平台",
        "companies": [
          {
            "name": "IBM",
            "searchQuery": "IBM"
          },
          {
            "name": "HP",
            "searchQuery": "HP"
          },
          {
            "name": "DELL",
            "searchQuery": "DELL"
          },
          {
            "name": "宏達電",
            "searchQuery": "宏達電"
          },
          {
            "name": "廣達",
            "searchQuery": "廣達"
          },
          {
            "name": "神達",
            "searchQuery": "神達"
          },
          {
            "name": "研華",
            "searchQuery": "研華"
          },
          {
            "name": "宏碁",
            "searchQuery": "宏碁"
          }
        ]
      },
      {
        "layer": "人工智慧",
        "category": "運算平台",
        "subCategory": "雲端運算平台",
        "companies": [
          {
            "name": "Amazon",
            "searchQuery": "Amazon"
          },
          {
            "name": "Microsoft",
            "searchQuery": "Microsoft"
          },
          {
            "name": "Google",
            "searchQuery": "Google"
          },
          {
            "name": "宏達電",
            "searchQuery": "宏達電"
          },
          {
            "name": "中華電信",
            "searchQuery": "中華電信"
          }
        ]
      },
      {
        "layer": "人工智慧",
        "category": "服務",
        "subCategory": "顧問諮詢",
        "companies": [
          {
            "name": "IBM",
            "searchQuery": "IBM"
          },
          {
            "name": "PwC",
            "searchQuery": "PwC"
          },
          {
            "name": "KPMG",
            "searchQuery": "KPMG"
          },
          {
            "name": "Deloitte",
            "searchQuery": "Deloitte"
          }
        ]
      },
      {
        "layer": "人工智慧",
        "category": "服務",
        "subCategory": "系統整合",
        "companies": [
          {
            "name": "精誠",
            "searchQuery": "精誠"
          },
          {
            "name": "神通",
            "searchQuery": "神通"
          },
          {
            "name": "凌群",
            "searchQuery": "凌群"
          },
          {
            "name": "大世科",
            "searchQuery": "大世科"
          },
          {
            "name": "盟立自動化",
            "searchQuery": "盟立自動化"
          }
        ]
      }
    ]
  },
  {
    "id": "smart-manufacturing",
    "name": "智慧製造產業",
    "parentCategory": "新興產業",
    "color": "green",
    "mainLayers": "上游零組件 / 中游設備系統 / 下游應用整合",
    "representativeCompanies": [
      "台達電",
      "研華",
      "盟立",
      "均豪",
      "廣運"
    ],
    "downstreamApplications": [
      "各製造業的智慧工廠解決方案"
    ],
    "supplyChain": [
      {
        "layer": "智慧製造",
        "category": "上游零組件",
        "subCategory": "威知元件/裝置",
        "companies": [
          {
            "name": "三聯",
            "searchQuery": "三聯"
          },
          {
            "name": "研華",
            "searchQuery": "研華"
          },
          {
            "name": "均豪",
            "searchQuery": "均豪"
          },
          {
            "name": "鼎元",
            "searchQuery": "鼎元"
          },
          {
            "name": "桓達",
            "searchQuery": "桓達"
          },
          {
            "name": "聯興微系統",
            "searchQuery": "聯興微系統"
          },
          {
            "name": "原見精機",
            "searchQuery": "原見精機"
          },
          {
            "name": "宇田控制科技",
            "searchQuery": "宇田控制科技"
          }
        ]
      },
      {
        "layer": "智慧製造",
        "category": "上游零組件",
        "subCategory": "精密控制裝置",
        "companies": [
          {
            "name": "台達電",
            "searchQuery": "台達電"
          },
          {
            "name": "研華寶元",
            "searchQuery": "研華寶元"
          },
          {
            "name": "新代",
            "searchQuery": "新代"
          },
          {
            "name": "智研科技",
            "searchQuery": "智研科技"
          },
          {
            "name": "動程科技",
            "searchQuery": "動程科技"
          }
        ],
        "notes": "工具機及產業機械控制器"
      },
      {
        "layer": "智慧製造",
        "category": "中游設備系統",
        "subCategory": "智慧化加工設備",
        "companies": [
          {
            "name": "東台",
            "searchQuery": "東台"
          },
          {
            "name": "永進",
            "searchQuery": "永進"
          },
          {
            "name": "程泰",
            "searchQuery": "程泰"
          },
          {
            "name": "台中精機",
            "searchQuery": "台中精機"
          },
          {
            "name": "遠東機械",
            "searchQuery": "遠東機械"
          },
          {
            "name": "協鴻",
            "searchQuery": "協鴻"
          },
          {
            "name": "高聖精密",
            "searchQuery": "高聖精密"
          }
        ]
      },
      {
        "layer": "智慧製造",
        "category": "中游設備系統",
        "subCategory": "物聯網方案與應用平台",
        "companies": [
          {
            "name": "研華",
            "searchQuery": "研華"
          },
          {
            "name": "樺漢",
            "searchQuery": "樺漢"
          },
          {
            "name": "凌華",
            "searchQuery": "凌華"
          },
          {
            "name": "研揚",
            "searchQuery": "研揚"
          },
          {
            "name": "新漢",
            "searchQuery": "新漢"
          },
          {
            "name": "工業電腦嵌入式運算裝置",
            "searchQuery": "工業電腦嵌入式運算裝置"
          }
        ]
      },
      {
        "layer": "智慧製造",
        "category": "中游設備系統",
        "subCategory": "OT/IT軟體系統",
        "companies": [
          {
            "name": "鼎新",
            "searchQuery": "鼎新"
          },
          {
            "name": "資通",
            "searchQuery": "資通"
          },
          {
            "name": "台塑網",
            "searchQuery": "台塑網"
          },
          {
            "name": "正航",
            "searchQuery": "正航"
          },
          {
            "name": "誠陽科技",
            "searchQuery": "誠陽科技"
          },
          {
            "name": "漢門科技",
            "searchQuery": "漢門科技"
          },
          {
            "name": "益模管理精聯電子",
            "searchQuery": "益模管理精聯電子"
          }
        ],
        "notes": "ERP/PLM"
      },
      {
        "layer": "智慧製造",
        "category": "下游應用整合",
        "subCategory": "自動化系統整合",
        "companies": [
          {
            "name": "盟立",
            "searchQuery": "盟立"
          },
          {
            "name": "東台",
            "searchQuery": "東台"
          },
          {
            "name": "禾裕",
            "searchQuery": "禾裕"
          },
          {
            "name": "協易",
            "searchQuery": "協易"
          },
          {
            "name": "台勵福",
            "searchQuery": "台勵福"
          },
          {
            "name": "台達電",
            "searchQuery": "台達電"
          },
          {
            "name": "廣運",
            "searchQuery": "廣運"
          },
          {
            "name": "迅得",
            "searchQuery": "迅得"
          },
          {
            "name": "洋威數控",
            "searchQuery": "洋威數控"
          },
          {
            "name": "兆強",
            "searchQuery": "兆強"
          },
          {
            "name": "統旺",
            "searchQuery": "統旺"
          }
        ]
      },
      {
        "layer": "智慧製造",
        "category": "下游應用整合",
        "subCategory": "智慧工廠應用整合",
        "companies": [
          {
            "name": "研華",
            "searchQuery": "研華"
          },
          {
            "name": "台達電",
            "searchQuery": "台達電"
          },
          {
            "name": "四零四科技",
            "searchQuery": "四零四科技"
          },
          {
            "name": "鋐拉",
            "searchQuery": "鋐拉"
          },
          {
            "name": "新鼎",
            "searchQuery": "新鼎"
          },
          {
            "name": "泓格",
            "searchQuery": "泓格"
          },
          {
            "name": "加雲聯網",
            "searchQuery": "加雲聯網"
          },
          {
            "name": "智能生產方案服務",
            "searchQuery": "智能生產方案服務"
          },
          {
            "name": "聯達智能",
            "searchQuery": "聯達智能"
          }
        ]
      }
    ]
  }
];
