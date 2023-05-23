import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { FaChevronDown } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';

import { MovieInterface } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';

interface MovieCardProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();

  const handleOpenModal = useCallback(() => {
    openModal(data.id);
  }, [openModal, data.id]);

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${data.id}`),
    [router, data.id]
  );

  return (
    <div className="group bg-zinc-900 my-2 mx-2 col-span relative h:30">
      <img
        onClick={redirectToWatch}
        src={data.thumbnailUrl}
        alt="Movie"
        draggable={false}
        className="
        cursor-pointer
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
        object-cover 
        h-full
        aspect-[5/3]
      "
      />
      {/* <div className="md:hidden absolute bottom-0 pl-4 pb-2 bg-zinc-800 bg-opacity-30 w-full text-white">
        {data.title}
      </div> */}
      <div
        className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        delay-300
        w-full
        scale-0
        group-hover:scale-100
        sm:group-hover:scale-110
        sm:group-hover:-translate-y-[6vw]
        sm:group-hover:translate-x-[2vw]
        group-hover:opacity-100
      "
      >
        <img
          onClick={redirectToWatch}
          src={data.thumbnailUrl}
          alt="Movie"
          draggable={false}
          className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
        "
        />
        <div
          className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          h-20
          sm:h-auto
          "
        >
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="text-white">{data.title}</div>
            <div className="flex flex-row items-center gap-2">
              <div
                onClick={redirectToWatch}
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              >
                <FaPlay className="text-black w-3 lg:w-6" />
              </div>
              <FavoriteButton trailerId={data.id} />
              <div
                onClick={handleOpenModal}
                className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
              >
                <FaChevronDown className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
              </div>
            </div>
          </div>
          <p className="invisible sm:visible text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="invisible sm:visible flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="invisible sm:visible flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
