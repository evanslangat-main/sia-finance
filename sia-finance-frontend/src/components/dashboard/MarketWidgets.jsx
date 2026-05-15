/*
  External Market Widgets
*/

const MarketWidgets = ({
  marketData,
}) => {

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      {/* Bitcoin */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-400">

        <p className="text-gray-500 text-sm mb-2">
          Bitcoin
        </p>

        <h2 className="text-3xl font-bold">
          $
          {marketData.crypto?.bitcoin?.toLocaleString()}
        </h2>

      </div>

      {/* Ethereum */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-400">

        <p className="text-gray-500 text-sm mb-2">
          Ethereum
        </p>

        <h2 className="text-3xl font-bold">
          $
          {marketData.crypto?.ethereum?.toLocaleString()}
        </h2>

      </div>

      {/* USD/KES */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-400">

        <p className="text-gray-500 text-sm mb-2">
          USD → KES
        </p>

        <h2 className="text-3xl font-bold">
          KES
          {" "}
          {marketData.exchange_rates?.USD_KES?.toFixed(2)}
        </h2>

      </div>

    </div>
  );
};

export default MarketWidgets;