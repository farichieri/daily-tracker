import { Todo } from '@/global/types';
import { getTodos } from '@/hooks/firebase';
import { db } from '@/utils/firebase.config';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { closeModal } from 'store/slices/layoutSlice';
import { selectTodoEdit, setTodos } from 'store/slices/todosSlice';
import Button from '../Layout/Button/Button';
import IconButton from '../Layout/Icon/IconButton';
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
        <div className='title'>Edit Project</div>
        <div className='form'>
          <div className='content'>
            <div className='name'>
              <span>Name:</span>
              <input
                type='text'
                name='todoName'
                value={todoInput.todoName}
                onChange={handleChange}
              />
            </div>
            <div className='option'>
              <span>{todoInput.isDefault ? 'Default' : 'Make Default'}</span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'isDefault' }}
                  src={
                    todoInput.isDefault
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={todoInput.isDefault ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className='option'>
              <span>{todoInput.isFavorite ? 'Favorite' : 'Make Favorite'}</span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'isFavorite' }}
                  src={
                    todoInput.isFavorite
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={todoInput.isFavorite ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className='option'>
              <span>
                {todoInput.isArchivated ? 'Desarchivate' : 'Archivate'}
              </span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'isArchivated' }}
                  src={
                    todoInput.isArchivated
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={todoInput.isArchivated ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
          </div>
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
              onClick={handleEditTodo}
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
            .name {
              display: flex;
              gap: 0.5rem;
              align-items: center;
              padding: 0 1rem;
              justify-content: space-between;
            }
            input {
              background: none;
              color: var(--text-color);
              outline: none;
              padding: 0.25rem 0.3rem 0.25rem 0.5rem;
              border: none;
              width: 50%;
              border-bottom: 1px solid var(--box-shadow-light);
            }
            .buttons {
              display: flex;
              gap: 0.5rem;
            }
            .option {
              display: flex;
              justify-content: space-between;
              padding: 0 1rem;
            }
            .content {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              margin: 1rem 0;
            }
          `}
        </style>
      </div>
    </Modal>
  );
};

export default TodoEdit;
