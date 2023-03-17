import { Label } from '@/global/types';
import { db } from '@/utils/firebase.config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import { setAddNewLabel } from 'store/slices/labelsSlice';
import Modal from '../Modal/Modal';

const CreateLabel = ({
  closeModalOnClick,
}: {
  closeModalOnClick: Function;
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  const [newLabel, setNewLabel] = useState<Label>({
    label_name: '',
    is_favorite: false,
    label_color: '',
    label_order: 0,
    label_id: '',
  });

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const name: string = (event.target as HTMLButtonElement).name;
    const value: string = (event.target as HTMLButtonElement).value;
    setNewLabel({
      ...newLabel,
      [name]: value,
    });
  };

  const handleAddLabel = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!user) return;
    console.log('Adding Label');
    const newDocRef = doc(collection(db, 'users', user.uid, 'labels'));
    newLabel.label_id = newDocRef.id;
    await setDoc(newDocRef, newLabel);
    dispatch(setAddNewLabel(newLabel));
    closeModalOnClick();
  };

  return (
    <Modal onCloseRedirect={''} closeModalOnClick={closeModalOnClick}>
      <div className='label-create'>
        <input
          type='text'
          placeholder='Name'
          value={newLabel.label_name}
          name='label_name'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Color'
          value={newLabel.label_color}
          name='label_color'
          onChange={handleChange}
        />
        <div className='actions'>
          <button onClick={() => closeModalOnClick()}>Cancel</button>
          <button onClick={handleAddLabel}>Acept</button>
        </div>
      </div>
      <style jsx>
        {`
          .label-create {
            width: 300px;
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </Modal>
  );
};

export default CreateLabel;
