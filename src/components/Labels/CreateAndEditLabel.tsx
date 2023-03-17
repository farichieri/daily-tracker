import { Label } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import {
  selectLabels,
  setAddNewLabel,
  setDeleteLabel,
  setEditLabel,
} from 'store/slices/labelsSlice';
import Modal from '../Modal/Modal';

const CreateAndEditLabel = ({
  closeModalOnClick,
  action,
  labelToEdit,
}: {
  closeModalOnClick: Function;
  action: string;
  labelToEdit: string;
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const { labels } = useSelector(selectLabels);
  const [labelInputState, setLabelInputState] = useState<Label>({
    is_favorite: false,
    label_color: '',
    label_id: '',
    label_name: '',
    label_order: 0,
  });

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setLabelInputState({
      ...labelInputState,
      [name]: value,
    });
  };

  const handleAddLabel = async () => {
    if (!user) return;
    console.log('Adding Label');
    const newDocRef = doc(collection(db, 'users', user.uid, 'labels'));
    labelInputState.label_id = newDocRef.id;
    await setDoc(newDocRef, labelInputState);
    dispatch(setAddNewLabel(labelInputState));
    closeModalOnClick();
  };

  const handleEditLabel = async () => {
    if (!user) return;
    console.log('Editing Label');
    const newDocRef = doc(db, 'users', user.uid, 'labels', labelToEdit);
    await setDoc(newDocRef, labelInputState);
    dispatch(setEditLabel(labelInputState));
    closeModalOnClick();
  };

  const handleDeleteLabel = async () => {
    if (!user) return;
    console.log('Deleting Label');
    const newDocRef = doc(db, 'users', user.uid, 'labels', labelToEdit);
    await deleteDoc(newDocRef);
    dispatch(setDeleteLabel(labelToEdit));
    closeModalOnClick();
  };

  useEffect(() => {
    if (labelToEdit) {
      const labelSelected = labels[labelToEdit];
      setLabelInputState(labelSelected);
    }
  }, [labelToEdit]);

  return (
    <Modal onCloseRedirect={''} closeModalOnClick={closeModalOnClick}>
      <div className='label-create'>
        <div className='title'>
          {action === 'create' ? (
            <span>Create Label</span>
          ) : (
            <span>Edit Label</span>
          )}
        </div>
        <input
          type='text'
          placeholder='Name'
          value={labelInputState.label_name}
          name='label_name'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Color'
          value={labelInputState.label_color}
          name='label_color'
          onChange={handleChange}
        />
        {action === 'create' ? (
          <div className='actions'>
            <button onClick={() => closeModalOnClick()}>Cancel</button>
            <button onClick={handleAddLabel}>Acept</button>
          </div>
        ) : (
          <div className='actions'>
            <button onClick={handleDeleteLabel}>Delete</button>
            <button onClick={() => closeModalOnClick()}>Cancel</button>
            <button onClick={handleEditLabel}>Edit</button>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .label-create {
            width: 300px;
            height: 250px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            gap: 1rem;
            padding: 1rem 0;
          }
        `}
      </style>
    </Modal>
  );
};

export default CreateAndEditLabel;
