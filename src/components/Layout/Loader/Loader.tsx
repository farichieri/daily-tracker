import React from 'react';

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className='loader'>
      <div className='loader__content'>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
        <div className='loader__bar'></div>
      </div>
      <style jsx>{`
        .loader {
          top: 0;
          left: 0;
          z-index: 2;
          transition: all 0.3s ease-in-out;
          position: relative;
          background: red;
          height: 50px;
        }
        .loader__content {
          height: 100%;
          left: 50%;
          position: absolute;
          top: 0;
          bottom: 0;
          width: 126px;
          transform: translateX(-50%);
        }
        .loader__bar {
          background: white;
          bottom: 5px;
          height: 2px;
          position: absolute;
          width: 5px;
          -webkit-animation: sound 0ms -800ms linear infinite alternate;
          animation: sound 0ms -800ms linear infinite alternate;
        }
        .loader__bar:nth-child(1) {
          left: 1px;
          -webkit-animation-duration: 474ms;
          animation-duration: 474ms;
        }
        .loader__bar:nth-child(2) {
          left: 13px;
          -webkit-animation-duration: 433ms;
          animation-duration: 433ms;
        }
        .loader__bar:nth-child(3) {
          left: 25px;
          -webkit-animation-duration: 407ms;
          animation-duration: 407ms;
        }
        .loader__bar:nth-child(4) {
          left: 37px;
          -webkit-animation-duration: 458ms;
          animation-duration: 458ms;
        }
        .loader__bar:nth-child(5) {
          left: 49px;
          -webkit-animation-duration: 400ms;
          animation-duration: 400ms;
        }
        .loader__bar:nth-child(6) {
          left: 61px;
          -webkit-animation-duration: 427ms;
          animation-duration: 427ms;
        }
        .loader__bar:nth-child(7) {
          left: 73px;
          -webkit-animation-duration: 441ms;
          animation-duration: 441ms;
        }
        .loader__bar:nth-child(8) {
          left: 85px;
          -webkit-animation-duration: 419ms;
          animation-duration: 419ms;
        }
        .loader__bar:nth-child(9) {
          left: 97px;
          -webkit-animation-duration: 487ms;
          animation-duration: 487ms;
        }
        .loader__bar:nth-child(10) {
          left: 109px;
          -webkit-animation-duration: 442ms;
          animation-duration: 442ms;
        }
        .loader__bar:nth-child(11) {
          left: 121px;
          -webkit-animation-duration: 412ms;
          animation-duration: 412ms;
        }
         {
        }

        @-webkit-keyframes sound {
          0% {
            opacity: 0.35;
            height: 3px;
          }
          100% {
            opacity: 1;
            height: calc(100% - 10px);
          }
        }

        @keyframes sound {
          0% {
            opacity: 0.35;
            height: 3px;
          }
          100% {
            opacity: 1;
            height: calc(100% - 10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
