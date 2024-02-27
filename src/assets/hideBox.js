const hideBox = (event) => {
  const { clientX, clientY } = event;
  const { left, right, top, bottom } =
    event.currentTarget.getBoundingClientRect();
  if (clientX < left || clientX > right || clientY < top || clientY > bottom)
    event.currentTarget.close();
};
export default hideBox;
