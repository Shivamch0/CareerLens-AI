import { useLocation } from "react-router-dom";

const Response = () => {
  const location = useLocation();
  const { score, total } = location.state || {};

  if (!location.state) {
    return <p>No data available</p>;
  }

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Result</h2>
      <p className="text-lg">
        Score: {score} / {total}
      </p>
    </div>
  );
};

export default Response;
