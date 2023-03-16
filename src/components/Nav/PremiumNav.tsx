import { useRouter } from 'next/router';
import DarkMode from '../DarkMode/DarkMode';
import { useSelector, useDispatch } from 'react-redux';
import { selectSidebarState, toggleSidebar } from 'store/slices/layoutSlice';
import Image from 'next/image';
import { selectProjectSelected } from 'store/slices/trackerSlice';
import ProfileDropDown from '../Layout/DropDown/ProfileDropDown/ProfileDropDown';
import { selectTodoSelected } from 'store/slices/todosSlice';

const PremiumNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const sidebarState = useSelector(selectSidebarState);
  const projectSelected = useSelector(selectProjectSelected);
  const todoSelected = useSelector(selectTodoSelected);
  const selected = router.pathname.includes('tasks')
    ? `Task List: ${todoSelected?.list_name}`
    : `Tracker: ${projectSelected?.project_name}`;

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav>
      <span className='toggle-sidebar' onClick={handleToggleSidebar}>
        {sidebarState ? (
          <Image
            src={'/icons/close.png'}
            alt='close-icon'
            width={20}
            height={20}
            style={{ pointerEvents: 'none' }}
          />
        ) : (
          <Image
            src={'/icons/open.png'}
            alt='open-icon'
            width={20}
            height={20}
            style={{ pointerEvents: 'none' }}
          />
        )}
      </span>
      <span className='project-selected'>{selected}</span>
      <div className='user-dark'>
        <ProfileDropDown />
        <DarkMode />
      </div>
      <style jsx>{`
        nav {
          align-items: center;
          display: flex;
          gap: 1rem;
          height: var(--premium-nav-height);
          padding: 0;
          position: fixed;
          top: 0;
          width: 100%;
          padding: 0 1rem;
          z-index: 10;
          border-bottom: 1px solid var(--box-shadow-light);
          background: var(--cool);
          backdrop-filter: blur(12px);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .pages {
          display: flex;
          gap: 1rem;
        }
        span {
          border-radius: 999px;
          padding: 0.3rem 0;
          border: 1px solid transparent;
          display: flex;
          cursor: pointer;
        }
        span.selected {
          color: var(--text-color);
          font-weight: bold;
        }
        div {
          display: flex;
        }
        .user-dark {
          margin-left: auto;
          align-items: center;
          gap: 0.5rem;
        }
        .project-selected {
          font-weight: bold;
        }
      `}</style>
    </nav>
  );
};

export default PremiumNav;
