import { selectList } from "store/slices/listsSlice";
import { selectSidebarState, toggleSidebar } from "store/slices/layoutSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DarkMode from "../DarkMode/DarkMode";
import Image from "next/image";
import ProfileDropDown from "../Layout/DropDown/ProfileDropDown/ProfileDropDown";
import Settings from "../Settings/Settings";

const PremiumNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { listID } = router.query;
  const sidebarState = useSelector(selectSidebarState);
  const { lists } = useSelector(selectList);
  const listSelected = lists[String(listID)];
  const selected = router.pathname.includes("lists")
    ? `Tasks List: ${listSelected?.list_name}`
    : router.pathname.includes("labels")
    ? "Labels"
    : router.pathname.includes("goals")
    ? "Goals"
    : "Tracker";

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const closeModalOnClick = () => {
    setIsSettingsOpen(false);
  };

  return (
    <nav className="fixed z-40 flex h-[var(--premium-nav-height)] w-full select-none items-center gap-2 bg-[var(--cool)] px-4  ">
      {isSettingsOpen && <Settings closeModalOnClick={closeModalOnClick} />}
      <span className="cursor-pointer" onClick={handleToggleSidebar}>
        {sidebarState ? (
          <Image
            src={"/icons/close.png"}
            alt="close-icon"
            width={20}
            height={20}
            style={{ pointerEvents: "none" }}
          />
        ) : (
          <Image
            src={"/icons/open.png"}
            alt="open-icon"
            width={20}
            height={20}
            style={{ pointerEvents: "none" }}
          />
        )}
      </span>
      <span className="font-bold">{selected}</span>
      <div className="ml-auto flex items-center gap-2">
        <ProfileDropDown setIsSettingsOpen={setIsSettingsOpen} />
        <DarkMode />
      </div>
    </nav>
  );
};

export default PremiumNav;
