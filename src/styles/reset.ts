import css from "styled-jsx/css";

const style = css.global`
  *,
  *::before,
  *::after,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgb(61, 61, 61) rgba(164, 164, 164, 0.402);
  }

  *::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  *::-webkit-scrollbar-track {
    background: rgb(95, 95, 95);
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgb(61, 61, 61);
    border-radius: 5px;
  }
`;

export default style;
