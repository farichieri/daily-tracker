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
          border: 1px solid var(--box-shadow);
          padding: 0.2rem 0.5rem;
          border-radius: 5px;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          color: var(--box-shadow);
          font-weight: 400;
        }
      `}</style>
    </span>
  );
};
export default Clock;
