import useSwr from 'swr';
import fetcher from '@/libs/fetcher';

const useFindMovies = (term?: string) => {
  const { data, error, isLoading } = useSwr('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const filteredMovies = data?.filter((movie: any) =>
    movie.title.toLowerCase().includes(term?.toLowerCase() || '')
  );

  return {
    data: filteredMovies,
    error,
    isLoading
  };
};

export default useFindMovies;
