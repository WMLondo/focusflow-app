export const formatTime = (currentTimerValue) => {
  const currentTime = new Date(currentTimerValue);
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${minutes} : ${seconds}`;
};
