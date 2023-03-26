import { useState, useEffect } from "react";
const Clock = () => {
  const [date, setDate] = useState(new Date());

  const refreshClock = () => {
    setDate(new Date());
  };
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  return (
    <span className="border-1 flex items-center rounded-lg border border-gray-500 py-1 px-2 text-xs opacity-60">
      {date?.toLocaleTimeString("en-US", {
        hour12: false,
      })}
    </span>
  );
};
export default Clock;
