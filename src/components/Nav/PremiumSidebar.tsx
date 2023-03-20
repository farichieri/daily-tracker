import { selectSidebarState } from 'store/slices/layoutSlice';
import {
  selectProjects,
  selectToday,
  setProjectEdit,
} from 'store/slices/trackerSlice';
import { useSelector, useDispatch } from 'react-redux';
import ButtonAction from '../Layout/ButtonAction/ButtonAction';
import Image from 'next/image';
import Avatar from '../Avatar/Avatar';
import { selectLists, setListEdit } from 'store/slices/listsSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Project } from '@/global/types';
import { useState } from 'react';
import ProjectEdit from '../ProjectEdit/ProjectEdit';
import ProjectCreate from '../ProjectCreate/ProjectCreate';
import ListCreate from '../ListCreate/ListCreate';
import ListEdit from '../ListEdit/ListEdit';

const PremiumSidebar = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarState);
  const projects = useSelector(selectProjects);
  const lists = useSelector(selectLists);
  const router = useRouter();
  const { listID, id } = router.query;
  const { pathname } = router;
  const today = useSelector(selectToday);

  const handleEditProject = (event: any) => {
    event.preventDefault();
    const projectID = (event.target as HTMLButtonElement).id;
    dispatch(setProjectEdit(projectID));
    setEditProject(true);
  };

  const handleEditList = (event: any) => {
    event.preventDefault();
    const listID = (event.target as HTMLButtonElement).id;
    dispatch(setListEdit(listID));
    setEditList(true);
  };

  const filterProjects = (data: Project[]) => {
    return data.filter((d) => !d.is_archived);
  };

  const [createProject, setCreateProject] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [listCreate, setListCreate] = useState(false);
  const [editList, setEditList] = useState(false);
  const closeModalOnClick = () => {
    setEditProject(false);
    setCreateProject(false);
    setListCreate(false);
    setEditList(false);
  };

  return (
    <>
      {editProject && <ProjectEdit closeModalOnClick={closeModalOnClick} />}
      {createProject && <ProjectCreate closeModalOnClick={closeModalOnClick} />}
      {listCreate && <ListCreate closeModalOnClick={closeModalOnClick} />}
      {editList && <ListEdit closeModalOnClick={closeModalOnClick} />}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className='tracks' onClick={(e) => e.stopPropagation()}>
          <div className='title'>
            <Link href={`/app/tracker/${today}`}>
              <span
                className={`tracker ${pathname === '/app' ? 'selected' : ''}`}
              >
                My Tracker
              </span>
            </Link>
          </div>
        </div>
        <div className='labels'>
          <div className='title'>
            <Link href={'/app/labels'}>
              <span
                className={`labels ${
                  pathname === '/app/labels' ? 'selected' : ''
                }`}
              >
                Labels
              </span>
            </Link>
          </div>
        </div>
        <div className='to-do'>
          <div className='title'>
            <span>Tasks Lists</span>
            <ButtonAction text={'+'} onClick={() => setListCreate(true)} />
          </div>
          {Object.keys(lists).map(
            (list) =>
              !lists[list].is_archived && (
                <div key={list} className='project-container'>
                  <Link href={`/app/tasks/${list}`}>
                    <span
                      className={`project ${list === listID ? 'selected' : ''}`}
                    >
                      {lists[list].list_name}
                    </span>
                  </Link>
                  <span className='edit' id={list} onClick={handleEditList}>
                    <Image
                      alt='edit-icon'
                      src={'/icons/edit.png'}
                      width={14}
                      height={14}
                      style={{ pointerEvents: 'none' }}
                    />
                  </span>
                </div>
              )
          )}
        </div>

        {/* <div className='projects'>
          <div className='title'>
            <span>My Projects</span>
            <ButtonAction text={'+'} onClick={() => setCreateProject(true)} />
          </div>
          {filterProjects(projects).map((project) => (
            <div key={project.project_id} className='project-container'>
              <Link href={`/app/tracker/${project.project_id}`}>
                <span
                  className={`project ${
                    project.project_id === id ? 'selected' : ''
                  }`}
                >
                  {project.project_name}
                </span>
              </Link>
              <span
                className='edit'
                id={project.project_id}
                onClick={handleEditProject}
              >
                <Image
                  alt='edit-icon'
                  src={'/icons/edit.png'}
                  width={14}
                  height={14}
                  style={{ pointerEvents: 'none' }}
                />
              </span>
            </div>
          ))}
        </div> */}
        <div className='avatar'>
          <Avatar size={65} changeable={false} />
        </div>
      </div>
      <style jsx>{`
        .sidebar {
          -moz-user-select: none;
          -ms-user-select: none;
          -webkit-user-select: none;
          background: var(--gray-color);
          border-right: 1px solid var(--box-shadow-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          left: -200px;
          padding: 1rem 1rem;
          position: fixed;
          transition: all 0.3s;
          user-select: none;
          width: 200px;
          z-index: 8;
          background: var(--cool);
          backdrop-filter: blur(12px);
          padding-top: var(--premium-nav-height);
          overflow: auto;
          height: 100%;
          gap: 1.5rem;
        }
        .project-container {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }
        .project {
          cursor: pointer;
          opacity: 0.5;
          transition: 0.3s;
          width: 100%;
          display: flex;
          padding-left: 0.5rem;
        }
        .project:hover {
          opacity: 1;
        }
        .sidebar.open {
          left: 0;
          transition: all 0.3s;
        }
        .projects,
        .tracks,
        .to-do,
        .labels {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: start;
          width: 100%;
        }
        .title {
          display: flex;
          gap: 0.5em;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .title span {
          display: flex;
        }
        .selected {
          opacity: 1;
          color: var(--text-color);
        }
        .tracker {
          padding-top: 1rem;
        }

        .edit {
          cursor: pointer;
        }
        .avatar {
          margin-top: auto;
        }
      `}</style>
    </>
  );
};

export default PremiumSidebar;
