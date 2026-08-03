import { ChartSpline } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PlaceholderPanel from "../components/PlaceholderPanel";

function Summary() {
  return (
    <div>
      <PageHeader
        eyebrow="Insights"
        title="Summary"
        description="Category breakdowns and spending charts, calculated from your transaction history, will appear here."
      />
      <PlaceholderPanel
        icon={ChartSpline}
        label="Charts and totals arrive in a later phase"
        hint="Once summary calculations are implemented, this space will hold category and trend visualizations."
      />
    </div>
  );
}

export default Summary;
