import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        include: {
          referrals: true,
        },
      });

      const usersWithReferralCount = users.map(user => ({
        ...user,
        referralCount: user.referrals.length,
      }));

      const sortedUsers = usersWithReferralCount.sort((a, b) => b.referralCount - a.referralCount);

      const topReferrers = sortedUsers.slice(0, 3);

      res.status(200).json(topReferrers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
