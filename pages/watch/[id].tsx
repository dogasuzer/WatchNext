import React from 'react';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading } = useMovie(id);
  const videoUrl = data?.videoUrl;
  const goBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className=" h-screen">
        <button className=" mx-10 my-10 fixed text-white " onClick={goBack}>
          <AiOutlineArrowLeft className="text-3xl" />
        </button>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 text-xl">Loading... </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" h-screen">
        <button className=" mx-10 my-10 fixed text-white " onClick={goBack}>
          <AiOutlineArrowLeft className="text-3xl" />
        </button>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 text-xl">
            Cant find the trailer, try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className=" h-screen">
        <button className=" mx-10 my-10 fixed text-white " onClick={goBack}>
          <AiOutlineArrowLeft className="text-3xl" />
        </button>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 text-xl">
            Cant find the trailer, try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" h-screen">
      <div className="bg-black w-full bg-opacity-20 z-50 lg:text-3xl px-10 py-10 flex absolute text-white ">
        <button className="mr-20" onClick={goBack}>
          <AiOutlineArrowLeft />
        </button>
        <p className=" text-center">{data?.title}</p>
      </div>

      <div className="flex justify-center z-0 items-center h-screen">
        {videoUrl && (
          <ReactPlayer url={videoUrl} controls width="90%" height="auto" />
        )}
      </div>
    </div>
  );
};

export default Watch;
