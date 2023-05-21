import React, { useCallback } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from '@/components/PlayButton';
import useBillboard from '@/hooks/useBillboard';
import useInfoModalStore from '@/hooks/useInfoModalStore';

const Billboard: React.FC = () => {
  const { openModal } = useInfoModalStore();

  const { data, isLoading, error } = useBillboard();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="relative  h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        className=" hidden object-fill w-full h-[56.25vw] md:flex object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
        src={data?.videoUrl}
      ></video>
      <img
        src={data?.thumbnailUrl}
        className=" md:hidden opacity-40 flex lg:hidden"
      />
      <div className="hidden md:block absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-4xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-6 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton trailerId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
          >
            <AiOutlineInfoCircle className="w-4 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div>
      <div className="md:hidden absolute top-[50%] w-full center-items">
        <p className="text-white text-center text-2xl h-full font-bold ">
          {data?.title}
        </p>
        <div className="flex w-full items-center justify-center mt-5 ">
          <PlayButton trailerId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 
              px-2
              text-xs 
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
              ml-5
            "
          >
            <AiOutlineInfoCircle className="w-4 md:w-7 mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
