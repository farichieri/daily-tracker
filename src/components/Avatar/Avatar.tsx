import { getUserSettings } from '@/hooks/firebase';
import { db, storage } from '@/utils/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserSettings } from 'store/slices/authSlice';
import Image from 'next/image';

const Avatar = ({
  size,
  changeable,
}: {
  size: number;
  changeable: boolean;
}) => {
  const dispatch = useDispatch();
  const { userSettings, user } = useSelector(selectUser);
  const photo = userSettings.photo;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && user) {
      const file = files[0];
      if (!file) return;
      const imageRef = ref(storage, `users/${user?.uid}/settings/profile`);
      uploadBytes(imageRef, file)
        .then(() => {
          getDownloadURL(imageRef)
            .then(async (newImageUrl) => {
              await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                displayName: user.displayName,
                photo: newImageUrl,
              });
              const settings = await getUserSettings(user);
              settings && dispatch(setUserSettings(settings));
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className='image-container'>
      {photo ? (
        <div className='image'>
          {changeable && (
            <input type='file' onChange={handleChange} accept='image/*' />
          )}
          <Image
            src={photo}
            alt='Profile Photo'
            width={size}
            height={size}
            style={{ pointerEvents: 'none' }}
          />
        </div>
      ) : (
        <div className='no-photo'>
          <span>{userSettings?.displayName[0]?.toLowerCase()}</span>
          {changeable && (
            <input type='file' onChange={handleChange} accept='image/*' />
          )}
        </div>
      )}
      <style jsx>
        {`
          .image-container {
            gap: 0.5rem;
            display: flex;
            flex-direction: column;
          }
          .image {
            align-items: center;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            overflow: hidden;
            position: relative;
          }
          .no-photo {
            align-items: center;
            background: gray;
            border-radius: 50%;
            display: flex;
            font-size: ${size - 10}px;
            height: ${size}px;
            justify-content: center;
            overflow: hidden;
            position: relative;
            width: ${size}px;
            cursor: pointer;
            z-index: 2;
          }
          input[type='file'] {
            cursor: pointer;
            width: 100%;
            height: 100%;
            font-size: 0;
            position: absolute;
          }
        `}
      </style>
    </div>
  );
};

export default Avatar;
