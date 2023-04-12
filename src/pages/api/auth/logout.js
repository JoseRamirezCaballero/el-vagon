import { verify } from 'jsonwebtoken'
import { serialize } from 'cookie'
export default async function logoutHandler (req, res) {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ error: 'No Token' })
  }

  try {
    verify(token, process.env.JWT_SECRET)
    const cookieSerialized = serialize('token', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    })
    res.setHeader('Set-Cookie', cookieSerialized)
    res.status(200).json('Logout Sucessfully')
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' })
  }
}
