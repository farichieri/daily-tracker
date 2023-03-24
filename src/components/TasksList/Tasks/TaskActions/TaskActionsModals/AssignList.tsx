import Modal from '@/components/Modal/Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import IconButton from '@/components/Layout/Icon/IconButton';
import { selectUser } from 'store/slices/authSlice';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase.config';
import { setUpdateTask } from 'store/slices/tasksSlice';
import { ListGroup, Task } from '@/global/types';
import { selectLists } from 'store/slices/listsSlice';
import { filterListsNotArchived, filterObject } from '@/hooks/helpers';

const AssignList = ({
  closeModalOnClick,
  isNewTask,
  task,
  handleChangeList,
}: {
  closeModalOnClick: Function;
  isNewTask: boolean;
  task: Task;
  handleChangeList: Function;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { taskID } = router.query;
  const { user } = useSelector(selectUser);
  const lists = useSelector(selectLists);
  const listsNotArchived: ListGroup = filterListsNotArchived(lists);
  const [listSelected, setListSelected] = useState<string>(task.project_id);

  const handleToggleList = (event: React.MouseEvent) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    setListSelected(id);
  };

  const handleSave = async () => {
    if (isNewTask) {
      handleChangeList(listSelected);
      closeModalOnClick();
    } else {
      if (!user) return;
      console.log('Saving Lists in taskID');
      task.project_id = listSelected;
      const docRef = doc(db, 'users', user.uid, 'tasks', String(taskID));
      await setDoc(docRef, task);
      dispatch(setUpdateTask(task));
      closeModalOnClick();
    }
  };

  return (
    <Modal onCloseRedirect='' closeModalOnClick={closeModalOnClick}>
      <div className='assign-labels-container'>
        <div className='title'>Asign Label</div>
        <div className='labels-container'>
          {Object.keys(listsNotArchived).map((list: string) => (
            <span
              key={list}
              id={list}
              className='label'
              onClick={handleToggleList}
            >
              <span>{listsNotArchived[list].list_name}</span>
              <span>
                <IconButton
                  onClick={handleToggleList}
                  props={{ id: list }}
                  src={
                    listSelected.includes(list)
                      ? '/icons/checkbox-done.png'
                      : '/icons/checkbox.png'
                  }
                  alt={
                    listSelected.includes(list) ? 'Done-Icon' : 'Checkbox-Icon'
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
export default AssignList;
