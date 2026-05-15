/*
  Reusable Analytics Card
*/

const SummaryCard = ({
  title,
  amount,
}) => {

  return (

    <div className="bg-white rounded-2xl p-6 shadow-sm border">

      {/* Card Title */}
      <p className="text-gray-500 text-sm mb-2">
        {title}
      </p>

      {/* Amount */}
      <h3 className="text-3xl font-bold">
        ${Number(amount).toLocaleString()}
      </h3>

    </div>
  );
};

export default SummaryCard;