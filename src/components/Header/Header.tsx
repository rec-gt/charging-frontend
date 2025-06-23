import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../state/pageLoadingSlice";
import { LANG_ENUM, LANG_OBJ, sleep } from "../../utils";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [lang, setLang] = useState(sessionStorage.getItem("LANGUAGE"));

  const handleSetLang = async (lang: LANG_ENUM) => {
    dispatch(setPageLoading(true));
    await sleep(1000);
    sessionStorage.setItem("LANGUAGE", lang);
    setLang(lang);
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center py-4 px-4 sm:px-16 w-full h-24 bg-(--color-secondary)">
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
              {e == lang ? (
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
