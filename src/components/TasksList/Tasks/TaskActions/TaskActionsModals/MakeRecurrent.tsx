import DayPickerC from "@/components/DayPickerC/DayPickerC";
import Modal from "@/components/Modal/Modal";
import { Recurring } from "@/global/types";
import { uuidv4 } from "@firebase/util";
import { add, format, formatISO, startOfDay } from "date-fns";
import { useState } from "react";

const MakeRecurrent = ({
  closeModalOnClick,
  handleRecurring,
}: {
  closeModalOnClick: Function;
  handleRecurring: Function;
}) => {
  const REPEAT_NUMBERS = Array.from(Array(10).keys());
  const REPEAT_OPTIONS = ["days", "weeks", "months"];
  const [input, setInput] = useState({
    repeat_number: REPEAT_NUMBERS[1],
    repeat_option: REPEAT_OPTIONS[0],
  });
  const [startDay, setStartDay] = useState<Date>(startOfDay(new Date()));
  const [endDay, setEndDay] = useState<Date>(
    add(startOfDay(new Date()), { days: 7 })
  );

  const [openStartPicker, setOpenStartPicker] = useState(false);
  const startShow = startDay && format(startDay, "MM-dd-yyyy"); // April 2023
  const todayDisplay = format(new Date(), "MM-dd-yyyy"); // US Format
  const dateStartDisplay = startShow === todayDisplay ? "Today" : startShow;

  const [openEndPicker, setOpenEndPicker] = useState(false);
  const endShow = endDay && format(endDay, "MM-dd-yyyy"); // April 2023
  const dateEndSDisplay = endShow === todayDisplay ? "Today" : endShow;

  const handleSelectStart = (day: Date | undefined) => {
    if (day) {
      setStartDay(day);
    }
  };
  const handleSelectEnd = (day: Date | undefined) => {
    if (day) {
      console.log({ day });
      setEndDay(day);
    }
  };

  const removeDate = (event: React.MouseEvent) => {
    event.preventDefault();
    setStartDay(new Date());
  };

  const handleApply = (event: React.MouseEvent) => {
    const uuid = uuidv4();
    event.preventDefault();
    const recurringData: Recurring = {
      recurring_end: formatISO(endDay),
      recurring_id: uuid,
      recurring_number: input.repeat_number,
      recurring_option: input.repeat_option,
      recurring_start: formatISO(startDay),
    };
    handleRecurring(recurringData);
    closeModalOnClick();
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    closeModalOnClick();
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const name = (event.target as HTMLSelectElement).name;
    const value = (event.target as HTMLSelectElement).value;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <Modal onCloseRedirect="" closeModalOnClick={closeModalOnClick}>
      <div className="flex min-h-[25vh] w-full min-w-[25vw] flex-col  items-start justify-start p-2">
        Repeat mode
        <div className="flex gap-2">
          <div className="">Every</div>
          <select
            name="repeat_number"
            value={input.repeat_number}
            id=""
            className="bg-transparent"
            onChange={handleSelect}
          >
            {REPEAT_NUMBERS.map((n) => (
              <option
                className="bg-transparent text-black"
                key={n + 1}
                value={n + 1}
              >
                {n + 1}
              </option>
            ))}
          </select>
          <select
            name="repeat_option"
            value={input.repeat_option}
            id=""
            className="bg-transparent"
            onChange={handleSelect}
          >
            {REPEAT_OPTIONS.map((o) => (
              <option className="bg-transparent text-black" key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-fit min-w-full items-center gap-1">
          <span className="flex w-full min-w-fit">Starting from</span>
          <DayPickerC
            addTask={false}
            dateSelected={startDay}
            dateToShow={dateStartDisplay}
            handleDateSelected={handleSelectStart}
            open={openStartPicker}
            removeDate={removeDate}
            setOpen={setOpenStartPicker}
            setWantToAddDate={() => {}}
            withModal={true}
          />
        </div>
        <div className="flex w-fit min-w-full items-center gap-1">
          <span className="flex w-full min-w-fit">Ends</span>
          <DayPickerC
            addTask={false}
            dateSelected={endDay}
            dateToShow={dateEndSDisplay}
            handleDateSelected={handleSelectEnd}
            open={openEndPicker}
            removeDate={removeDate}
            setOpen={setOpenEndPicker}
            setWantToAddDate={() => {}}
            withModal={true}
          />
        </div>
        <div className="mt-auto flex w-full items-center justify-center gap-2 border-t pt-2">
          <button
            className="flex rounded-md border border-gray-500 p-1 active:shadow active:shadow-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="flex rounded-md border border-gray-500 p-1 active:shadow active:shadow-gray-500"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MakeRecurrent;
