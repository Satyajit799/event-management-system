const StatCard = ({
  title,
  value,
}) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      hover:shadow-xl
      transition-all
      p-6
      "
    >
      <h2 className="text-gray-500">
        {title}
      </h2>

      <p className="text-5xl font-bold mt-4">
        {value}
      </p>
    </div>
  );
};

export default StatCard;