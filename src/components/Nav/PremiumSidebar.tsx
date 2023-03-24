import { selectLists, setListEdit } from 'store/slices/listsSlice';
import { selectSidebarState } from 'store/slices/layoutSlice';
import { selectToday } from 'store/slices/trackerSlice';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import ButtonAction from '../Layout/ButtonAction/ButtonAction';
import Image from 'next/image';
import Link from 'next/link';
import ListCreate from '../ListCreate/ListCreate';
import ListEdit from '../ListEdit/ListEdit';
import ProjectCreate from '../ProjectCreate/ProjectCreate';
import ProjectEdit from '../ProjectEdit/ProjectEdit';

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
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className='tracks' onClick={(e) => e.stopPropagation()}>
          <div className='title'>
            <Link href={`/app/tracker/${today}`} style={{ width: '100%' }}>
              <span
                className={`tracker ${
                  pathname.includes('/app/tracker') ? 'selected' : ''
                }`}
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
                  <Link href={`/app/lists/${list}`} style={{ width: '100%' }}>
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
        .track,
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
          width: 100%;
        }
        .title span {
          display: flex;
          width: 100%;
        }
        .tracks,
        .labels,
        .projects {
          width: 100%;
        }

        .selected {
          opacity: 1;
          color: var(--text-color);
        }
        .tracker {
          margin-top: 1rem;
          width: 100%;
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
