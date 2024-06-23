import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          telegramId: id,
        },
        include: {
          referrals: true,
          referredBy: true,
        },
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === "POST" ) {
    
    const {score} = req.body;

    if (score)
        try {
            const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                referrals: true,
                referredBy: true,
            },
            });
    
            if (user) {
                const updatedUser = await prisma.user.update({
                    where: {
                      id: parseInt(id),
                    },
                    data: {
                      score: {
                        increment: parseInt(score), // Increment the score by 1
                      },
                    },
                    include: {
                      referrals: true,
                      referredBy: true,
                    },
                  });
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
