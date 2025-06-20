import React, { useState } from "react";
import { LANG, LANG_ENUM, LANG_OBJ } from "../../utils";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../state/pageLoadingSlice";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [lang, setLang] = useState(sessionStorage.getItem("LANGUAGE"));

  const handleSetLang = (lang: LANG_ENUM) => {
    dispatch(setPageLoading(true));
    setLang(lang);
    sessionStorage.setItem("LANGUAGE", lang);
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center py-4 px-4 sm:px-16 w-full h-24 bg-(--color-secondary)">
      <img className="h-full object-contain" src="/images/logo.png" />
      <div className="flex flex-col items-center text-center">
        <span>{LANG_OBJ.TITLE.JP}</span>
        {lang !== LANG_ENUM.JP && <span>{LANG(LANG_OBJ.TITLE)}</span>}
      </div>
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
