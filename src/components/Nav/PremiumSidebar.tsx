import { selectLists, setListEdit } from "store/slices/listsSlice";
import { selectToday } from "store/slices/trackerSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Avatar from "../Avatar/Avatar";
import Image from "next/image";
import Link from "next/link";
import ListCreate from "../ListCreate/ListCreate";
import ListEdit from "../ListEdit/ListEdit";
import ProjectCreate from "../ProjectCreate/ProjectCreate";
import ProjectEdit from "../ProjectEdit/ProjectEdit";

const PremiumSidebar = ({ sidebarState }: { sidebarState: boolean }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;
  const { listID } = router.query;
  const lists = useSelector(selectLists);
  const today = useSelector(selectToday);

  const handleEditList = (event: any) => {
    event.preventDefault();
    const listID = (event.target as HTMLButtonElement).id;
    dispatch(setListEdit(listID));
    setEditList(true);
  };

  const [createProject, setCreateProject] = useState(false);
  const [editList, setEditList] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [listCreate, setListCreate] = useState(false);
  const closeModalOnClick = () => {
    setCreateProject(false);
    setEditList(false);
    setEditProject(false);
    setListCreate(false);
  };

  return (
    <>
      {createProject && <ProjectCreate closeModalOnClick={closeModalOnClick} />}
      {editList && <ListEdit closeModalOnClick={closeModalOnClick} />}
      {editProject && <ProjectEdit closeModalOnClick={closeModalOnClick} />}
      {listCreate && <ListCreate closeModalOnClick={closeModalOnClick} />}
      <div
        className={`duratin-300 fixed left-0 z-30 flex h-full w-[10rem] flex-col items-center gap-2 rounded-r-3xl bg-[var(--cool)] py-4 pl-3 pr-3 pt-[var(--premium-nav-height)] shadow-md shadow-gray-300/20 backdrop-blur-sm transition-all ease-linear ${
          !sidebarState && "left-[-200px]"
        }`}
      >
        <div className="w-full pt-2" onClick={(e) => e.stopPropagation()}>
          <div className="my-1 flex">
            <Link href={`/app/tracker/${today}`} style={{ width: "100%" }}>
              <span
                className={`${
                  pathname.includes("/app/tracker")
                    ? "text-[var(--text-color)] opacity-100"
                    : ""
                }`}
              >
                Planner
              </span>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <div className="my-1 flex">
            <Link href={"/app/labels"}>
              <span
                className={`labels ${
                  pathname === "/app/labels"
                    ? "text-[var(--text-color)] opacity-100"
                    : ""
                }`}
              >
                Labels
              </span>
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center justify-between">
            <span>Lists</span>
            <span
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md"
              onClick={() => setListCreate(true)}
            >
              +
            </span>
          </div>
          {Object.keys(lists).map(
            (list) =>
              !lists[list].is_archived && (
                <div key={list} className="flex w-full items-center">
                  <Link href={`/app/lists/${list}`} style={{ width: "100%" }}>
                    <span
                      className={`flex w-full cursor-pointer pl-2 opacity-50 ${
                        list === listID
                          ? "text-[var(--text-color)] opacity-100"
                          : ""
                      }`}
                    >
                      {lists[list].list_name}
                    </span>
                  </Link>
                  <span
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md"
                    id={list}
                    onClick={handleEditList}
                  >
                    <Image
                      alt="edit-icon"
                      src={"/icons/edit.png"}
                      width={14}
                      height={14}
                      style={{ pointerEvents: "none" }}
                    />
                  </span>
                </div>
              )
          )}
        </div>
        <div className="w-full">
          <div className="my-1 flex">
            <Link href={"/app/goals"}>
              <span
                className={`goals ${
                  pathname === "/app/goals" ? "selected" : ""
                }`}
              >
                Goals
              </span>
            </Link>
          </div>
        </div>
        {/* <div className="w-full">
          <div className="my-1 flex">
            <Link href={"/app/test"}>
              <span
                className={`goals ${
                  pathname === "/app/goals" ? "selected" : ""
                }`}
              >
                Test
              </span>
            </Link>
          </div>
        </div> */}
        <button className="mt-auto flex items-center gap-1 rounded-3xl border border-stone-500 bg-stone-900 py-1 px-2 text-sm text-white shadow shadow-stone-600 duration-300 hover:bg-stone-800 active:scale-105">
          <Image
            alt="edit-icon"
            src={"/icons/star.png"}
            width={18}
            height={18}
            style={{ pointerEvents: "none" }}
          />
          <span>Get Premium</span>
        </button>
        <div>
          <Avatar size={65} changeable={false} />
        </div>
      </div>
    </>
  );
};

export default PremiumSidebar;
