import { useState, useEffect } from "react";
import Image from "next/image";

const WinningPatternNotice = ({ winningPatterns }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(
          (prevIndex) => (prevIndex + 1) % (winningPatterns?.length || 0)
        );
        setFade(true);
      }, 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Image
      className={`rounded-xl transition-opacity duration-500 w-[16vw] xl:w-[13vw] 2xl:w-[14vw]`}
      src={`/patterns/bingo_winning_pattern_${winningPatterns[index]}.svg`}
      width={0} // Required but unused
      height={0} // Requ
      alt="winning_pattern"
    />
  );
};

export default WinningPatternNotice;
