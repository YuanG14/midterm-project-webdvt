import { Receipt } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PlaceholderPanel from "../components/PlaceholderPanel";

function TransactionDetail() {
  return (
    <div>
      <PageHeader
        eyebrow="Record"
        title="Transaction Detail"
        description="Full details for a single transaction, including edit and delete actions, will be shown here."
      />
      <PlaceholderPanel
        icon={Receipt}
        label="Transaction details arrive in a later phase"
        hint="Once routing is connected to real data, this page will render the selected transaction's full record."
      />
    </div>
  );
}

export default TransactionDetail;
