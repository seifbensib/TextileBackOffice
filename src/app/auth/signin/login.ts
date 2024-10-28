// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Send the login request to your backend
      const response = await fetch('http://localhost:3020/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const { token } = await response.json();

      // Set the token in an HTTP-only cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        })
      );
      sessionStorage.setItem("token",token);
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
