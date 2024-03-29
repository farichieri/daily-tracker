import { List, ListGroup } from "@/global/types";
import { getLists } from "@/services";
import { db } from "@/utils/firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/slices/authSlice";
import { setLists } from "store/slices/listsSlice";
import Button from "../Layout/Button/Button";
import Modal from "../Modal/Modal";

const ListCreate = ({ closeModalOnClick }: { closeModalOnClick: Function }) => {
  const dispatch = useDispatch();
  const [listInput, setListInput] = useState<List>({
    is_archived: false,
    is_default: false,
    is_favorite: false,
    is_private: false,
    labels: [],
    list_id: "",
    list_name: "",
    members: [],
  });
  const { user } = useSelector(selectUser);

  const handleChange = (e: any) => {
    setListInput({
      ...listInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddList = async () => {
    if (user) {
      const newDocRef = doc(collection(db, "users", user.uid, "lists"));
      listInput.list_id = newDocRef.id;
      listInput.list_name = listInput.list_name;
      await setDoc(newDocRef, listInput);
      const lists: ListGroup = await getLists(user);
      dispatch(setLists(lists));
      closeModalOnClick();
    }
  };

  return (
    <Modal onCloseRedirect="" closeModalOnClick={closeModalOnClick}>
      <div className="container">
        <div className="title">New Tasks List</div>
        <div className="form">
          <input
            type="text"
            placeholder=""
            name="list_name"
            value={listInput.list_name}
            onChange={handleChange}
          />
          <div className="buttons">
            <Button
              onClick={() => closeModalOnClick()}
              content="Cancel"
              isLoading={false}
              isDisabled={false}
              loadMessage={""}
              style={null}
            />
            <Button
              onClick={handleAddList}
              content="Acept"
              isLoading={false}
              isDisabled={false}
              loadMessage={""}
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
            input {
              background: none;
              color: var(--text-color);
              border: 1px solid var(--box-shadow-light);
              outline: none;
              padding: 0.25rem 0.3rem 0.25rem 0.5rem;
              margin-bottom: 0.5rem;
              border-radius: 6px;
            }
            .buttons {
              display: flex;
              gap: 0.5rem;
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

export default ListCreate;
