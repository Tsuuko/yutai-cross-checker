// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ForIonicBase7Poff } from './types/ForIonicBase7Poff';

type Data = {
  name: string;
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
  res.status(200).json({ name: 'John Doe' });
}
