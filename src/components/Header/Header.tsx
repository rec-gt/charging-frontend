import React, { useState } from "react";
import { LANG_ENUM, LANG_OBJ } from "../../utils";
export const Header: React.FC = () => {
  const [lang, setLang] = useState(sessionStorage.getItem("LANGUAGE"));

  const handleSetLang = (lang: LANG_ENUM) => {
    if (lang === LANG_ENUM.ZH_S) return;
    setLang(lang);
    sessionStorage.setItem("LANGUAGE", lang);
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center py-4 px-4 w-full h-24 bg-(--color-secondary)">
      <img className="h-full object-contain" src="/images/logo.png" />
      <div className="flex gap-2">
        {Object.values(LANG_ENUM).map((e) => {
          return (
            <div
              key={e}
              onClick={() => {
                handleSetLang(e);
              }}
              className="cursor-pointer"
            >
              {e == LANG_ENUM.ZH_S ? (
                <div className="cursor-not-allowed text-[#aaa]">{LANG_OBJ.LANG[e]}</div>
              ) : e == lang ? (
                <b className="underline">{LANG_OBJ.LANG[e]}</b>
              ) : (
                <div>{LANG_OBJ.LANG[e]}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
