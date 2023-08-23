import { useRef } from "react";

const useAudio = (src) => {
  const audio = useRef(new Audio(src));

  audio.current.playbackRate = 1;
  audio.current.volume = 1;
  audio.current.autoplay = false;

  return audio.current;
};

export default useAudio;
