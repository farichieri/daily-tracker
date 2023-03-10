import { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDaySelected, setDaySelected } from 'store/slices/trackerSlice';
import Image from 'next/image';

const DropDown = ({
  children,
  btnText,
}: {
  children: ReactNode;
  btnText: any;
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleSelect = (day: Date | undefined) => {
    if (day) {
      setOpen(!open);
    }
  };

  return (
    <div className='container'>
      <div className='content' onClick={() => setOpen(!open)}>
        {btnText}
        <div className='icon-container'>
          {open ? (
            <Image
              src={'/icons/collapse.png'}
              alt='collapse-icon'
              width={12}
              height={12}
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <Image
              src={'/icons/expand.png'}
              alt='expand-icon'
              width={12}
              height={12}
              style={{ pointerEvents: 'none' }}
            />
          )}
        </div>
      </div>
      {open && (
        <>
          <div className='drop-menu' onClick={(e) => e.stopPropagation()}>
            <div className='menu'>{children}</div>
          </div>
          <div className='modal' onClick={() => setOpen(!open)}></div>
        </>
      )}
      <style jsx>{`
        .container {
          border: 1px solid var(--box-shadow-light);
          padding: 0.25rem 0.5rem;
          border-radius: 5px;
          position: relative;
        }
        .content {
          display: flex;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          gap: 0.3rem;
          justify-content: center;
          align-items: center;
        }
        .icon-container {
          display: flex;
          pointer-events: none;
          margin-bottom: 4px;
        }
        .modal {
          position: fixed;
          background: transparent;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 10;
          display: block;
        }
        .menu {
          height: auto;
          width: 100%;
        }
        .drop-menu {
          position: absolute;
          background: var(--bg-color);
          box-shadow: 0 0 10px 1px var(--box-shadow-light);
          border-radius: 6px;
          top: 2.2rem;
          right: 0.1rem;
          z-index: 998;
          font-size: 80%;
          background: var(--bg-color);
          height: auto;
          width: 12rem;
          padding: 0.5rem 0rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rdp-row {
        }
      `}</style>
    </div>
  );
};

export default DropDown;