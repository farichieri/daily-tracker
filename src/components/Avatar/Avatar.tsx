import { getUserSettings } from "@/services";
import { db, storage } from "@/utils/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserSettings } from "store/slices/authSlice";
import Image from "next/image";

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
              await setDoc(doc(db, "users", user.uid), {
                email: userSettings.email,
                display_name: userSettings.display_name,
                is_premium: userSettings.is_premium,
                plan_name: userSettings.plan_name,
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
    <div className="image-container">
      {photo ? (
        <div className="image">
          {changeable && (
            <input
              title="Upload a new photo"
              type="file"
              onChange={handleChange}
              accept="image/*"
            />
          )}
          <Image
            src={photo}
            alt="Profile Photo"
            width={size}
            height={size}
            style={{ pointerEvents: "none", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div className="no-photo">
          <span>{userSettings?.display_name[0]?.toLowerCase()}</span>
          {changeable && (
            <input
              title="Upload a new photo"
              type="file"
              onChange={handleChange}
              accept="image/*"
            />
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
            box-shadow: 0 0 10px 1px var(--box-shadow-light);
            height: ${size}px;
            width: ${size}px;
            vertical-align: middle;
          }
          .no-photo {
            align-items: center;
            background: var(--gray-color);
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
            box-shadow: 0 0 10px 1px var(--box-shadow-dark);
            color: var(--bg-color-tertiary);
            border: 2px solid var(--bg-color-tertiary);
          }
          input[type="file"] {
            cursor: pointer;
            width: 100%;
            height: 100%;
            font-size: 0;
            position: absolute;
            transition: 0.3s;
            background: #00000080;
            background-image: url("/icons/add-image.png");
            background-repeat: no-repeat;
            background-position: center center;
            opacity: 0;
          }
          input:hover {
            opacity: 1;
          }
          input[type="file"]::after {
            content: "Attach Your CV: ";
          }
        `}
      </style>
    </div>
  );
};

export default Avatar;
