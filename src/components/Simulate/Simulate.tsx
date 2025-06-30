import { PageLayout } from "../PageLayout";
import { SystemTitle } from "../Title";

export const SimulatePage: React.FC = () => {
  return (
    <PageLayout>
      <div className="w-full block sm:hidden">
        <SystemTitle />
      </div>
      <div className="flex flex-col gap-2 justify-between sm:flex-row mb-10 min-h-[500px]">
        <div className="flex-1"></div>
      </div>
    </PageLayout>
  );
};
