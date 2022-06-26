import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { ForIonicBase7Poff } from './types/ForIonicBase7Poff';

const requestBodyScheme = z.object({
  nextCode: z.string().optional(),
  maxLength: z.number().nonnegative(),
});

export type ForIonicBase7PoffRequestBody = z.infer<typeof requestBodyScheme>;

export type ForIonicBase7PoffResponseBody = {
  data: ForIonicBase7Poff[];
  nextCode?: string;
};

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ForIonicBase7PoffResponseBody>
) {
  if (req.method === 'POST') {
    const { maxLength, nextCode } = requestBodyScheme.parse(req.body);
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

    if (nextCode) {
      const startIndex = r.data.findIndex((v) => v.code === nextCode);
      const data = r.data.slice(startIndex, startIndex + maxLength);
      const responseNextCode = r.data.at(startIndex + data.length)?.code;
      res.status(200).json({
        data,
        nextCode: responseNextCode,
      });
      return;
    }

    const data = r.data.slice(0, maxLength);
    const responseNextCode = r.data.at(maxLength)?.code;
    res.status(200).json({
      data,
      nextCode: responseNextCode,
    });
    return;
  }
  res.status(405).end();
}
