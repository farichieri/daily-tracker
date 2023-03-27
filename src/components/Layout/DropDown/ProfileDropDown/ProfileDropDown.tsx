import { auth } from "@/utils/firebase.config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import DropDown from "../DropDown";
import DarkMode from "@/components/DarkMode/DarkMode";

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

  const handleOpenProfile = () => {
    setIsSettingsOpen(true);
    setCloseDrop(true);
  };

  return (
    <DropDown
      closeDrop={closeDrop}
      setCloseDrop={setCloseDrop}
      btnText={<Avatar size={24} changeable={false} />}
    >
      <div className="flex border-b py-1 px-2" onClick={handleOpenProfile}>
        <button>Profile</button>
      </div>
      <div className="flex w-full gap-2 border-b px-2 py-1">
        <span>Theme</span>
        <DarkMode />
      </div>
      <div className="flex py-1 px-2">
        <button onClick={handleLogout}>Logout </button>
      </div>
      <style jsx>{`
        button {
          background: transparent;
          width: 100%;
          display: flex;
          align-items: center;
          cursor: pointer;
          border: none;
          color: var(--text-color);
          font-weight: 500;
        }
        button:hover {
          background: var(--box-shadow-light);
        }
      `}</style>
    </DropDown>
  );
};

export default ProfileDropDown;
