import { useEffect, useState } from "react";

/**
 * Custom Hook that computes the chess board dimensions no matter
 * what the browser height is.
 *
 * @param {*} diff
 * @returns
 */
function useBoardSize(diff) {
  const [width, setWidth] = useState(getWindowHeight(diff));
  useEffect(() => {
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  const resizeEvent = () => {
    setWidth(getWindowHeight(diff));
  };

  function getWindowHeight(diff) {
    return window.innerHeight - diff;
  }

  return width;
}

export default useBoardSize;
