import Modal from '@/components/Modal/Modal';
import { Label } from '@/global/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLabels } from 'store/slices/labelsSlice';
import { useRouter } from 'next/router';
import { selectTodo } from 'store/slices/todosSlice';

const AssignLabel = ({
  closeModalOnClick,
}: {
  closeModalOnClick: Function;
}) => {
  const router = useRouter();
  const { taskID } = router.query;
  const { labels } = useSelector(selectLabels);
  const { tasks } = useSelector(selectTodo);
  const task = tasks[String(taskID)];
  const [labelsState, setLabelsState] = useState(labels);
  const [labelsSelected, setLabelsSelected] = useState<string[]>(task.labels);

  return (
    <Modal onCloseRedirect='' closeModalOnClick={closeModalOnClick}>
      <div className='assign-labels-container'>
        <div className='title'>Asign Label</div>
        <div className='labels-container'>
          {Object.keys(labelsState).map((label) => (
            <button
              id={labelsState[label].label_id}
              className='label'
              style={{ background: `${labelsState[label].label_color}` }}
            >
              {labelsState[label].label_name}
            </button>
          ))}
        </div>
        <div className='action-buttons'>
          <button>Cancel</button>
          <button>Accept</button>
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
        }
      `}</style>
    </Modal>
  );
};
export default AssignLabel;
