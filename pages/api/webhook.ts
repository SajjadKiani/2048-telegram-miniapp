import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { fetchUser } from '@/lib';

type ResponseData = {
  message: string
}

const botUrl = process.env.TELEGRAM_BOT_LINK

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

    if (message && message.text) {
      const chatId = message.chat.id;
      const userId = message.from.id;
      const text = message.text.toLowerCase();
      let referral = ''

      fetchUser('617600289')
        .then(res => {
          referral = res.data.referralId
        })
        .catch(err => {
          console.log(err);
        })

      let responseText;

      if (text === '/start') {
        responseText = 'Hello! Welcome to 2048, enter the game, its Beta version';
      } else if (text === '/referral') {
        responseText = 'your referral link: ' + botUrl + '?startapp=' + referral
      } else {
        responseText = `just use commands: /start`;
      }

      const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
      const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

      await axios.post(TELEGRAM_API_URL, {
        chat_id: chatId,
        text: responseText,
        reply_markup: keyboard,
        photo_url: 'https://github.com/SajjadKiani/2048-telegram-miniapp/blob/master/.docs/pic.png?raw=true'
      });
    }

    res.status(200).json({message: 'OK'});
  } else {
    res.status(405).json({message: 'Method Not Allowed'});
  }
}