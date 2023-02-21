import Image from 'next/image';
import React from 'react';

type Props = {
  width: number;
  height: number;
  name: boolean;
  priority: boolean;
};

const Logo = (props: Props) => {
  return (
    <span>
      {/* <Image
        src={`/images/${'logo'}.png`}
        alt='Logo'
        height={props.height}
        width={props.width}
        priority={props.priority}
      /> */}
      <p>DailyTracker</p>
      <style jsx>{`
        span {
          display: flex;
          position: relative;
          width: ${props.width}px;
          height: ${props.height}px;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </span>
  );
};

export default Logo;
