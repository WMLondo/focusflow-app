import { useState, useEffect } from "react";

const useDocumentVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const visibilityHandler = () => {
      if (!document.hidden) {
        setIsVisible(true);
      } else setIsVisible(false);

      document.addEventListener("visibilitychange", visibilityHandler);

      return () => {
        document.removeEventListener("visibilitychange", visibilityHandler);
      };
    };
  }, [isVisible]);

  return isVisible;
};

export default useDocumentVisibility;
