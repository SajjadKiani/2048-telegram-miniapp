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
        res.status(404).json([]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { score } = req.body;

    if (score !== undefined) {
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
          // Update daily score
          const today = new Date();
          today.setHours(0, 0, 0, 0); // set to start of the day

          const dailyScore = await prisma.dailyScore.findUnique({
            where: {
              userId_date: {
                userId: parseInt(id),
                date: today,
              },
            },
          });

          if (dailyScore) {
            // Update the score for today
            const updatedDailyScore = await prisma.dailyScore.update({
              where: {
                id: dailyScore.id,
              },
              data: {
                score: parseInt(score),
              },
            });

            res.status(200).json(updatedDailyScore);
          } else {
            // Create a new daily score
            const newDailyScore = await prisma.dailyScore.create({
              data: {
                userId: parseInt(id),
                date: today,
                score: parseInt(score),
              },
            });

            res.status(200).json(newDailyScore);
          }
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(400).json({ error: 'Score is required' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });
      console.log(id);
      res.status(200).json({ message: 'User deleted!' });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: 'User not found!' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
