import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { fetchUser } from '@/lib';

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

    if (message && message.text) {
      const chatId = message.chat.id;
      const userId = message.from.id;
      const text = message.text.toLowerCase();
      let referral = ''
      let score = 0
      
      try {
        const response = await axios.get(baseUrl + '/api/users/get/' + userId)
        referral = response.data.referralId
        score = response.data.score
        console.log(response.data);
        
      } catch {}

      let responseText;

      if (text === '/start') {
        responseText = `Hello! 
                        Play 2048. Merge tiles. Get Rewards. The more tiles you merge, the more Rewards you get.
                        
                        Hurry up!`;
      } else if (text === '/referral') {
        responseText = `Hi My Friend!
                        lets play 2048

                        my score: ${score}
                        my referral link:   
                        ${botUrl}?startapp=${referral}`
      } else {
        responseText = `just use commands: /start`;
      }

      const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
      const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

      await axios.post(TELEGRAM_API_URL, {
        chat_id: chatId,
        text: responseText,
        reply_markup: text === '/start' && keyboard,
        photo_url: 'https://github.com/SajjadKiani/2048-telegram-miniapp/blob/master/.docs/pic.png?raw=true'
      });
    }

    res.status(200).json({message: 'OK'});
  } else {
    res.status(405).json({message: 'Method Not Allowed'});
  }
}