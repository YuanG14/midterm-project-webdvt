import { LayoutGrid } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PlaceholderPanel from "../components/PlaceholderPanel";

function Dashboard() {
  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="A quick snapshot of your balances, recent activity, and spending trends will live here."
      />
      <PlaceholderPanel
        icon={LayoutGrid}
        label="Summary cards arrive in a later phase"
        hint="Balance, income, and expense cards will be laid out in this space once transaction data is wired up."
      />
    </div>
  );
}

export default Dashboard;
