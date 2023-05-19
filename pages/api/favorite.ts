import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';

import prismadb from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { trailerId } = req.body;

      const existingMovie = await prismadb.trailer.findUnique({
        where: {
          id: trailerId
        }
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || ''
        },
        data: {
          favoriteIds: {
            push: trailerId
          }
        }
      });

      return res.status(200).json(user);
    }

    if (req.method === 'DELETE') {
      console.log(req.query);
      const { currentUser } = await serverAuth(req, res);
      const trailerId = req.query.trailerId as string;
      const existingMovie = await prismadb.trailer.findUnique({
        where: {
          id: trailerId
        }
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, trailerId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || ''
        },
        data: {
          favoriteIds: updatedFavoriteIds
        }
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
