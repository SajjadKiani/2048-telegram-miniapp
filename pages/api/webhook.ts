import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type ResponseData = {
  message: string
}
 
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.text) {
      const chatId = message.chat.id;
      const text = message.text.toLowerCase();

      let responseText;

      if (text === '/start') {
        responseText = 'Hello! Welcome to 2048, enter the game: /run';
      } else if (text === '/run') {
          responseText = 'https://t.me/twentygamebot/game2048';
      } else {
        responseText = `just use commands: /start /run`;
      }

      const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
      const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

      await axios.post(TELEGRAM_API_URL, {
        chat_id: chatId,
        text: responseText,
      });
    }

    res.status(200).json({message: 'OK'});
  } else {
    res.status(405).json({message: 'Method Not Allowed'});
  }
}