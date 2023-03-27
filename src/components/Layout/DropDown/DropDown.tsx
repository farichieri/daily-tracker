import { ReactNode, useEffect, useState } from "react";

const DropDown = ({
  children,
  btnText,
  closeDrop,
  setCloseDrop,
}: {
  children: ReactNode;
  btnText: any;
  closeDrop: boolean;
  setCloseDrop: Function;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (closeDrop === true) {
      setOpen(false);
      setCloseDrop(false);
    }
  }, [closeDrop, open]);

  return (
    <div className="container">
      <div className="content" onClick={() => setOpen(!open)}>
        {btnText}
      </div>
      {open && (
        <>
          <div className="drop-menu" onClick={(e) => e.stopPropagation()}>
            <div className="menu">{children}</div>
          </div>
          <div className="modal" onClick={() => setOpen(!open)}></div>
        </>
      )}
      <style jsx>{`
        .container {
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
          height: fit-content;
          width: fit-content;
          transition: 0.3s;
          border-radius: 50%;
        }
        .content:hover {
          box-shadow: 0 0 6px var(--box-shadow);
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
          background: var(--modal);
          box-shadow: 0 0 6px 1px var(--box-shadow-light);
          border-radius: 6px;
          top: 2.65rem;
          right: 0.1rem;
          z-index: 12;
          font-size: 80%;
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
