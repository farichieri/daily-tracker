'use client';
import Image from 'next/image';
import { selectTheme, setTheme } from 'store/slices/themeSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function DarkMode({}) {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    dispatch(setTheme(newTheme));
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
