import IconButton from '@/components/Layout/Icon/IconButton';
import { Task } from '@/global/types';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

const DayTask = ({
  handleChange,
  handleToggleDone,
  task,
  taskID,
  addTask,
  handleRemove,
  handleSave,
}: {
  handleChange: any;
  handleToggleDone: any;
  task: Task;
  taskID: any;
  addTask: boolean;
  handleRemove: any;
  handleSave: any;
}) => {
  const router = useRouter();
  const { date } = router.query;

  return (
    <div className={`container ${task.done ? 'done' : ''}`}>
      <div className='column hour'>
        <div className='hour-inputs'>
          <div className='from-container'>
            <input
              autoComplete='off'
              id={taskID}
              name='time_from'
              onBlur={() => handleSave(task)}
              onChange={handleChange}
              placeholder='Hour'
              spellCheck='false'
              type='time'
              value={task.time_from}
            />
          </div>
          {/* <div className='to-container'>
            <input
              autoComplete='off'
              id={taskID}
              name='time_to'
              onBlur={() => handleSave(task)}
              onChange={handleChange}
              spellCheck='false'
              type='time'
              value={task.time_to}
            />
          </div> */}
        </div>
      </div>
      <div className='column task-description'>
        <input
          placeholder='Task'
          onChange={handleChange}
          value={task.content}
          name='content'
          id={taskID}
          spellCheck='false'
          autoComplete='off'
          onBlur={() => handleSave(task)}
        />
        <input
          placeholder={addTask ? 'Description' : ''}
          onChange={handleChange}
          value={task.description}
          name='description'
          id={taskID}
          spellCheck='false'
          autoComplete='off'
          className='description'
          onBlur={() => handleSave(task)}
        />
      </div>
      <div className='column action'>
        <IconButton
          onClick={handleToggleDone}
          props={{ id: taskID }}
          src={task.done ? '/icons/checkbox-done.png' : '/icons/checkbox.png'}
          alt={task.done ? 'Done-Icon' : 'Checkbox-Icon'}
          width={24}
          height={24}
        />
      </div>
      <div className='column action'>
        <div>
          <Link href={`/app/tracker/${String(date)}/task/${taskID}`}>
            <IconButton
              props={{}}
              onClick={null}
              src={'/icons/more.png'}
              alt='More-Icon'
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
      <div className='column action'>
        <div>
          <IconButton
            props={{ id: taskID }}
            onClick={handleRemove}
            src={'/icons/delete.png'}
            alt='Delete-Icon'
            width={24}
            height={24}
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          border-radius: 5px;
          padding: 0.25rem 0.25 0.25rem 0.25rem;
        }
        input {
          background: none;
          color: var(--text-color);
          border: none;
          outline: none;
          padding: 0.25rem 0.3rem 0.25rem 0.5rem;
        }
        .column {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
        }
        .hour {
          width: fit-content;
          word-break: break-all;
          font-size: 80%;
          border-right: 3px solid var(--box-shadow);
          margin: 0.5rem 0;
          max-width: 6rem;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .description {
          font-size: 80%;
          color: var(--text-secondary-color);
        }
        input[type='time']::-webkit-calendar-picker-indicator {
          display: none;
        }
        input[type='time'] {
          cursor: text;
        }
        .action {
          width: 2.5rem;
        }
        .container.done .hour {
          border-right: 3px solid #02c3026b;
        }
        .from-container,
        .to-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: center;
        }
        .labels {
          width: 100%;
          display: flex;
        }
        .from,
        .to {
          font-size: 80%;
          color: var(--text-secondary-color);
          width: 100%;
          text-align: left;
          padding: 0 0.5rem;
        }
        .to {
          padding-left: 0.85rem;
        }
        .hour-inputs {
          display: flex;
          align-items: center;
        }
        .hour-inputs input {
          display: flex;
          padding: 0;
          opacity: 0.6;
        }

        @media screen and (max-width: 500px) {
          .hour {
            max-width: 5.5rem;
          }
        }
        @media screen and (max-width: 300px) {
          .hour {
            max-width: 4.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DayTask;
