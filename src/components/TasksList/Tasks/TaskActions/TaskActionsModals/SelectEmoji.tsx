import Modal from "@/components/Modal/Modal";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const SelectEmoji = ({
  closeModalOnClick,
  handleChange,
}: {
  closeModalOnClick: Function;
  handleChange: Function;
}) => {
  return (
    <Modal onCloseRedirect="" closeModalOnClick={closeModalOnClick}>
      <Picker data={data} onEmojiSelect={handleChange} />
    </Modal>
  );
};
export default SelectEmoji;
