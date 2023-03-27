import { formatTime } from "@/utils/formatDate";

type Props = {
  secondsSpent: number;
  secondsPlanned: number;
};

const SpentAndPlanned = (props: Props) => {
  const timePlanned = formatTime(props.secondsPlanned);
  const timeSpent = formatTime(props.secondsSpent);

  return (
    <>
      {props.secondsPlanned > 0 && (
        <div className="flex w-fit min-w-fit items-center gap-0.5 rounded-md border border-gray-500 px-1 py-0.5 text-xs text-gray-400">
          <div className="flex min-w-fit">
            {props.secondsSpent > 0 ? timeSpent : "--:--"}
          </div>
          <span className="">/</span>
          {props.secondsPlanned > 0 && (
            <div className="flex min-w-fit">
              {props.secondsPlanned > 0 ? timePlanned : "--:--"}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SpentAndPlanned;
