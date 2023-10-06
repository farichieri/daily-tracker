import { auth } from "@/utils/firebase.config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import DropDown from "../DropDown";

const ProfileDropDown = () => {
  const router = useRouter();
  const [closeDrop, setCloseDrop] = useState(false);

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    router.push("/");
    await signOut(auth).catch((error) => {
      console.error(error);
    });
  };

  return (
    <DropDown
      closeDrop={closeDrop}
      setCloseDrop={setCloseDrop}
      btnText={<Avatar size={30} changeable={false} />}
    >
      <div className="py-2">
        <button
          className={`flex w-full cursor-pointer items-center border-none bg-transparent py-1 px-2 text-[var(--text-color)] hover:bg-[var(--box-shadow-light)]`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </DropDown>
  );
};

export default ProfileDropDown;
