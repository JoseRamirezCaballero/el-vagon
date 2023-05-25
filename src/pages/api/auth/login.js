/* eslint-disable camelcase */
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { connectToDatabase } from '@/utils/database'
import { TablaEstudiante } from '@/models/estudiante.model'
import { TablaAdministrador } from '@/models/administrador.model'
import { TablaResponsable } from '@/models/responsable.model'

export default async function generateToken (req, res) {
  await connectToDatabase()

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' })
  }

  try {
    const { numero_control, password } = req.body
    const models = [
      { model: TablaAdministrador, properties: ['idAdministrador', 'numero_control', 'idRol'] },
      { model: TablaResponsable, properties: ['idResponsable', 'numero_control', 'idRol'] },
      {
        model: TablaEstudiante,
        properties: [
          'idEstudiante',
          'numero_control',
          'nombres',
          'apellidos',
          'carrera',
          'genero',
          'correo_institucional',
          'idRol'
        ]
      }
    ]
    const userToken = {}

    for (const { model, properties } of models) {
      const user = await model.validateCredentials(numero_control, password)
      if (user) {
        for (const prop of properties) {
          userToken[prop] = user[prop]
        }
        break
      }
    }

    if (Object.keys(userToken).length > 0) {
      const token = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: '24h' })
      const cookieSerialized = cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/'
      })
      res.setHeader('Set-Cookie', cookieSerialized)
      return res.status(200).json('Credenciales válidas')
    }

    res.status(401).json({ message: 'Credenciales inválidas' })
  } catch (error) {
    res.status(401).json({ message: 'Credenciales inválidas' })
  }
}
