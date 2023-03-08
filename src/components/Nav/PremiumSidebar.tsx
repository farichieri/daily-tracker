import {
  selectSidebarState,
  toggleIsCreatingProject,
} from 'store/slices/layoutSlice';
import {
  selectProjects,
  selectProjectSelected,
  setProjectSelected,
} from 'store/slices/trackerSlice';
import { useSelector, useDispatch } from 'react-redux';
import ButtonAction from '../Layout/ButtonAction/ButtonAction';

const PremiumSidebar = () => {
  const dispatch = useDispatch();
  const sidebarState = useSelector(selectSidebarState);
  const projects = useSelector(selectProjects);
  const projectSelected = useSelector(selectProjectSelected);

  const handleIsCreatingProject = () => {
    dispatch(toggleIsCreatingProject());
  };

  const handleSelectProject = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const project = (event.target as HTMLButtonElement).id;
    dispatch(setProjectSelected(project));
  };

  return (
    <div className={`sidebar ${sidebarState ? 'open' : ''}`}>
      <div className='tracks'>
        <div className='title'>
          My Tracks:
          <ButtonAction text={'+'} onClick={handleIsCreatingProject} />
        </div>
        {projects.map((project, i) => (
          <span
            id={project}
            className={`project ${
              project === projectSelected ? 'selected' : ''
            }`}
            key={i}
            onClick={handleSelectProject}
          >
            {project}
          </span>
        ))}
      </div>
      <style jsx>{`
        .sidebar {
          -moz-user-select: none;
          -ms-user-select: none;
          -webkit-user-select: none;
          background: var(--gray-color);
          border-right: 1px solid var(--box-shadow-light);
          display: flex;
          height: 100%;
          justify-content: center;
          left: -200px;
          height: calc(100vh - var(--premium-nav-height));
          padding: 1rem 0.5rem;
          position: absolute;
          transition: all 0.3s;
          user-select: none;
          width: 200px;
          z-index: 8;
        }
        .project {
          cursor: pointer;
          opacity: 0.5;
          transition: 0.3s;
        }
        .project:hover {
          opacity: 1;
        }
        .sidebar.open {
          left: 0;
          transition: all 0.3s;
        }
        .tracks {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: start;
        }
        .title {
          display: flex;
          gap: 0.5em;
          align-items: center;
        }
        .selected {
          font-weight: bold;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default PremiumSidebar;
