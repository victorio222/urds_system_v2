import React from 'react';

interface DateInputsProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInputs: React.FC<DateInputsProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="flex gap-4 ">
      {/* Start Date */}
      <div className="flex flex-col w-44">
        <label className="block text-sm font-medium mb-1 text-[#190072]">
          Starting Date
        </label>
        <input
          type="date"
          className="w-full h-[42px] border rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 text-gray-400 focus:ring-blue-500"
          value={startDate}
          onChange={onStartDateChange}
        />
      </div>
      {/* End Date */}
      <div className="flex flex-col w-44">
        <label className="block text-sm font-medium mb-1 text-[#190072]">
          Ending date
        </label>
        <input
          type="date"
          className="w-full h-[42px] border rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 text-gray-400 focus:ring-blue-500"
          value={endDate}
          onChange={onEndDateChange}
        />
      </div>
    </div>
  );
};

export default DateInputs;
