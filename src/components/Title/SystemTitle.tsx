import { LANG, LANG_ENUM, LANG_OBJ } from "../../utils";

export const SystemTitle: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mt-2 mb-4 font-bold">
      <div className="text-[16pt]!">{LANG(LANG_OBJ.TITLE)}</div>
      {sessionStorage.getItem("LANGUAGE") !== LANG_ENUM.JP && (
        <div className="text-[14pt]! mt-2">{LANG_OBJ.TITLE.JP}</div>
      )}
    </div>
  );
};
