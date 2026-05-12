import DashboardLayout from "../layouts/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";

/*
  Main Dashboard Page
*/

const DashboardPage = () => {
  return (
    <DashboardLayout>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <SummaryCard
          title="Total Balance"
          amount="$12,450"
        />

        <SummaryCard
          title="Income"
          amount="$8,200"
        />

        <SummaryCard
          title="Expenses"
          amount="$3,120"
        />

        <SummaryCard
          title="Savings"
          amount="$5,080"
        />

      </div>

    </DashboardLayout>
  );
};

export default DashboardPage;