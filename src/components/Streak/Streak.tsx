import Image from "next/image";
const Streak = () => {
  const lastDayCompleted: string = "";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs">Current Streak</span>
      <Image src="/icons/fire.png" width={14} height={14} alt="Streak Icon" />
    </div>
  );
};

export default Streak;
