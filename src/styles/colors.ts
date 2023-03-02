import css from 'styled-jsx/css';

const colors = css.global`
  div.dark {
    --text-color: white;
    --bg-color: #131313;
    --bg-color-secondary: #131313;
    --bg-color-tertiary: #576375;
    --box-shadow: #f5f5f552;
    --box-shadow-light: #f5f5f522;
    --nav-bg-color: #00000080;
    --link-color: gray;
    --nav-background-color: black;
  }
  div.light {
    --text-color: black;
    --bg-color: white;
    --bg-color-secondary: white;
    --bg-color-tertiary: #b4cdf0;
    --box-shadow: #00000080;
    --box-shadow-light: #00000030;
    --nav-bg-color: transparent;
    --link-color: gray;
    --nav-background-color: white;
  }
`;

export default colors;
