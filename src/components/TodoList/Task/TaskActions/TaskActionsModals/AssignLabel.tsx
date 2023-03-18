import Modal from '@/components/Modal/Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLabels } from 'store/slices/labelsSlice';
import { useRouter } from 'next/router';
import { selectTodo, setUpdateTask } from 'store/slices/todosSlice';
import IconButton from '@/components/Layout/Icon/IconButton';
import { selectUser } from 'store/slices/authSlice';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';

const AssignLabel = ({
  closeModalOnClick,
}: {
  closeModalOnClick: Function;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { taskID } = router.query;
  const { labels } = useSelector(selectLabels);
  const { tasks } = useSelector(selectTodo);
  const { user } = useSelector(selectUser);
  const task = { ...tasks[String(taskID)] };
  const [labelsState, setLabelsState] = useState(labels);
  const [labelsSelected, setLabelsSelected] = useState<string[]>(task.labels);

  const handleToggleLabel = (event: React.MouseEvent) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    const labelExists = labelsSelected.indexOf(id) !== -1;
    const newLabelsSelected = [...labelsSelected];
    labelExists
      ? newLabelsSelected.splice(labelsSelected.indexOf(id), 1)
      : newLabelsSelected.push(id);
    setLabelsSelected(newLabelsSelected);
  };

  const handleSave = async () => {
    if (!user) return;
    console.log('Saving Labels in taskID');
    task.labels = labelsSelected;
    const docRef = doc(db, 'users', user.uid, 'tasks', String(taskID));
    await setDoc(docRef, task);
    dispatch(setUpdateTask(task));
    closeModalOnClick();
  };

  return (
    <Modal onCloseRedirect='' closeModalOnClick={closeModalOnClick}>
      <div className='assign-labels-container'>
        <div className='title'>Asign Label</div>
        <div className='labels-container'>
          {Object.keys(labelsState).map((label) => (
            <span
              key={label}
              id={label}
              className='label'
              style={{ background: `${labelsState[label].label_color}` }}
              onClick={handleToggleLabel}
            >
              <span>{labelsState[label].label_name}</span>
              <span>
                <IconButton
                  onClick={handleToggleLabel}
                  props={{ id: label }}
                  src={
                    labelsSelected.includes(label)
                      ? '/icons/checkbox-done.png'
                      : '/icons/checkbox.png'
                  }
                  alt={
                    labelsSelected.includes(label)
                      ? 'Done-Icon'
                      : 'Checkbox-Icon'
                  }
                  width={24}
                  height={24}
                />
              </span>
            </span>
          ))}
        </div>
        <div className='action-buttons'>
          <button onClick={() => closeModalOnClick()}>Cancel</button>
          <button onClick={handleSave}>Accept</button>
        </div>
      </div>
      <style jsx>{`
        .assign-labels-container {
          width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          gap: 0.5rem;
        }
        .labels-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        button {
          cursor: pointer;
        }
        .label {
          width: 100%;
          padding: 0.5rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }
      `}</style>
    </Modal>
  );
};
export default AssignLabel;
