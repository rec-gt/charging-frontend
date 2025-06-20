import { LANG_OBJ } from "../utils";

export const initLanguage = () => {
  const lang = sessionStorage.getItem("LANGUAGE");
  if (!Object.values(LANG_OBJ.LANG).includes(lang as string)) {
    sessionStorage.setItem("LANGUAGE", LANG_OBJ.LANG.ZH_T);
  }
};
