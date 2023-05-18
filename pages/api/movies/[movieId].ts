import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);
    const trailerId = req.query.movieId;

    if (typeof trailerId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!trailerId) {
      throw new Error('Missing Id');
    }

    const trailer = await prismadb.trailer.findUnique({
      where: {
        id: trailerId
      }
    });

    return res.status(200).json(trailer);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
