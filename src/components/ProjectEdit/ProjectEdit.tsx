import { Project } from '@/global/types';
import { getProjects } from '@/hooks/firebase';
import { db } from '@/utils/firebase.config';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { setProjects, selectProjectEdit } from 'store/slices/trackerSlice';
import Button from '../Layout/Button/Button';
import IconButton from '../Layout/Icon/IconButton';
import Modal from '../Modal/Modal';

const ProjectEdit = ({
  closeModalOnClick,
}: {
  closeModalOnClick: Function;
}) => {
  const dispatch = useDispatch();
  const projectEdit = useSelector(selectProjectEdit);
  const [projectInput, setProjectInput] = useState<Project>({
    is_archived: projectEdit.is_archived,
    is_default: projectEdit.is_default,
    is_favorite: projectEdit.is_favorite,
    is_private: projectEdit.is_private,
    labels: projectEdit.labels,
    project_id: projectEdit.project_id,
    project_name: projectEdit.project_name,
    members: projectEdit.members,
  });
  const { user } = useSelector(selectUser);

  const handleChange = (e: any) => {
    setProjectInput({
      ...projectInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const name: string = (e.target as HTMLButtonElement).name;
    const newInput: any = { ...projectInput };
    const bool: boolean = !newInput[name];
    setProjectInput({
      ...newInput,
      [name]: bool,
    });
  };

  const handleEditProject = async () => {
    try {
      if (user) {
        if (
          projectEdit.is_default === false &&
          projectInput.is_default === true
        ) {
          const docRef = collection(db, 'users', user.uid, 'projects');
          const querySnapshot = await getDocs(docRef);
          const removeDefaults = async () => {
            querySnapshot.forEach((docToUpdate) => {
              updateDoc(
                doc(db, 'users', user.uid, 'projects', docToUpdate.id),
                {
                  is_default: false,
                }
              );
            });
          };
          await removeDefaults();
        }
        const docRef = doc(
          db,
          'users',
          user.uid,
          'projects',
          projectInput.project_id
        );
        await updateDoc(docRef, {
          is_archived: projectInput.is_archived,
          is_default: projectInput.is_default,
          is_favorite: projectInput.is_favorite,
          is_private: projectInput.is_private,
          labels: projectInput.labels,
          project_id: projectInput.project_id,
          project_name: projectInput.project_name,
          members: projectInput.members,
        });
        const projects = await getProjects(user);
        dispatch(setProjects(projects));
        closeModalOnClick();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Modal onCloseRedirect='' closeModalOnClick={closeModalOnClick}>
      <div className='container'>
        <div className='title'>Edit Project</div>
        <div className='form'>
          <div className='content'>
            <div className='name'>
              <span>Name:</span>
              <input
                type='text'
                name='project_name'
                value={projectInput.project_name}
                onChange={handleChange}
              />
            </div>
            <div className='option'>
              <span>
                {projectInput.is_default ? 'Default' : 'Make Default'}
              </span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'is_default' }}
                  src={
                    projectInput.is_default
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={projectInput.is_default ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className='option'>
              <span>
                {projectInput.is_favorite ? 'Favorite' : 'Make Favorite'}
              </span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'is_favorite' }}
                  src={
                    projectInput.is_favorite
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={projectInput.is_favorite ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className='option'>
              <span>
                {projectInput.is_archived ? 'Desarchivate' : 'Archivate'}
              </span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'is_archived' }}
                  src={
                    projectInput.is_archived
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={projectInput.is_archived ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
          </div>
          <div className='buttons'>
            <Button
              onClick={() => closeModalOnClick()}
              content='Cancel'
              isLoading={false}
              isDisabled={false}
              loadMessage={''}
              style={null}
            />
            <Button
              onClick={handleEditProject}
              content='Acept'
              isLoading={false}
              isDisabled={false}
              loadMessage={''}
              style={null}
            />
          </div>
        </div>
        <style jsx>
          {`
            .container {
              border-radius: 1rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 10px 1px var(--box-shadow-light);
              overflow: auto;
              padding: 1rem;
            }
            .title {
              padding: 0.5rem 1rem;
              font-weight: bold;
              font-size: 1.2rem;
            }
            .form {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }
            .name {
              display: flex;
              gap: 0.5rem;
              align-items: center;
              padding: 0 1rem;
              justify-content: space-between;
            }
            input {
              background: none;
              color: var(--text-color);
              outline: none;
              padding: 0.25rem 0.3rem 0.25rem 0.5rem;
              border: none;
              width: 50%;
              border-bottom: 1px solid var(--box-shadow-light);
            }
            .buttons {
              display: flex;
              gap: 0.5rem;
              justify-content: center;
            }
            .option {
              display: flex;
              justify-content: space-between;
              padding: 0 1rem;
            }
            .content {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              margin: 1rem 0;
            }
          `}
        </style>
      </div>
    </Modal>
  );
};

export default ProjectEdit;
