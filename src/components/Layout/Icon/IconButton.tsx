import Image from 'next/image';
import { MouseEventHandler } from 'react';

const IconButton = ({
  src,
  alt,
  width,
  height,
  onClick,
  props,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  onClick: MouseEventHandler | null;
  props: any | null;
}) => {
  return (
    <button {...props} onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ pointerEvents: 'none' }}
      />
      <style jsx>
        {`
          button {
            border-radius: 999px;
            cursor: pointer;
            display: flex;
            margin: auto;
            background: none;
            border: none;
            height: 24px;
            width: 24px;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </button>
  );
};

export default IconButton;
