import css from 'styled-jsx/css';

const general = css.global`
  :root {
    --footerHeight: 250px;
    --nav-height: 70px;
    --max-width: 1200px;
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
    color: var(--text-color);
  }
`;

export default general;
