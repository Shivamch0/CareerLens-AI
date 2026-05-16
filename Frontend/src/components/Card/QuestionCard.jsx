import Option from "../Other/Option";

const QuestionCard = ({ data, selected, setSelected }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5">
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
          Question
        </p>
        <h3 className="text-lg font-bold leading-7 text-gray-900 sm:text-xl">
          {data.question}
        </h3>
      </div>

      <div className="space-y-3">
        {data.options?.map((opt , index) => (
          <Option
            key={index}
            option={opt}
            index={index}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
