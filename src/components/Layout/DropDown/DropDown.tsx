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
      <div
        className="content"
        onClick={(event) => {
          event.preventDefault();
          setOpen(!open);
        }}
      >
        {btnText}
      </div>
      {open && (
        <>
          <div className="absolute right-4 mt-7 h-2 w-2 rotate-45 bg-[var(--modal)] shadow-inner  shadow-[var(--box-shadow-light)]"></div>
          <div
            className="drop-menu"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="menu">{children}</div>
          </div>
          <div
            className="modal"
            onClick={(event) => {
              event.preventDefault();
              setOpen(!open);
            }}
          ></div>
        </>
      )}
      <style jsx>{`
        .container {
          padding: 0.25rem 0.5rem;
          border-radius: 5px;
          position: relative;
          display: flex;
          justify-content: center;
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
          width: auto;
        }
        .drop-menu {
          position: absolute;
          background: var(--modal);
          box-shadow: 0 0 6px 1px var(--box-shadow-light);
          border-radius: 6px;
          top: auto;
          margin-top: 2rem;
          right: 0.1rem;
          z-index: 12;
          font-size: 80%;
          height: auto;
          min-width: fit-content;
          width: 6rem;
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
