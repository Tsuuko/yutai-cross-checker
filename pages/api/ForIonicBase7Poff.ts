import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ForIonicBase7Poff } from './types/ForIonicBase7Poff';

type Data = ForIonicBase7Poff[];

export const config = {
  api: {
    responseLimit: false,
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const r = await axios.post<ForIonicBase7Poff[]>(
    'https://gokigen-life.tokyo/api/00ForWeb/ForIonicBase7Poff.php',
    undefined,
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
