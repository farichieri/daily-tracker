import css from 'styled-jsx/css';

const general = css.global`
  :root {
    --footer-height: 190px;
    --nav-height: 60px;
    --max-width: 1200px;
    --max-width-content: 900px;
    --break-point: 900px;
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
