import css from 'styled-jsx/css';

const general = css.global`
  :root {
    --footerHeight: 170px;
    --navHeight: 70px;
    --max-width: 42rem;
  }
  h1 {
    font-size: 2rem;
  }
  a[href] {
    text-decoration: none;
    color: var(--link-color);
    transition: 0.3s;
  }
  a[href]:hover {
    color: var(--textColor);
  }
`;

export default general;
