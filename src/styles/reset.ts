import css from "styled-jsx/css";

const style = css.global`
  * {
    scrollbar-width: thin;
    scrollbar-color: rgb(61, 61, 61) rgba(164, 164, 164, 0.402);
  }

  *::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  *::-webkit-scrollbar-track {
    background: #000000;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgb(61, 61, 61);
  }
`;

export default style;
