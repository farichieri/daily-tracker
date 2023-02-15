import { MouseEventHandler } from 'react';

const Button = ({
  content,
  isLoading,
  isDisabled,
  loadMessage,
  onClick,
}: {
  onClick: MouseEventHandler;
  content: string;
  isLoading: boolean;
  isDisabled: boolean;
  loadMessage: string;
}) => {
  return (
    <button onClick={onClick} disabled={isDisabled}>
      <span className='button-background'></span>
      {isLoading ? <span>{loadMessage}</span> : <span>{content}</span>}
      <style jsx>{`
        button {
          cursor: pointer;
          border-radius: 9999px;
          transition: 0.3s;
          color: white;
          width: 100%;
          background: var(--background-color);
          border: none;
          position: relative;
          min-height: 35px;
          max-width: 300px;
        }
        button:hover {
          filter: brightness(2);
        }
        button:active {
          box-shadow: 0 0 20px 1px var(--box-shadow);
        }
        button:disabled {
          background: var(--background-color);
          color: var(--text-color);
          box-shadow: none;
        }
        button:disabled:hover {
          filter: none;
        }
        span {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: black;
          border-radius: 9999px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button-background {
          position: absolute;
          top: 1px;
          right: 1px;
          bottom: 1px;
          left: 1px;
          border-radius: 9999px;
          background: linear-gradient(
            -90deg,
            #007cf0,
            #00dfd8,
            #ff0080,
            #007cf0
          );
          background-size: 400% 100%;
          border: none;
          padding: 0;
          margin: 0;
          animation: backgroundAnimation 8s ease-in-out infinite;
        }

        @keyframes backgroundAnimation {
          50% {
            background-position: 140% 50%;
            transform: skew(-2deg);
          }
        }

        .button-background:after {
          content: '';
          position: absolute;
          background-size: inherit;
          background-image: inherit;
          -webkit-animation: inherit;
          animation: inherit;
          left: 0;
          right: 0;
          top: 0;
          height: 100%;
          filter: blur(0.5rem);
        }
      `}</style>
    </button>
  );
};

export default Button;
