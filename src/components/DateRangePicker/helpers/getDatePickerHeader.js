import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import moment from "moment";

export const getDatePickerHeader = ({
  monthDate,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <div className="flex items-center justify-between p-1">
    <button
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FaChevronLeft className="text-black" />
    </button>
    <span className="text-lg font-semibold text-gray-800 dark:text-white">
      {moment(monthDate).format("MMMM yyyy")}
    </span>
    <button
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FaChevronRight className="text-black" />
    </button>
  </div>
);
