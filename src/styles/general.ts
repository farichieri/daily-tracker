import css from 'styled-jsx/css';

const general = css.global`
  :root {
    --footerHeight: 170px;
    --nav-height: 50px;
    --max-width: 900px;
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
