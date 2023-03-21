const ReminderButton = ({ onClick }: { onClick: React.MouseEventHandler }) => {
  return (
    <button onClick={onClick}>
      Remind me
      <style jsx>{`
        button {
          cursor: pointer;
          border-radius: 6px;
          transition: 0.3s;
          width: 100%;
          background: var(--background-color);
          border: 1px solid var(--box-shadow);
          position: relative;
          color: var(--box-shadow);
          padding: 0.25rem 0.5rem;
          transition: 0.3s;
        }
        .button-background {
        }
        button:hover {
          background: var(--bg-color-tertiary);
        }
        button:active {
          box-shadow: 0 0 20px 1px var(--box-shadow);
        }
        button:disabled {
          color: var(--box-shadow-light);
          box-shadow: none;
          background: var(--bg-color);
          border: 1px solid var(--box-shadow-light);
          cursor: initial;
        }
        button:disabled:hover {
          filter: none;
        }
      `}</style>
    </button>
  );
};

export default ReminderButton;
