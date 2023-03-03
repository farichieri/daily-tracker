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
      {isLoading ? <span>{loadMessage}</span> : <span>{content}</span>}
      <style jsx>{`
        button {
          cursor: pointer;
          border-radius: 9999px;
          transition: 0.3s;
          width: 100%;
          background: var(--background-color);
          border: 1px solid var(--text-color);
          position: relative;
          min-height: 35px;
          max-width: 150px;
          color: var(--text-color);
        }
        .button-background {
        }

        button:hover {
          filter: brightness(2);
        }
        button:active {
          box-shadow: 0 0 20px 1px var(--box-shadow);
        }
        button:disabled {
          color: var(--box-shadow-light);
          box-shadow: none;
          background: var(--bg-color);
          border: 1px solid var(--box-shadow-light);
          cursor: initial;
        }
        button:disabled:hover {
          filter: none;
        }
      `}</style>
    </button>
  );
};

export default Button;
