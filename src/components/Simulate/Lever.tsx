import { PageLayout } from "../PageLayout";
import { SimulateTitle } from "../Title";

export const Lever: React.FC = () => {
  return (
    <PageLayout>
      <div className="w-full block sm:hidden">
        <SimulateTitle />
      </div>
      <div className="grid grid-cols-2 grid-rows-9 min-h-[500px]">
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </PageLayout>
  );
};
