import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ResponseData = {
  message: string
}

const botUrl = process.env.TELEGRAM_BOT_LINK
const baseUrl = process.env.PUBLIC_URL

const keyboard = {
  inline_keyboard: [
    [
      { text: 'Play 2048', url: botUrl },
    ]
  ]
};
 
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  if (req.method === 'POST') {
    const { message } = req.body;

    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const users = await prisma.user.findMany()

    let successSendCount = 0

    for (const user of users) {
        try {
            await axios.post(TELEGRAM_API_URL, {
                chat_id: user.telegramId,
                text: message,
                reply_markup: keyboard,
              });
              successSendCount++;
        } catch {}
    }

    res.status(200).json({message: `${successSendCount}`})
  }

}