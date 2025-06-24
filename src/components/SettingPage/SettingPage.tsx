import { PageLayout } from "../PageLayout";

export const SettingPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-2 justify-between sm:flex-row mb-10 min-h-[500px]">
        <div className="flex-1">
          SET POINT TEMPERATURE <input />
        </div>
      </div>
    </PageLayout>
  );
};
