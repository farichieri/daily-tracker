import css from "styled-jsx/css";

// A Modern CSS Reset
// https://hankchizljaw.com/wrote/a-modern-css-reset/
// slightly adapted

const style = css.global`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  a {
    -webkit-tap-highlight-color: transparent;
  }

  @media (any-hover: hover) {
    a:hover {
      -webkit-tap-highlight-color: transparent;
    }
  }

  /* Remove default padding */
  ul[class],
  ol[class] {
    padding: 0;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: 500;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    min-width: 280px;
  }

  html {
    background: black;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Scrollbar */
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
  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default style;
