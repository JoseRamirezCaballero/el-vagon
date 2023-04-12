/* eslint-disable camelcase */
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { TablaEstudiante } from '@/models/estudiante.model'

export default async function generateToken (req, res) {
  if (req.method === 'POST') {
    try {
      const { numero_control, password } = req.body
      const estudiante = await TablaEstudiante.validateCredentials(numero_control, password)
      const token = jwt.sign({
        idEstudiante: estudiante.idEstudiante,
        numero_control: estudiante.numero_control,
        nombres: estudiante.nombres,
        apellidos: estudiante.apellidos,
        carrera: estudiante.carrera,
        genero: estudiante.genero,
        correo_institucional: estudiante.correo_institucional,
        rol: estudiante.rol
      }, process.env.JWT_SECRET, { expiresIn: '1h' })
      const cookieSerialized = cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/'
      })
      res.setHeader('Set-Cookie', cookieSerialized)
      res.status(200).json('Credenciales validas')
    } catch (error) {
      res.status(401).json({ message: 'Credenciales inválidas' })
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
