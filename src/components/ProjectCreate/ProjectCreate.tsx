import { Project } from '@/global/types';
import { getProjects } from '@/hooks/firebase';
import { db } from '@/utils/firebase.config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { closeModal } from 'store/slices/layoutSlice';
import { setProjects, setProjectSelected } from 'store/slices/trackerSlice';
import Button from '../Layout/Button/Button';
import Modal from '../Modal/Modal';

const ProjectCreate = () => {
  const dispatch = useDispatch();
  const [projectInput, setProjectInput] = useState<Project>({
    is_archived: false,
    is_default: false,
    is_favorite: false,
    is_private: false,
    labels: [],
    project_id: '',
    project_name: '',
    members: [],
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

  const handleAddTracker = async () => {
    if (user) {
      dispatch(closeModal());
      const docRef = collection(db, 'users', user.uid, 'projects');
      await addDoc(docRef, {
        is_archived: false,
        is_default: false,
        is_favorite: false,
        is_private: false,
        labels: [],
        project_id: '',
        project_name: projectInput.project_name,
        members: [],
      });
      const projects = await getProjects(user);
      dispatch(setProjects(projects));
      const newProjectSelected = projects.find(
        (p) => p.project_name === projectInput.project_name
      ) || {
        is_archived: false,
        is_default: false,
        is_favorite: false,
        is_private: false,
        labels: [],
        project_id: '',
        project_name: '',
        members: [],
      };
      dispatch(setProjectSelected(newProjectSelected));
    }
  };

  return (
    <Modal onCloseRedirect=''>
      <div className='container'>
        <div className='title'>New Tracker</div>
        <div className='form'>
          <input
            type='text'
            placeholder=''
            name='project_name'
            value={projectInput.project_name}
            onChange={handleChange}
          />
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
              onClick={handleAddTracker}
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
            input {
              background: none;
              color: var(--text-color);
              border: 1px solid var(--box-shadow-light);
              outline: none;
              padding: 0.25rem 0.3rem 0.25rem 0.5rem;
              margin-bottom: 0.5rem;
              border-radius: 6px;
            }
            .buttons {
              display: flex;
              gap: 0.5rem;
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

export default ProjectCreate;
