import LabelsLayout from '@/components/Layout/LabelsLayout';
import Modal from '@/components/Modal/Modal';
import { TaskGroup } from '@/global/types';
import { filterObjectIncludes } from '@/hooks/helpers';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectList } from 'store/slices/listsSlice';

const LabelID = () => {
  const router = useRouter();
  const taskIDLink = `/app/labels`;
  const { tasks } = useSelector(selectList);
  const { labelID } = router.query;

  const tasksWithLabel: TaskGroup = filterObjectIncludes(
    tasks,
    'labels',
    String(labelID)
  );

  const closeModalOnClick = () => {};

  return (
    <LabelsLayout>
      <Modal onCloseRedirect={taskIDLink} closeModalOnClick={closeModalOnClick}>
        <div className='label-id'>
          {Object.keys(tasksWithLabel).map((task) => (
            <div key={task} className='task'>
              <span>{tasksWithLabel[task].content}</span>
            </div>
          ))}
        </div>
      </Modal>
      <style jsx>{`
        .label-id {
          padding: 2rem 1.5rem;
          width: 95vw;
          height: 90vh;
          max-width: var(--max-width-task);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: var(--text-secondary-color);
          overflow: auto;
          pointer-events: initial;
        }
      `}</style>
    </LabelsLayout>
  );
};

export default LabelID;
