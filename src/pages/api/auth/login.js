/* eslint-disable camelcase */
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { connectToDatabase } from '@/utils/database'
import { TablaEstudiante } from '@/models/estudiante.model'
import { TablaAdministrador } from '@/models/administrador.model'

export default async function generateToken (req, res) {
  await connectToDatabase()
  if (req.method === 'POST') {
    try {
      const { numero_control, password } = req.body
      const administrador = await TablaAdministrador.validateCredentials(numero_control, password)
      const estudiante = await TablaEstudiante.validateCredentials(numero_control, password)

      const isEstudiante = estudiante != null

      const tokenUser = isEstudiante
        ? {
            idEstudiante: estudiante.idEstudiante,
            numero_control: estudiante.numero_control,
            nombres: estudiante.nombres,
            apellidos: estudiante.apellidos,
            carrera: estudiante.carrera,
            genero: estudiante.genero,
            correo_institucional: estudiante.correo_institucional,
            idRol: estudiante.idRol
          }
        : {
            idAdministrador: administrador.idAdministrador,
            numero_control: administrador.numero_control,
            idRol: administrador.idRol
          }
      const token = jwt.sign(tokenUser, process.env.JWT_SECRET, { expiresIn: '2h' })
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
