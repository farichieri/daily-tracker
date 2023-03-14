import { Project } from '@/global/types';
import { getProjects } from '@/hooks/firebase';
import { db } from '@/utils/firebase.config';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { closeModal } from 'store/slices/layoutSlice';
import { setProjects, selectProjectEdit } from 'store/slices/trackerSlice';
import Button from '../Layout/Button/Button';
import IconButton from '../Layout/Icon/IconButton';
import Modal from '../Modal/Modal';

const ProjectEdit = () => {
  const dispatch = useDispatch();
  const projectEdit = useSelector(selectProjectEdit);
  console.log({ projectEdit });
  const [projectInput, setProjectInput] = useState<Project>({
    id: projectEdit.id,
    projectName: projectEdit.projectName,
    isDefault: projectEdit.isDefault,
    isFavorite: projectEdit.isFavorite,
    isArchivated: projectEdit.isArchivated,
  });
  const { user } = useSelector(selectUser);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

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
    console.log({ newInput });
    setProjectInput({
      ...newInput,
      [name]: bool,
    });
  };

  const handleEditProject = async () => {
    console.log({ projectInput });
    if (user) {
      dispatch(closeModal());
      if (projectEdit.isDefault === false && projectInput.isDefault === true) {
        const docRef = collection(db, 'users', user.uid, 'projects');
        const querySnapshot = await getDocs(docRef);
        const removeDefaults = async () => {
          querySnapshot.forEach((docToUpdate) => {
            updateDoc(doc(db, 'users', user.uid, 'projects', docToUpdate.id), {
              isDefault: false,
            });
          });
        };
        await removeDefaults();
      }
      const docRef = doc(db, 'users', user.uid, 'projects', projectEdit.id);
      await updateDoc(docRef, {
        projectName: projectInput.projectName,
        isDefault: projectInput.isDefault,
        isFavorite: projectInput.isFavorite,
        isArchivated: projectInput.isArchivated,
      });
      const projects = await getProjects(user);
      dispatch(setProjects(projects));
    }
  };

  return (
    <Modal>
      <div className='container'>
        <div className='title'>Edit Project</div>
        <div className='form'>
          <div className='content'>
            <div className='name'>
              <span>Name:</span>
              <input
                type='text'
                name='projectName'
                value={projectInput.projectName}
                onChange={handleChange}
              />
            </div>
            <div className='option'>
              <span>{projectInput.isDefault ? 'Default' : 'Make Default'}</span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'isDefault' }}
                  src={
                    projectInput.isDefault
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={projectInput.isDefault ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className='option'>
              <span>
                {projectInput.isFavorite ? 'Favorite' : 'Make Favorite'}
              </span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'isFavorite' }}
                  src={
                    projectInput.isFavorite
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={projectInput.isFavorite ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className='option'>
              <span>
                {projectInput.isArchivated ? 'Desarchivate' : 'Archivate'}
              </span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'isArchivated' }}
                  src={
                    projectInput.isArchivated
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={projectInput.isArchivated ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
          </div>
          <div className='buttons'>
            <Button
              onClick={handleCloseModal}
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
