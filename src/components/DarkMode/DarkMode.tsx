'use client';
import Image from 'next/image';

export default function DarkMode({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) {
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <span onClick={switchTheme}>
      {theme === 'dark' ? (
        <Image alt='dark' src={'/images/dark.png'} width={20} height={20} />
      ) : (
        <Image alt='light' src={'/images/light.png'} width={20} height={20} />
      )}
      <style jsx>
        {`
          span {
            align-items: center;
            border-radius: 50%;
            padding: 0.5em;
            display: flex;
            justify-content: center;
            position: relative;
            cursor: pointer;
            box-shadow: 0 0 3px 1px var(--box-shadow-light);
            transition: 0.3s;
          }
          span:hover {
            filter: brightness(1.5);
          }
        `}
      </style>
    </span>
  );
}
