const Option = ({ option , index , selected , setSelected }) => {
  const isSelected = selected === index;
  const optionLabel = String.fromCharCode(65 + index);

  return (
    <button
      type="button"
      onClick={() => setSelected(index)}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-blue-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
            isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          {optionLabel}
        </span>
        <p className="text-sm font-semibold leading-5 text-gray-700 sm:text-base">
          {option}
        </p>
      </div>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          isSelected ? "border-blue-600 bg-blue-600" : "border-gray-300"
        }`}
      >
        {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
    </button>
  );
};

export default Option;
