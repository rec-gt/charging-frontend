import { Statistics } from ".";
import { PageLayout } from "../PageLayout";
import { DemoPhoto } from "./DemoPhoto";

export const ControlPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-2 justify-between sm:flex-row h-[calc(600px+60px)]">
        <div className="flex-1">
          <DemoPhoto />
        </div>
        <div className="flex-2">
          <Statistics />
        </div>
      </div>
    </PageLayout>
  );
};
