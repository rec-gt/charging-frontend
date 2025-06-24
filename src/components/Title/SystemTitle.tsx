import { LANG, LANG_ENUM, LANG_OBJ } from "../../utils";

export const SystemTitle: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mt-2 mb-4 font-bold">
      {sessionStorage.getItem("LANGUAGE") !== LANG_ENUM.JP && (
        <div className="text-[16pt]! mt-2">{LANG(LANG_OBJ.TITLE)}</div>
      )}
      <div className="text-[18pt]!">{LANG_OBJ.TITLE.JP}</div>
    </div>
  );
};
