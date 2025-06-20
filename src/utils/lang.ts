export enum LANG_ENUM {
  EN = "EN",
  ZH_S = "ZH_S",
  ZH_T = "ZH_T",
}

export const LANG_OBJ = {
  LANG: {
    EN: "EN",
    ZH_S: "簡",
    ZH_T: "繁",
  },
  SYSTEM_TITLE: {
    EN: "HSWW SYSTEM",
    ZH_S: "",
    ZH_T: "暑熱天氣警報系統",
  },
  HSWW_AMBER_OUTDOOR: {
    EN: "ISSUE AMBER WARNING (OUTDOOR)",
    ZH_S: "",
    ZH_T: "發出黃色警報 (戶外)",
  },
  HSWW_RED_OUTDOOR: {
    EN: "ISSUE RED WARNING (OUTDOOR)",
    ZH_S: "",
    ZH_T: "發出紅色警報 (戶外)",
  },
  HSWW_BLACK_OUTDOOR: {
    EN: "ISSUE BLACK WARNING (OUTDOOR)",
    ZH_S: "",
    ZH_T: "發出黑色警報 (戶外)",
  },
  HSWW_CANCEL_OUTDOOR: {
    EN: "CANCEL WARNING",
    ZH_S: "",
    ZH_T: "取消警報",
  },
  HSWW_AMBER_INDOOR: {
    EN: "ISSUE AMBER WARNING (INDOOR)",
    ZH_S: "",
    ZH_T: "發出黃色警報 (室内)",
  },
  HSWW_RED_INDOOR: {
    EN: "ISSUE RED WARNING (INDOOR)",
    ZH_S: "",
    ZH_T: "發出紅色警報 (室内)",
  },
  HSWW_BLACK_INDOOR: {
    EN: "ISSUE BLACK WARNING (INDOOR)",
    ZH_S: "",
    ZH_T: "發出黑色警報 (室内)",
  },
  HSWW_CANCEL_INDOOR: {
    EN: "CANCEL WARNING",
    ZH_S: "",
    ZH_T: "取消警報",
  },
  SYSTEM_MODE: {
    AUTO: {
      EN: "AUTO MODE",
      ZH_S: "",
      ZH_T: "自動模式",
    },
    MANUAL: {
      EN: "MANUAL MODE",
      ZH_S: "",
      ZH_T: "手動模式",
    },
  },
  CURRENT_SITUATION_TEXT: { EN: "", ZH_S: "", ZH_T: "目前暑熱天氣警報" },
  WARNING_COLOR: {
    AMBER: { EN: "AMBER", ZH_S: "", ZH_T: "黃" },
    RED: { EN: "RED", ZH_S: "", ZH_T: "紅" },
    BLACK: { EN: "BLACK", ZH_S: "", ZH_T: "黑" },
    CANCEL: { EN: "CANCEL", ZH_S: "", ZH_T: "取消" },
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
