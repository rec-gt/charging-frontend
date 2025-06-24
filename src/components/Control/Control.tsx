import { Statistics } from ".";
import { LANG, LANG_ENUM, LANG_OBJ } from "../../utils";
import { PageLayout } from "../PageLayout";

export const ControlPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center mt-2 mb-4 font-bold">
        <div className="text-[18pt]!">{LANG_OBJ.TITLE.JP}</div>
        {sessionStorage.getItem("LANGUAGE") !== LANG_ENUM.JP && (
          <div className="text-[16pt]! mt-2">{LANG(LANG_OBJ.TITLE)}</div>
        )}
      </div>

      <div className="flex flex-col gap-2 justify-between sm:flex-row mb-10 min-h-[500px]">
        <div className="flex-1">
          <Statistics />
        </div>
      </div>
    </PageLayout>
  );
};
