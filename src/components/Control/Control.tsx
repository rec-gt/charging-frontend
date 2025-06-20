import { Realtime, Toggle } from ".";
import { PageLayout } from "../PageLayout";
import { DemoPhoto } from "./DemoPhoto";

export const ControlPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex-1">
          <DemoPhoto />
        </div>
        <div className="flex-2">
          <Toggle />
        </div>
        <div className="flex-1">
          <Realtime />
        </div>
      </div>
    </PageLayout>
  );
};
