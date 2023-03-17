import { Todo, TodoGroup } from '@/global/types';
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

const TodoEdit = ({ closeModalOnClick }: { closeModalOnClick: Function }) => {
  const dispatch = useDispatch();
  const todoEdit = useSelector(selectTodoEdit);
  const [todoInput, setTodoInput] = useState<Todo>({
    is_archived: todoEdit.is_archived,
    is_default: todoEdit.is_default,
    is_favorite: todoEdit.is_favorite,
    is_private: todoEdit.is_private,
    labels: todoEdit.labels,
    list_id: todoEdit.list_id,
    list_name: todoEdit.list_name,
    members: todoEdit.members,
  });
  const { user } = useSelector(selectUser);

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
      if (todoEdit.is_default === false && todoInput.is_default === true) {
        const docRef = collection(db, 'users', user.uid, 'todos');
        const querySnapshot = await getDocs(docRef);
        const removeDefaults = async () => {
          querySnapshot.forEach((docToUpdate) => {
            updateDoc(doc(db, 'users', user.uid, 'todos', docToUpdate.id), {
              is_default: false,
            });
          });
        };
        await removeDefaults();
      }
      const docRef = doc(db, 'users', user.uid, 'todos', todoEdit.list_id);
      await updateDoc(docRef, {
        is_archived: todoInput.is_archived,
        is_default: todoInput.is_default,
        is_favorite: todoInput.is_favorite,
        is_private: todoInput.is_private,
        labels: todoInput.labels,
        list_id: todoInput.list_id,
        list_name: todoInput.list_name,
        members: todoInput.members,
      });
      const todos: TodoGroup = await getTodos(user);
      dispatch(setTodos(todos));
      closeModalOnClick();
    }
  };

  return (
    <Modal closeModalOnClick={closeModalOnClick} onCloseRedirect=''>
      <div className='container'>
        <div className='title'>Edit Project</div>
        <div className='form'>
          <div className='content'>
            <div className='name'>
              <span>Name:</span>
              <input
                type='text'
                name='list_name'
                value={todoInput.list_name}
                onChange={handleChange}
              />
            </div>
            <div className='option'>
              <span>{todoInput.is_default ? 'Default' : 'Make Default'}</span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'is_default' }}
                  src={
                    todoInput.is_default
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={todoInput.is_default ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className='option'>
              <span>
                {todoInput.is_favorite ? 'Favorite' : 'Make Favorite'}
              </span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'is_favorite' }}
                  src={
                    todoInput.is_favorite
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={todoInput.is_favorite ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className='option'>
              <span>
                {todoInput.is_archived ? 'Desarchivate' : 'Archivate'}
              </span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: 'is_archived' }}
                  src={
                    todoInput.is_archived
                      ? '/icons/toggle-on.png'
                      : '/icons/toggle-off.png'
                  }
                  alt={todoInput.is_archived ? 'On-Icon' : 'Off-Icon'}
                  width={24}
                  height={24}
                />
              </span>
            </div>
          </div>
          <div className='buttons'>
            <Button
              onClick={() => closeModalOnClick()}
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
              justify-content: center;
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
