import { List, ListGroup } from "@/global/types";
import { getLists } from "@/services";
import { db } from "@/utils/firebase.config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/slices/authSlice";
import { selectListEdit, setLists } from "store/slices/listsSlice";
import Button from "../Layout/Button/Button";
import IconButton from "../Layout/Icon/IconButton";
import Modal from "../Modal/Modal";

const ListEdit = ({ closeModalOnClick }: { closeModalOnClick: Function }) => {
  const dispatch = useDispatch();
  const listEdit = useSelector(selectListEdit);
  const [listInput, setListInput] = useState<List>({
    is_archived: listEdit.is_archived,
    is_default: listEdit.is_default,
    is_favorite: listEdit.is_favorite,
    is_private: listEdit.is_private,
    labels: listEdit.labels,
    list_id: listEdit.list_id,
    list_name: listEdit.list_name,
    members: listEdit.members,
  });
  const { user } = useSelector(selectUser);

  const handleChange = (e: any) => {
    setListInput({
      ...listInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const name: string = (e.target as HTMLButtonElement).name;
    const newInput: any = { ...listInput };
    const bool: boolean = !newInput[name];
    setListInput({
      ...newInput,
      [name]: bool,
    });
  };

  const handleEditList = async () => {
    if (user) {
      if (listEdit.is_default === false && listInput.is_default === true) {
        const docRef = collection(db, "users", user.uid, "lists");
        const querySnapshot = await getDocs(docRef);
        const removeDefaults = async () => {
          querySnapshot.forEach((docToUpdate) => {
            updateDoc(doc(db, "users", user.uid, "lists", docToUpdate.id), {
              is_default: false,
            });
          });
        };
        await removeDefaults();
      }
      const docRef = doc(db, "users", user.uid, "lists", listEdit.list_id);
      await updateDoc(docRef, {
        is_archived: listInput.is_archived,
        is_default: listInput.is_default,
        is_favorite: listInput.is_favorite,
        is_private: listInput.is_private,
        labels: listInput.labels,
        list_id: listInput.list_id,
        list_name: listInput.list_name,
        members: listInput.members,
      });
      const lists: ListGroup = await getLists(user);
      dispatch(setLists(lists));
      closeModalOnClick();
    }
  };

  return (
    <Modal closeModalOnClick={closeModalOnClick} onCloseRedirect="">
      <div className="container">
        <div className="title">Edit List</div>
        <div className="form">
          <div className="content">
            <div className="name">
              <span>Name:</span>
              <input
                type="text"
                name="list_name"
                value={listInput.list_name}
                onChange={handleChange}
              />
            </div>
            <div className="option">
              <span>{listInput.is_default ? "Default" : "Make Default"}</span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: "is_default" }}
                  src={
                    listInput.is_default
                      ? "/icons/toggle-on.png"
                      : "/icons/toggle-off.png"
                  }
                  alt={listInput.is_default ? "On-Icon" : "Off-Icon"}
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className="option">
              <span>
                {listInput.is_favorite ? "Favorite" : "Make Favorite"}
              </span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: "is_favorite" }}
                  src={
                    listInput.is_favorite
                      ? "/icons/toggle-on.png"
                      : "/icons/toggle-off.png"
                  }
                  alt={listInput.is_favorite ? "On-Icon" : "Off-Icon"}
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className="option">
              <span>
                {listInput.is_archived ? "Desarchivate" : "Archivate"}
              </span>
              <span>
                <IconButton
                  onClick={handleClick}
                  props={{ name: "is_archived" }}
                  src={
                    listInput.is_archived
                      ? "/icons/toggle-on.png"
                      : "/icons/toggle-off.png"
                  }
                  alt={listInput.is_archived ? "On-Icon" : "Off-Icon"}
                  width={24}
                  height={24}
                />
              </span>
            </div>
          </div>
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
              onClick={handleEditList}
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

export default ListEdit;
