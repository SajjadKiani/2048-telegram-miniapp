import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, telegramId, telegramUsername, referredBy } = req.body;

    // Generate a unique referral link
    const referralId = nanoid(10);

    // Find the user who referred
    const referrer = referredBy ? await prisma.user.findUnique({
      where: { referralId: `${referredBy}` }
    }) : null;

    console.log(referrer);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        telegramId,
        telegramUsername,
        referralId,
        referredById: referrer ? referrer.id : null
      }
    });

    res.status(200).json(newUser);
  } else if (req.method === 'GET') {
    const users = await prisma.user.findMany({
      include: {
        referrals: true,
        referredBy: true
      }
    });

    res.status(200).json(users.sort((a, b) => b.score - a.score));
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
