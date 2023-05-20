import React from 'react';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import useFindMovies from '@/hooks/useFindMovie';
import MovieCard from '@/components/MovieCard';
import { MovieInterface } from '@/types';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';

const Search = () => {
  const { isOpen, closeModal } = useInfoModalStore();
  const router = useRouter();
  const id = router.query.term as string;
  const { data, error, isLoading } = useFindMovies(id);
  const goBack = () => {
    window.history.back();
  };

  if (error || !data || isLoading) {
    return (
      <div className=" h-screen">
        <button className=" mx-10 my-10 fixed text-white " onClick={goBack}>
          <AiOutlineArrowLeft className="text-3xl" />
        </button>
        <div className="flex justify-center items-center h-screen">
          {!isLoading ? (
            <p className="text-gray-500 text-xl">
              Cant find the trailer, search something else.
            </p>
          ) : (
            <p className="text-gray-500 text-xl">Loading...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className=" h-screen  ">
      <InfoModal visible={isOpen} onClose={closeModal} />
      <div className="bg-black w-full bg-opacity-20 z-50 lg:text-3xl px-10 py-10 flex absolute text-white ">
        <button className="mr-20" onClick={goBack}>
          <AiOutlineArrowLeft />
        </button>
        <p className=" text-center">{id}</p>
      </div>

      <div className=" flex items-center fixed inset-x-0 top-20 lg:top-40 px-6 sm:px-8 md:px-10 mt-4 space-y-8">
        <div className="grid grid-flow-row sm:grid-flow-col	md:grid-cols-3 xl:grid-cols-4 gap-2">
          {data.map((trailer: MovieInterface) => (
            <MovieCard key={trailer.id} data={trailer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
