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
            padding-left: 0.5em;
            display: flex;
            justify-content: center;
            position: relative;
            cursor: pointer;
            transition: 0.3s;
          }
          span:hover {
          }
        `}
      </style>
    </span>
  );
}
