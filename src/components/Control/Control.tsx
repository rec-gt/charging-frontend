import { Statistics } from ".";
import { LANG, LANG_ENUM, LANG_OBJ } from "../../utils";
import { PageLayout } from "../PageLayout";

export const ControlPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center mt-2 mb-4">
        <div className="text-[15pt]!">{LANG_OBJ.TITLE.JP}</div>
        {sessionStorage.getItem("LANGUAGE") !== LANG_ENUM.JP && (
          <div className="mt-2">{LANG(LANG_OBJ.TITLE)}</div>
        )}
      </div>

      <div className="flex flex-col gap-2 justify-between sm:flex-row mb-50">
        <div className="flex-1">
          <Statistics />
        </div>
      </div>
    </PageLayout>
  );
};
