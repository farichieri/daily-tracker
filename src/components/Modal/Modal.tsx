import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";

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
        <div className="min-w-screen max-w-screen fixed inset-0 z-[100] m-0 flex min-h-screen items-center justify-center">
          <Link href={onCloseRedirect} style={{ cursor: "initial" }}>
            <div className="min-w-screen fixed inset-0 m-0 flex min-h-screen items-center justify-center bg-[var(--bg-modal)]"></div>
          </Link>
          <div className="relative mx-4">
            <div className="absolute top-3 right-3 z-[100] cursor-pointer">
              <Link
                href={onCloseRedirect}
                style={{ cursor: "pointer" }}
                className=""
              >
                <Image
                  src={"/icons/delete.png"}
                  alt={"Close icon"}
                  width={20}
                  height={20}
                />
              </Link>
            </div>
            <div className="z-90 relative flex items-center justify-center overflow-auto rounded-3xl border-transparent bg-[var(--modal)] shadow-md shadow-[var(--cool)]">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-w-screen max-w-screen fixed inset-0 z-[100] m-0 flex min-h-screen items-center justify-center ">
          <div
            className="min-w-screen fixed inset-0 m-0 flex min-h-screen items-center justify-center bg-[var(--bg-modal)]"
            onClick={handleCloseModal}
          ></div>
          <div className="z-90 relative flex items-center justify-center overflow-auto rounded-3xl border-transparent bg-[var(--modal)] shadow-md shadow-[var(--cool)]">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
