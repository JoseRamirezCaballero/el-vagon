import { verify } from 'jsonwebtoken'
import { ROLES } from '@/utils/constants'

const HTTP_STATUS_UNAUTHORIZED = 401

const getUserData = (user) => {
  switch (user.idRol) {
    case ROLES.ESTUDIANTE:
      return {
        idEstudiante: user.idEstudiante,
        numero_control: user.numero_control,
        nombres: user.nombres,
        apellidos: user.apellidos,
        carrera: user.carrera,
        genero: user.genero,
        correo_institucional: user.correo_institucional,
        idRol: user.idRol
      }
    case ROLES.ADMINISTRADOR:
      return {
        idAdministrador: user.idAdministrador,
        numero_control: user.numero_control,
        idRol: user.idRol
      }
    case ROLES.RESPONSABLE:
      return {
        idResponsable: user.idResponsable,
        abreviatura_cargo: user.abreviatura_cargo,
        nombres: user.nombres,
        apellidos: user.apellidos,
        numero_control: user.numero_control,
        idRol: user.idRol
      }
    default:
      throw new Error('Unknown role')
  }
}

export default async function profileHandler (req, res) {
  try {
    const { token } = req.cookies

    if (!token) {
      return res.status(HTTP_STATUS_UNAUTHORIZED).json({ error: 'No Token' })
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined')
    }

    const user = verify(token, process.env.JWT_SECRET)
    const userData = getUserData(user)
    return res.json(userData)
  } catch (error) {
    return res.status(HTTP_STATUS_UNAUTHORIZED).json({ error: error.message })
  }
}
