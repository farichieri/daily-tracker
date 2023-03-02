import { useState, useEffect } from 'react';
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
    <span>
      {date.toLocaleTimeString('en-US', {
        hour12: false,
      })}
      <style jsx>{`
        span {
          border: 1px solid var(--text-color);
          padding: 0.2rem 0.5rem;
          border-radius: 5px;
          margin-left: auto;
        }
      `}</style>
    </span>
  );
};
export default Clock;
