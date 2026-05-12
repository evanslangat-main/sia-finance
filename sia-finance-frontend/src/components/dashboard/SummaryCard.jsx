/*
  Reusable Summary Card

  Props:
  - title
  - amount
*/

const SummaryCard = ({ title, amount }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">

      {/* Card Title */}
      <p className="text-gray-500 text-sm mb-2">
        {title}
      </p>

      {/* Main Value */}
      <h3 className="text-3xl font-bold">
        {amount}
      </h3>

    </div>
  );
};

export default SummaryCard;