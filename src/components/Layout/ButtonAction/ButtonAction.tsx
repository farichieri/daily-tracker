const ButtonAction = ({ text, onClick }: { text: string; onClick: any }) => {
  return (
    <button onClick={onClick}>
      {text}
      <style jsx>
        {`
          button {
            background: var(--box-shadow);
            border: 1px solid var(--box-shadow);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 0 10px 1px var(--box-shadow-light);
            height: 1.5rem;
            width: 1.5rem;
          }
          button:active {
            box-shadow: 0 0 10px 1px var(--box-shadow);
          }
        `}
      </style>
    </button>
  );
};

export default ButtonAction;
