export const formatTime = (timeSpan) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;

  let minutes = Math.floor((timeSpan % hour) / minute);
  let seconds = Math.floor((timeSpan % minute) / second);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes} :  ${seconds}`;
};
