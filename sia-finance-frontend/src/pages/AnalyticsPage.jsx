import DashboardLayout from "../layouts/DashboardLayout";

/*
  Analytics Page
*/

const AnalyticsPage = () => {
  return (
    <DashboardLayout>

      <div className="bg-white rounded-2xl p-6 shadow-sm border">

        <h1 className="text-2xl font-bold mb-2">
          Analytics
        </h1>

        <p className="text-gray-500">
          Financial insights and reports
        </p>

      </div>

    </DashboardLayout>
  );
};

export default AnalyticsPage;