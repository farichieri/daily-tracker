import { getProjects, getTodos } from '@/hooks/firebase';
import { db } from '@/utils/firebase.config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { closeModal } from 'store/slices/layoutSlice';
import { setTodos } from 'store/slices/todosSlice';
import Modal from '../Modal/Modal';

const TodoCreate = () => {
  const dispatch = useDispatch();
  const [todoInput, setTodoInput] = useState('');
  const { user } = useSelector(selectUser);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleChange = (e: any) => {
    setTodoInput(e.target.value);
  };

  const handleAddTracker = async () => {
    if (user) {
      dispatch(closeModal());
      const docRef = collection(db, 'users', user.uid, 'todos');
      await addDoc(docRef, {
        todoName: todoInput,
        isDefault: false,
        isFavorite: false,
        isArchivated: false,
      });
      const todos = await getTodos(user);
      dispatch(setTodos(todos));
    }
  };

  return (
    <Modal>
      <div className='container'>
        <div className='title'>New To-do</div>
        <div className='form'>
          <input
            type='text'
            placeholder=''
            value={todoInput}
            onChange={handleChange}
          />
          <div className='buttons'>
            <button onClick={handleCloseModal}>Cancel</button>
            <button onClick={handleAddTracker}>Add</button>
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

export default TodoCreate;
