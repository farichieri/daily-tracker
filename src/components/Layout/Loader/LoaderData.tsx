const LoaderData = () => {
  return (
    <div className='loader-container'>
      <span className='loader'></span>
      <style jsx>{`
        .loader-container {
          margin: auto;
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1rem 0;
          min-height: 20vh;
        }
        .loader {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: inline-block;
          border-top: 3px solid #fff;
          border-right: 3px solid transparent;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
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

export default LoaderData;
