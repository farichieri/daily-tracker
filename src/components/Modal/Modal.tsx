import Link from 'next/dist/client/link';
import { ReactNode } from 'react';

const Modal = ({
  children,
  onCloseRedirect,
  closeModalOnClick,
}: {
  children: ReactNode;
  onCloseRedirect: string;
  closeModalOnClick: Function;
}) => {
  const handleCloseModal = (e: any) => {
    if (closeModalOnClick) {
      closeModalOnClick();
    }
  };

  return (
    <>
      {onCloseRedirect ? (
        <div className='container'>
          <Link href={onCloseRedirect} style={{ cursor: 'initial' }}>
            <div className='full-screen'></div>
          </Link>
          <div className='modal-container'>
            <Link href={onCloseRedirect} style={{ cursor: 'initial' }}>
              <span className='close'>X</span>
            </Link>
            <div className='modal'>{children}</div>
          </div>
        </div>
      ) : (
        <div className='container'>
          <div className='full-screen' onClick={handleCloseModal}></div>
          <div className='modal'>{children}</div>
        </div>
      )}

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
            align-items: center;
            justify-content: center;
            display: flex;
          }
          .container {
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
            z-index: 997;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .modal {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 1rem;
            box-shadow: 0 0 6px 1px var(--cool);
            position: relative;
            background: var(--modal);
            z-index: 998;
            overflow: auto;
          }
          .modal-container {
            position: relative;
            margin: 2rem 0;
          }
          .close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            cursor: pointer;
            z-index: 999;
          }
        `}
      </style>
    </>
  );
};

export default Modal;
