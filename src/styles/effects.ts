import css from 'styled-jsx/css';

const effects = css.global`
@keyframes appear {
  from {
    transform: opacity: 0;
  }
  to {
    opacity: 1
  }
}
`;

export default effects;
