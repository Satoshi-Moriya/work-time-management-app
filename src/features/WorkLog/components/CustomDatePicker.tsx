import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css"
import ja from 'date-fns/locale/ja';

import './CustomDatePicker.css';

registerLocale('ja', ja);

type CustomDatePickerProps = {
  selectedDate: Date;
  onChange: (date: Date) => void
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({selectedDate, onChange}) => {

  return (
    <DatePicker
      locale="ja"
      showIcon
      selected={selectedDate}
      onChange={onChange}
      dateFormat="yyyy/MM"
      showMonthYearPicker
      className="bg-gray-50 border border-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 hover:cursor-pointer"
    />
  );
}

export default CustomDatePicker;