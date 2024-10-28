// pages/api/protected.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authToken } = cookie.parse(req.headers.cookie || '');

  if (!authToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // Continue with verifying or decoding the token as needed
  return res.status(200).json({ message: 'Authenticated access', authToken });
}
