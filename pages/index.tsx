import React, { useEffect, useRef } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useScrollStore from '@/hooks/useScrollStore';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();
  const { scrollDestination } = useScrollStore();
  const trendingRef = useRef<HTMLDivElement | null>(null);
  const myListRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        window.scrollTo({
          top: ref.current.offsetTop,
          behavior: 'smooth'
        });
      }
    };

    if (scrollDestination === 'newPopular') {
      scrollToSection(trendingRef);
    } else if (scrollDestination === 'myList') {
      scrollToSection(myListRef);
    } else if (scrollDestination === 'home') {
      scrollToSection(homeRef);
    }
  }, [scrollDestination]);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <div ref={homeRef}>
        <Billboard />
      </div>

      <div className="pb-40 pt-20">
        <div ref={trendingRef}>
          <MovieList title="Trending Now" data={movies} />
        </div>
        <div ref={myListRef}>
          <MovieList title="My List" data={favorites} />
        </div>
      </div>
    </>
  );
};

export default Home;
