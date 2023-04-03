import { add, format, formatISO, startOfDay } from "date-fns";
import { Recurring } from "@/global/types";
import { useState } from "react";
import { uuidv4 } from "@firebase/util";
import DayPickerC from "@/components/DayPickerC/DayPickerC";
import Modal from "@/components/Modal/Modal";
import { NewTaskInitial } from "@/global/initialTypes";

const MakeRecurrent = ({
  closeModalOnClick,
  handleRecurring,
}: {
  closeModalOnClick: Function;
  handleRecurring: Function;
}) => {
  const RECURRING_NUMBERS_OPT = Array.from(Array(10).keys());
  const RECURRING_OPTIONS_OPT = ["days", "weeks"];
  const WEEK_DAYS = [
    { day: "Sunday", num: 0 },
    { day: "Monday", num: 1 },
    { day: "Tuesday", num: 2 },
    { day: "Wednesday", num: 3 },
    { day: "Thursday", num: 4 },
    { day: "Friday", num: 5 },
    { day: "Saturday", num: 6 },
  ];
  const [input, setInput] = useState<Recurring>({
    recurring_days: [],
    recurring_end: "",
    recurring_id: "",
    recurring_number: RECURRING_NUMBERS_OPT[1],
    recurring_option: RECURRING_OPTIONS_OPT[0],
    recurring_start: "",
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

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const name: string = (event.target as HTMLSelectElement).name;
    let value: string | number = (event.target as HTMLSelectElement).value;
    value = name === "recurring_number" ? Number(value) : String(value);
    setInput({
      ...input,
      recurring_days: [],
      [name]: value,
    });
  };

  const handleDaysSelected = (event: React.MouseEvent) => {
    event.preventDefault();
    const value: number = Number((event.target as HTMLButtonElement).value);
    const recurringDays = [...input.recurring_days];
    if (!recurringDays.includes(value)) {
      const newDaysSelected = [...input.recurring_days];
      newDaysSelected.push(value);
      setInput({
        ...input,
        recurring_days: newDaysSelected,
      });
    } else {
      const newDaysSelected = input.recurring_days.filter((d) => d !== value);
      setInput({
        ...input,
        recurring_days: newDaysSelected,
      });
    }
  };

  const handleApply = (event: React.MouseEvent) => {
    event.preventDefault();
    const uuid = uuidv4();
    const recurringData: Recurring = {
      recurring_days: input.recurring_days,
      recurring_end: formatISO(endDay),
      recurring_id: uuid,
      recurring_number: input.recurring_number,
      recurring_option: input.recurring_option,
      recurring_start: formatISO(startDay),
    };
    handleRecurring(recurringData, true);
    closeModalOnClick();
  };

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
    handleRecurring(NewTaskInitial.recurring, false);
    closeModalOnClick();
  };

  return (
    <Modal onCloseRedirect="" closeModalOnClick={closeModalOnClick}>
      <div className="gap- flex h-[300px] w-[270px]  flex-col items-start justify-start p-2">
        <span className="text-sm">Repeat mode</span>
        <div className="flex gap-2">
          <div className="">Every</div>
          <select
            name="recurring_number"
            value={input.recurring_number}
            id=""
            className="cursor-pointer bg-transparent"
            onChange={handleSelect}
          >
            {RECURRING_NUMBERS_OPT.map((n) => (
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
            name="recurring_option"
            value={input.recurring_option}
            id=""
            className="cursor-pointer bg-transparent"
            onChange={handleSelect}
          >
            {RECURRING_OPTIONS_OPT.map((o) => (
              <option className="bg-transparent text-black" key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        {input.recurring_option === "weeks" ? (
          <div className="flex flex-col gap-1">
            <span>Select days of the week</span>
            <div className="flex flex-wrap gap-2">
              {WEEK_DAYS.map((d) => (
                <button
                  key={d.num}
                  onClick={handleDaysSelected}
                  className={`flex rounded-md border p-1 ${
                    input.recurring_days.includes(d.num)
                      ? "bg-gray-300"
                      : "bg-transparent"
                  }`}
                  value={d.num}
                >
                  {d.day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          input.recurring_option === "months" && (
            <span>Select days of the month</span>
          )
        )}
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
            Discard
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
