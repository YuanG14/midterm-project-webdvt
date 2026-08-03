import { FilePlus2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PlaceholderPanel from "../components/PlaceholderPanel";

function AddTransaction() {
  return (
    <div>
      <PageHeader
        eyebrow="New Entry"
        title="Add Transaction"
        description="A form for logging income and expenses, with category and date selection, will appear here."
      />
      <PlaceholderPanel
        icon={FilePlus2}
        label="Transaction form arrives in a later phase"
        hint="Fields for amount, category, date, and notes will be built out once form logic is implemented."
      />
    </div>
  );
}

export default AddTransaction;
