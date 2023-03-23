import css from 'styled-jsx/css';

const colors = css.global`
  div.dark {
    --text-color: white;
    --text-secondary-color: #989898;
    --bg-color: #131313;
    --bg-color-secondary: #282828;
    --bg-color-tertiary: #576375;
    --bg-color-tertiary-light: #57637557;
    --box-shadow: #f5f5f552;
    --box-shadow-light: #f5f5f510;
    --box-shadow-dark: #00000080;
    --nav-bg-color: #00000080;
    --link-color: gray;
    --nav-background-color: black;
    --gray-color: #232323;
    --bg-modal: #00000080;
    --cool: #00000080;
    --modal: #242424;
    --done: #002500;
    /* Tooltip */
    --tooltip-text-color: gray;
    --tooltip-background-color: #00000080;
    --progress-done: #01bf01;
  }
  div.light {
    --text-color: black;
    --text-secondary-color: #4d4d4d;
    --bg-color: white;
    --bg-color-secondary: lightgray;
    --bg-color-tertiary: #b4cdf0;
    --bg-color-tertiary-light: #57637557;
    --box-shadow: #00000080;
    --box-shadow-light: #0000001a;
    --box-shadow-dark: #00000040;
    --nav-bg-color: transparent;
    --link-color: gray;
    --nav-background-color: white;
    --gray-color: #e7e7e7;
    --bg-modal: #adadad4d;
    --cool: #ffffff90;
    --modal: #ffffff;
    --done: #8ed88e;
    /* Tooltip */
    --tooltip-text-color: black;
    --tooltip-background-color: #00000080;
    --progress-done: #01bf01;
  }
`;

export default colors;
