import axios from 'axios';
import React, { useCallback, useMemo } from 'react';

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  trailerId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ trailerId }) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(trailerId);
  }, [currentUser, trailerId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete('/api/favorite', {
        params: { trailerId: trailerId }
      });
    } else {
      response = await axios.post('/api/favorite', { trailerId });
    }
    const updatedFavoriteIds = response?.data?.favoriteIds;
    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds
    });

    mutateFavorites();
  }, [trailerId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineMinus : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
