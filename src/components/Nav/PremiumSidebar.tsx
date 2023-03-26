import { selectLists, setListEdit } from "store/slices/listsSlice";
import { selectSidebarState } from "store/slices/layoutSlice";
import { selectToday } from "store/slices/trackerSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Avatar from "../Avatar/Avatar";
import ButtonAction from "../Layout/ButtonAction/ButtonAction";
import Image from "next/image";
import Link from "next/link";
import ListCreate from "../ListCreate/ListCreate";
import ListEdit from "../ListEdit/ListEdit";
import ProjectCreate from "../ProjectCreate/ProjectCreate";
import ProjectEdit from "../ProjectEdit/ProjectEdit";

const PremiumSidebar = () => {
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);
  const router = useRouter();
  const sidebarOpen = useSelector(selectSidebarState);
  const today = useSelector(selectToday);
  const { listID } = router.query;
  const { pathname } = router;

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
        className={`duratin-300 fixed left-0 z-20 flex h-full w-[11.5rem] flex-col items-center gap-2 bg-[var(--cool)] p-4 pt-[var(--premium-nav-height)] backdrop-blur-sm transition-all ease-linear ${
          !sidebarOpen && "left-[-200px]"
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
                My Tracker
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
            <span>Tasks Lists</span>
            <ButtonAction text={"+"} onClick={() => setListCreate(true)} />
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
                    className="cursor-pointer"
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
        <div className="w-full">
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
        </div>
        <div className="mt-auto">
          <Avatar size={65} changeable={false} />
        </div>
      </div>
    </>
  );
};

export default PremiumSidebar;
