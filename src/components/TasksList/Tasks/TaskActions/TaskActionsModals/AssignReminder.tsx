import Modal from '@/components/Modal/Modal';

const AssignReminder = ({
  closeModalOnClick,
}: {
  closeModalOnClick: Function;
}) => {
  return (
    <Modal onCloseRedirect='' closeModalOnClick={closeModalOnClick}>
      Asign Reminder
    </Modal>
  );
};

export default AssignReminder;
