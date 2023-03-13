import { useSelector } from 'react-redux';
import { selectTodo } from 'store/slices/todosSlice';
import IconButton from '../Layout/Icon/IconButton';

const Todo = () => {
  const { todoData } = useSelector(selectTodo);
  const handleToggleDone = () => {};
  return (
    <div className='todo'>
      {todoData.length > 0 &&
        todoData.map((todo) => (
          <div className='task' key={todo.id}>
            <div className='name'>{todo.name}</div>
            <div className='checkbox'>
              <IconButton
                onClick={handleToggleDone}
                props={{ id: todo.id }}
                src={
                  todo.done ? '/icons/checkbox-done.png' : '/icons/checkbox.png'
                }
                alt={todo.done ? 'Done-Icon' : 'Checkbox-Icon'}
                width={24}
                height={24}
              />
            </div>
          </div>
        ))}
      <style jsx>{`
        .todo {
          width: 100%;
          border: 1px solid gray;
          border-radius: 6px;
          display: flex;
          max-width: 600px;
        }
        .task {
          width: 100%;
          display: flex;
          padding: 0.5rem 1rem;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default Todo;
