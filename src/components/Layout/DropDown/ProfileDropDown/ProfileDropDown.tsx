import { auth } from "@/utils/firebase.config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import DarkMode from "@/components/DarkMode/DarkMode";
import DropDown from "../DropDown";

const ProfileDropDown = ({
  setIsSettingsOpen,
}: {
  setIsSettingsOpen: Function;
}) => {
  const router = useRouter();
  const [closeDrop, setCloseDrop] = useState(false);

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/");
    await signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOpenProfile = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSettingsOpen(true);
    setCloseDrop(true);
  };

  return (
    <DropDown
      closeDrop={closeDrop}
      setCloseDrop={setCloseDrop}
      btnText={<Avatar size={30} changeable={false} />}
    >
      <div className="flex border-b" onClick={handleOpenProfile}>
        <button
          className={`flex w-full cursor-pointer items-center border-none bg-transparent py-1 px-2 text-[var(--text-color)] hover:bg-[var(--box-shadow-light)]`}
        >
          Profile
        </button>
      </div>
      <div className="flex w-full gap-2 border-b px-2 py-1">
        <span>Theme</span>
        <DarkMode />
      </div>
      <div className="flex">
        <button
          className={`flex w-full cursor-pointer items-center border-none bg-transparent py-1 px-2 text-[var(--text-color)] hover:bg-[var(--box-shadow-light)]`}
          onClick={handleLogout}
        >
          Logout{" "}
        </button>
      </div>
    </DropDown>
  );
};

export default ProfileDropDown;
