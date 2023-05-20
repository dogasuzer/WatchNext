import React from 'react';
interface WatchNowButtonProps {
  trailerName: string;
}

const WatchNowButton: React.FC<WatchNowButtonProps> = ({ trailerName }) => {
  const handleButtonClick = () => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      trailerName
    )}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleButtonClick}
      className="
        bg-white
        rounded-md
        py-1 md:py-2
        px-2 md:px-4
        w-auto
        text-xs lg:text-lg 
        font-semibold
        flex
        flex-row
        items-center
        hover:bg-neutral-300
        transition
        "
    >
      Watch Now
    </button>
  );
};

export default WatchNowButton;
