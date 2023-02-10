import css from 'styled-jsx/css';

const colors = css.global`
  div.dark {
    --textColor: white;
    --bgColor: black;
    --box-shadow: #f5f5f552;
    --box-shadow-light: #f5f5f522;
    --navBgColor: #00000080;
    --link-color: gray;
    --nav-background-color: black;
  }
  div.light {
    --textColor: black;
    --bgColor: #ffffff;
    --box-shadow: #00000080;
    --box-shadow-light: #00000030;
    --navBgColor: transparent;
    --link-color: gray;
    --nav-background-color: white;
  }
`;

export default colors;
