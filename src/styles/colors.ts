import css from 'styled-jsx/css';

const colors = css.global`
  div.dark {
    --text-color: white;
    --bg-color: #131313;
    --bg-color-secondary: #282828;
    --bg-color-tertiary: #576375;
    --bg-color-tertiary-light: #57637557;
    --box-shadow: #f5f5f552;
    --box-shadow-light: #f5f5f510;
    --nav-bg-color: #00000080;
    --link-color: gray;
    --nav-background-color: black;
    --gray-color: #232323;
  }
  div.light {
    --text-color: black;
    --bg-color: white;
    --bg-color-secondary: lightgray;
    --bg-color-tertiary: #b4cdf0;
    --bg-color-tertiary-light: #57637557;
    --box-shadow: #00000080;
    --box-shadow-light: #0000001a;
    --nav-bg-color: transparent;
    --link-color: gray;
    --nav-background-color: white;
    --gray-color: #e7e7e7;
  }
`;

export default colors;
