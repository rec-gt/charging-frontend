export enum LANG_ENUM {
  EN = "EN",
  JP = "JP",
  ZH_T = "ZH_T",
}

export const LANG_OBJ = {
  LANG: {
    EN: "EN",
    JP: "日",
    ZH_T: "繁",
  },
  TITLE: {
    EN: "Electrical Hand Tools Charging Station loT Temperature and Current Monitoring & Control System",
    JP: "ポータブル電動工具充電ステーション IoT 温度および電流監視システム",
    ZH_T: "手提電工具充電站loT溫度及電流監控系統",
  },
  GAUGE: {
    AMBIENT_TEMP: {
      EN: "Ambient Temp.",
      JP: "周囲温度",
      ZH_T: "環境温度",
    },
    STATION_TEMP: {
      EN: "Charging Station Temp.",
      JP: "充電ステーションの温度",
      ZH_T: "充電站温度",
    },
    CURRENT: {
      EN: "Electricity Current",
      JP: "充電ステーションの電流",
      ZH_T: "充電站電流",
    },
    TEMP_MONITOR: {
      EN: "Temperature",
      JP: "温度監視",
      ZH_T: "温度監測",
    },
    CHART_LABEL: {
      AMBIENT: {
        EN: "Ambient Temp.",
        JP: "周囲温度",
        ZH_T: "環境温度",
      },
      STATION: {
        EN: "Charging Station Temp.",
        JP: "充電ステーションの温度",
        ZH_T: "充電站温度",
      },
    },
    CURRENT_MONITOR: {
      EN: "Current",
      JP: "電流監視",
      ZH_T: "電流監測",
    },
  },
  CHARGING: {
    ON: {
      EN: "Power Charging",
      JP: "充電",
      ZH_T: "充電中",
    },
    OFF: {
      EN: "Charging Stopped",
      JP: "充電を停止",
      ZH_T: "停止充電",
    },
    MODE: {
      TITLE: {
        EN: "Mode",
        JP: "作業モード",
        ZH_T: "工作模式",
      },
      RUNNING: {
        EN: "Running",
        JP: "ランニング",
        ZH_T: "運作中",
      },
      STOPPED: {
        EN: "Stopped",
        JP: "停止",
        ZH_T: "停止",
      },
      BYPASS: {
        EN: "Maintenance",
        JP: "メンテナンス",
        ZH_T: "維護",
      },
      SIMUATION: {
        EN: "Simulation",
        JP: "シミュレーション",
        ZH_T: "模擬",
      },
    },
    SIMUATION_MODE: {
      EN: "Simulation Mode",
      JP: "シミュレーションモード",
      ZH_T: "模擬模式",
      ON: {
        EN: "Enabled",
        JP: "有効",
        ZH_T: "開啓",
      },
      OFF: {
        EN: "Disabled",
        JP: "無効",
        ZH_T: "關閉",
      },
    },
    THRESHOLD: {
      EN: "Threshold",
      JP: "臨界温度/電流",
      ZH_T: "臨界溫度/電流",
      TEMP: {
        EN: "Threshold Temp.",
        JP: "臨界温度",
        ZH_T: "臨界溫度",
      },
      CURRENT: {
        EN: "Threshold Current",
        JP: "臨界電流",
        ZH_T: "臨界電流",
      },
    },
  },
};

let CURRENT_LANG = LANG_ENUM.ZH_T;

const initLanguage = () => {
  const lang = sessionStorage.getItem("LANGUAGE") as LANG_ENUM;
  if (!Object.values(LANG_ENUM).includes(lang)) {
    sessionStorage.setItem("LANGUAGE", LANG_ENUM.ZH_T);
    CURRENT_LANG = LANG_ENUM.ZH_T;
    window.location.reload();
  }
  CURRENT_LANG = lang;
};

initLanguage();

export const LANG = (langObj: object) => {
  return (langObj as any)[CURRENT_LANG];
};
