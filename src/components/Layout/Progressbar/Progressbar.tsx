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
    <div
      className={`h-1 w-full min-w-full overflow-auto rounded-3xl border-none bg-gray-200`}
    >
      <div className="fill">
        {/* <span className="text">{`${progress}%`}</span> */}
      </div>
      <style jsx>
        {`
          .fill {
            height: 100%;
            width: ${progress}%;
            background-color: ${bgcolor};
            background-color: var(--progress-done);
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
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
