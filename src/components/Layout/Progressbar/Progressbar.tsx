const Progressbar = ({
  bgcolor,
  progress,
  height,
}: {
  bgcolor: string;
  progress: number;
  height: number;
}) => {
  return (
    <div className="container">
      <div className="fill">
        <span className="text">{`${progress}%`}</span>
      </div>
      <style jsx>
        {`
          .container {
            width: 100%;
            background-color: whitesmoke;
            border-radius: 1rem;
            height: ${height}px;
            box-shadow: 0 0 6px 1px var(--box-shadow-light);
            margin-bottom: 0.25rem;
            min-width: 100%;
          }
          .fill {
            height: 100%;
            width: ${progress}%;
            background-color: ${bgcolor};
            background-color: var(--progress-done);
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .text {
            padding: 10px;
            color: black;
            font-size: 0.5rem;
            transform: ${progress < 5 ? "translate(+25%)" : ""};
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default Progressbar;
