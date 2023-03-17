import IconButton from '@/components/Layout/Icon/IconButton';
import { SubTask } from '@/global/types';

const Subtask = ({
  addSubtask,
  handleAddSubtask,
  handleChange,
  handleDelete,
  handleDoneSubtask,
  index,
  subtaskState,
  handleSave,
}: {
  addSubtask: boolean;
  handleAddSubtask: any;
  handleChange: React.ChangeEventHandler;
  handleDelete: React.MouseEventHandler;
  handleDoneSubtask: React.MouseEventHandler;
  index: number;
  subtaskState: SubTask;
  handleSave: React.FocusEventHandler;
}) => {
  return (
    <form onSubmit={handleAddSubtask}>
      {!addSubtask && (
        <IconButton
          onClick={handleDoneSubtask}
          props={{ name: 'done', id: String(index) }}
          src={
            subtaskState.done
              ? '/icons/checkbox-done.png'
              : '/icons/checkbox.png'
          }
          alt={subtaskState.done ? 'Done-Icon' : 'Checkbox-Icon'}
          width={24}
          height={24}
        />
      )}
      <input
        type='text'
        placeholder='Add a subtask'
        value={subtaskState.content}
        name={addSubtask ? 'new-subtask' : 'subtask'}
        onChange={handleChange}
        id={String(index)}
        className={`${subtaskState.done ? 'done' : ''}`}
        readOnly={subtaskState.done}
        spellCheck='false'
        autoComplete='off'
        onBlur={handleSave}
      />
      {subtaskState.done && (
        <div className='delete'>
          <IconButton
            props={{ value: index, id: String(index) }}
            onClick={handleDelete}
            src={'/icons/delete.png'}
            alt='Delete-Icon'
            width={24}
            height={24}
          />
        </div>
      )}
      {addSubtask && (
        <IconButton
          props={{ type: 'submit' }}
          onClick={handleAddSubtask}
          src={'/icons/add.png'}
          alt='Add-Icon'
          width={24}
          height={24}
        />
      )}
      <style jsx>{`
        form {
          display: flex;
          align-items: center;
          border: 1px solid var(--box-shadow-light);
          border-radius: 0.5rem;
          padding: 0.5rem;
          gap: 0.5rem;
        }
        input {
          width: 100%;
          background: transparent;
          border: transparent;
          outline: none;
          color: var(--text-color);
        }
        input:focus & form {
          border: 1px solid var(--text-shadow);
          background: red;
        }
        input.done {
          text-decoration: line-through;
          cursor: initial;
        }
      `}</style>
    </form>
  );
};

export default Subtask;
