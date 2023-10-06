import { selectList } from "store/slices/listsSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import ProfileDropDown from "../Layout/DropDown/ProfileDropDown/ProfileDropDown";

const PremiumNav = ({
  sidebarState,
  handleToggleSidebar,
}: {
  sidebarState: boolean;
  handleToggleSidebar: React.MouseEventHandler;
}) => {
  const router = useRouter();
  const { listID } = router.query;
  const { lists } = useSelector(selectList);
  const listSelected = lists[String(listID)];
  const selected = router.pathname.includes("lists")
    ? `List: ${listSelected?.list_name}`
    : router.pathname.includes("labels")
    ? "Labels"
    : router.pathname.includes("goals")
    ? "Goals"
    : "Planner";

  return (
    <nav className="absolute top-0 left-1 z-50 flex h-[var(--premium-nav-height)] select-none items-center gap-2 bg-none px-1 sm:px-4 ">
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
      <div className="fixed top-0 right-2 flex h-[var(--premium-nav-height)] items-center px-1 sm:px-4">
        <ProfileDropDown />
      </div>
    </nav>
  );
};

export default PremiumNav;
