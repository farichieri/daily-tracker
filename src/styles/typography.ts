import css from 'styled-jsx/css';
import { Orbitron, Space_Mono, Raleway } from '@next/font/google';

const orbitron = Orbitron({
  weight: '400',
  subsets: ['latin'],
  variable: '--orbitron',
});

const spaceMono = Space_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--space_mono',
});

const raleWay = Raleway({
  weight: '400',
  subsets: ['latin'],
  variable: '--rale_way',
});

export const fonts = {
  orbitron,
  spaceMono,
  raleWay,
};

const style = css.global`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap');
  * {
    font-family: 'Inter', sans-serif;
  }
  p,
  li {
    line-height: 1.6;
    font-size: 20px;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 1.3rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  a[href] {
    font-family: 'Inter', sans-serif;
    text-decoration: none;
    color: var(--link-color);
    transition: 0.3s;
  }
  a[href]:hover {
    color: var(--text-color);
  }

  @media screen and (max-width: 500px) {
    body {
      font-size: 85%;
    }
  }
  @media screen and (max-width: 400px) {
    body {
      font-size: 70%;
    }
  }
  @media screen and (max-width: 300px) {
    body {
      font-size: 60%;
    }
  }
`;

export default style;
