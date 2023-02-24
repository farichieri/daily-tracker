import Image from 'next/image';

const AuthorLogo = ({
  author,
  width,
  height,
}: {
  author: string;
  width: number;
  height: number;
}) => {
  return (
    <span style={{ width: width, height: height }}>
      <Image
        alt={author}
        src={`/authors/${author.toLowerCase().replaceAll(' ', '-')}.png`}
        width={width}
        height={height}
      />
      <style jsx>{`
        span {
          border-radius: 50%;
          overflow: auto;
          display: flex;
        }
      `}</style>
    </span>
  );
};

export default AuthorLogo;
