import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ForIonicFukatsu } from './types/ForIonicFukatsu';

type Data = ForIonicFukatsu[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const r = await axios.post<ForIonicFukatsu[]>(
    'https://gokigen-life.tokyo/api/00ForWeb/ForIonicFukatsu.php',
    {
      code: '0000',
    },
    {
      headers: {
        Origin: 'ionic://localhost',
        'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
      },
    }
  );
  res.status(200).json(r.data);
  // res.status(200).json(ForIonicBase7Poff);
}
