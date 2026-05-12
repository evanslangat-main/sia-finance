import DashboardLayout from "../layouts/DashboardLayout";

/*
  Transactions Page
*/

const TransactionsPage = () => {
  return (
    <DashboardLayout>

      <div className="bg-white rounded-2xl p-6 shadow-sm border">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-2xl font-bold">
              Transactions
            </h1>

            <p className="text-gray-500 text-sm">
              Manage your financial records
            </p>
          </div>

          <button className="bg-black text-white px-4 py-2 rounded-xl">
            Add Transaction
          </button>

        </div>

        {/* Placeholder Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b text-left">

                <th className="pb-3">Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>

              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-4">Netflix</td>
                <td>Entertainment</td>
                <td>$15</td>
                <td>12 May 2026</td>
              </tr>

              <tr className="border-b">
                <td className="py-4">Salary</td>
                <td>Income</td>
                <td>$2,000</td>
                <td>10 May 2026</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default TransactionsPage;