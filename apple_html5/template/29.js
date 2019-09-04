// doubleKill.mjs
// const 和 default功能演示
export default () => {
  const elements = document.querySelectorAll ('button');
  elements.forEach (el => {
    el.style.background = '#4E73FF';
  });
};
export const pColor = color => {
  const elements = document.querySelectorAll ('button');
  elements.forEach (el => {
    el.style.background = color;
  });
};
