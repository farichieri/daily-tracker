import {
  selectSidebarState,
  toggleIsCreatingProject,
  toggleIsEditingProject,
} from 'store/slices/layoutSlice';
import {
  selectProjects,
  selectProjectSelected,
  setProjectEdit,
  setProjectSelected,
} from 'store/slices/trackerSlice';
import { useSelector, useDispatch } from 'react-redux';
import ButtonAction from '../Layout/ButtonAction/ButtonAction';
import Image from 'next/image';

const PremiumSidebar = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarState);
  const projects = useSelector(selectProjects);
  const projectSelected = useSelector(selectProjectSelected);

  const handleIsCreatingProject = () => {
    dispatch(toggleIsCreatingProject());
  };

  const handleIsEditingProject = (event: any) => {
    event.preventDefault();
    const projectID = (event.target as HTMLButtonElement).id;
    dispatch(toggleIsEditingProject());
    dispatch(setProjectEdit(projectID));
  };

  const handleSelectProject = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const projectID = (event.target as HTMLButtonElement).id;
    const newProjectSelected = projects.find((p) => p.id === projectID) || {
      id: '',
      projectName: '',
      isDefault: false,
      isFavorite: false,
    };
    dispatch(setProjectSelected(newProjectSelected));
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className='tracks' onClick={(e) => e.stopPropagation()}>
        <div className='title'>
          <span>My Tracks</span>
          <ButtonAction text={'+'} onClick={handleIsCreatingProject} />
        </div>
        {projects.map((project) => (
          <div key={project.id} className='project-container'>
            <span
              id={project.id}
              className={`project ${
                project.id === projectSelected.id ? 'selected' : ''
              }`}
              onClick={handleSelectProject}
            >
              {project.projectName}
            </span>
            <span
              className='edit'
              id={project.id}
              onClick={handleIsEditingProject}
            >
              <Image
                alt='edit-icon'
                src={'/icons/edit.png'}
                width={14}
                height={14}
              />
            </span>
          </div>
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
          left: -200px;
          height: calc(100vh - var(--premium-nav-height));
          padding: 1rem 1rem;
          position: fixed;
          transition: all 0.3s;
          user-select: none;
          width: 200px;
          z-index: 8;
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
        }
        .edit {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PremiumSidebar;
