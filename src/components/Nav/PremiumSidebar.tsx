import {
  selectSidebarState,
  toggleIsCreatingProject,
  toggleIsCreatingTodo,
  toggleIsEditingProject,
  toggleIsEditingTodo,
} from 'store/slices/layoutSlice';
import { selectProjects, setProjectEdit } from 'store/slices/trackerSlice';
import { useSelector, useDispatch } from 'react-redux';
import ButtonAction from '../Layout/ButtonAction/ButtonAction';
import Image from 'next/image';
import Avatar from '../Avatar/Avatar';
import { selectTodos, setTodoEdit } from 'store/slices/todosSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Project, Todo } from '@/global/types';

const PremiumSidebar = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarState);
  const projects = useSelector(selectProjects);
  const todos = useSelector(selectTodos);
  const router = useRouter();
  const { listID } = router.query;
  const { id } = router.query;

  const handleIsCreatingProject = () => {
    dispatch(toggleIsCreatingProject());
  };
  const handleIsCreatingTodo = () => {
    dispatch(toggleIsCreatingTodo());
  };

  const handleEditProject = (event: any) => {
    event.preventDefault();
    const projectID = (event.target as HTMLButtonElement).id;
    dispatch(toggleIsEditingProject());
    dispatch(setProjectEdit(projectID));
  };

  const handleEditTodo = (event: any) => {
    event.preventDefault();
    const todoID = (event.target as HTMLButtonElement).id;
    dispatch(toggleIsEditingTodo());
    dispatch(setTodoEdit(todoID));
  };

  const filterTodos = (data: Todo[]) => {
    return data.filter((d) => !d.isArchivated);
  };
  const filterProjects = (data: Project[]) => {
    return data.filter((d) => !d.isArchivated);
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className='tracks' onClick={(e) => e.stopPropagation()}>
        <div className='title'>
          <span>My Trackers</span>
          <ButtonAction text={'+'} onClick={handleIsCreatingProject} />
        </div>
        {filterProjects(projects).map((project) => (
          <div key={project.id} className='project-container'>
            <Link href={`/app/tracker/${project.id}`}>
              <span
                className={`project ${project.id === id ? 'selected' : ''}`}
              >
                {project.projectName}
              </span>
            </Link>
            <span className='edit' id={project.id} onClick={handleEditProject}>
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
      </div>
      <div className='to-do'>
        <div className='title'>
          <span>Tasks Lists</span>
          <ButtonAction text={'+'} onClick={handleIsCreatingTodo} />
        </div>
        {filterTodos(todos).map((todo) => (
          <div key={todo.id} className='project-container'>
            <Link href={`/app/tasks/${todo.id}`}>
              <span
                className={`project ${todo.id === listID ? 'selected' : ''}`}
              >
                {todo.todoName}
              </span>
            </Link>
            <span className='edit' id={todo.id} onClick={handleEditTodo}>
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
      </div>
      <div className='labels'>
        <div className='title'>
          <span>Labels</span>
        </div>
      </div>
      <div className='avatar'>
        <Avatar size={65} changeable={false} />
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
        }
        .project:hover {
          opacity: 1;
        }
        .sidebar.open {
          left: 0;
          transition: all 0.3s;
        }
        .tracks,
        .to-do,
        .labels {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: start;
          width: 100%;
          padding: 1rem 0;
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

        .edit {
          cursor: pointer;
        }
        .avatar {
          margin-top: auto;
        }
      `}</style>
    </div>
  );
};

export default PremiumSidebar;
