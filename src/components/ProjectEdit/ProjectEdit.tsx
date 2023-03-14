import { Project } from '@/global/types';
import { getProjects } from '@/hooks/firebase';
import { db } from '@/utils/firebase.config';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { closeModal } from 'store/slices/layoutSlice';
import { setProjects, selectProjectEdit } from 'store/slices/trackerSlice';
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
          <div className='name'>
            <span>Name:</span>
            <input
              type='text'
              name='projectName'
              value={projectInput.projectName}
              onChange={handleChange}
            />
          </div>
          <div className='default'>
            <button name='isDefault' onClick={handleClick}>
              {projectInput.isDefault ? 'Default' : 'Make Default'}
            </button>
          </div>
          <div className='favorite'>
            <button name='isFavorite' onClick={handleClick}>
              {projectInput.isFavorite ? 'Favorite' : 'Make Favorite'}
            </button>
          </div>
          <div className='archivated'>
            <button name='isArchivated' onClick={handleClick}>
              {projectInput.isArchivated ? 'Desarchivate' : 'Archivate'}
            </button>
          </div>
          <div className='buttons'>
            <button onClick={handleCloseModal}>Cancel</button>
            <button onClick={handleEditProject}>Accept</button>
          </div>
        </div>
        <style jsx>
          {`
            .container {
              background: var(--box-shadow);
              border-radius: 6px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 10px 1px var(--box-shadow-light);
              overflow: auto;
            }
            .title {
              padding: 0.5rem 1rem;
            }
            .form {
              display: flex;
              flex-direction: column;
            }
            .name {
              display: flex;
              gap: 0.5rem;
              align-items: center;
            }
            input {
              background: none;
              color: var(--text-color);
              border: 1px solid var(--box-shadow-light);
              outline: none;
              padding: 0.25rem 0.3rem 0.25rem 0.5rem;
            }
            .buttons {
              display: flex;
            }
            button {
              width: 100%;
              cursor: pointer;
            }
            button:active {
              box-shadow: 0 0 10px 1px var(--box-shadow);
            }
          `}
        </style>
      </div>
    </Modal>
  );
};

export default ProjectEdit;
