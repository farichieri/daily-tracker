import { Todo } from '@/global/types';
import { getTodos } from '@/hooks/firebase';
import { db } from '@/utils/firebase.config';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { closeModal } from 'store/slices/layoutSlice';
import { selectTodoEdit, setTodos } from 'store/slices/todosSlice';
import Modal from '../Modal/Modal';

const TodoEdit = () => {
  const dispatch = useDispatch();
  const todoEdit = useSelector(selectTodoEdit);
  console.log({ todoEdit });
  const [todoInput, setTodoInput] = useState<Todo>({
    id: todoEdit.id,
    todoName: todoEdit.todoName,
    isDefault: todoEdit.isDefault,
    isFavorite: todoEdit.isFavorite,
    isArchivated: todoEdit.isArchivated,
  });
  const { user } = useSelector(selectUser);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleChange = (e: any) => {
    setTodoInput({
      ...todoInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const name: string = (e.target as HTMLButtonElement).name;
    const newInput: any = { ...todoInput };
    const bool: boolean = !newInput[name];
    setTodoInput({
      ...newInput,
      [name]: bool,
    });
  };

  const handleEditTodo = async () => {
    if (user) {
      dispatch(closeModal());
      if (todoEdit.isDefault === false && todoInput.isDefault === true) {
        const docRef = collection(db, 'users', user.uid, 'todos');
        const querySnapshot = await getDocs(docRef);
        const removeDefaults = async () => {
          querySnapshot.forEach((docToUpdate) => {
            updateDoc(doc(db, 'users', user.uid, 'todos', docToUpdate.id), {
              isDefault: false,
            });
          });
        };
        await removeDefaults();
      }
      const docRef = doc(db, 'users', user.uid, 'todos', todoEdit.id);
      await updateDoc(docRef, {
        todoName: todoInput.todoName,
        isDefault: todoInput.isDefault,
        isFavorite: todoInput.isFavorite,
        isArchivated: todoInput.isArchivated,
      });
      const todos = await getTodos(user);
      dispatch(setTodos(todos));
    }
  };

  return (
    <Modal>
      <div className='container'>
        <div className='title'>Edit Todo</div>
        <div className='form'>
          <div className='name'>
            <span>Name:</span>
            <input
              type='text'
              name='todoName'
              value={todoInput.todoName}
              onChange={handleChange}
            />
          </div>
          <div className='default'>
            <button name='isDefault' onClick={handleClick}>
              {todoInput.isDefault ? 'Default' : 'Make Default'}
            </button>
          </div>
          <div className='favorite'>
            <button name='isFavorite' onClick={handleClick}>
              {todoInput.isFavorite ? 'Favorite' : 'Make Favorite'}
            </button>
          </div>
          <div className='archivated'>
            <button name='isArchivated' onClick={handleClick}>
              {todoInput.isArchivated ? 'Desarchivate' : 'Archivate'}
            </button>
          </div>
          <div className='buttons'>
            <button onClick={handleCloseModal}>Cancel</button>
            <button onClick={handleEditTodo}>Accept</button>
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

export default TodoEdit;
