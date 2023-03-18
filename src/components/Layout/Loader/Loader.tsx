import React from 'react';

const Loader = ({
  text,
  fullScreen,
}: {
  text: string;
  fullScreen: boolean;
}) => {
  return (
    <div className='loader-container'>
      <div className='lds-dual-ring'></div>
      <style jsx>{`
        .loader-container {
          position: fixed;
          width: 100vw;
          height: calc(100vh);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: ${fullScreen ? 9999 : 5};
          top: 0;
          left: 0;
          background: var(--bg-color);
        }
        .lds-dual-ring {
          display: inline-block;
          width: 80px;
          height: 80px;
        }
        .lds-dual-ring:after {
          content: ' ';
          display: block;
          width: 64px;
          height: 64px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid var(--text-color);
          border-color: var(--text-color) transparent var(--text-color)
            transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
