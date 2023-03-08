import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'store/slices/layoutSlice';

const Modal = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className='full-screen' onClick={handleCloseModal}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <style jsx>
        {`
          .full-screen {
            position: fixed;
            min-height: 100vh;
            min-width: 100vw;
            background: var(--bg-modal);
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0;
            max-width: 100vw;
            z-index: 11;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .modal {
            background: var(--gray-color);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            box-shadow: 0 0 10px 1px var(--box-shadow);
            position: relative;
          }
          .close {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default Modal;
