import DashboardLayout from "../layouts/DashboardLayout";

/*
  Settings Page
*/

const SettingsPage = () => {
  return (
    <DashboardLayout>

      <div className="bg-white rounded-2xl p-6 shadow-sm border">

        <h1 className="text-2xl font-bold mb-2">
          Settings
        </h1>

        <p className="text-gray-500">
          Account and application preferences
        </p>

      </div>

    </DashboardLayout>
  );
};

export default SettingsPage;