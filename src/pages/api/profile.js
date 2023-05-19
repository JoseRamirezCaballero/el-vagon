import { verify } from 'jsonwebtoken'
import { ROLES } from '@/utils/constants'
export default async function profileHandler (req, res) {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ error: 'No Token' })
  }
  try {
    const user = verify(token, process.env.JWT_SECRET)
    if (user.idRol === ROLES.ESTUDIANTE) {
      return res.json({
        idEstudiante: user.idEstudiante,
        numero_control: user.numero_control,
        nombres: user.nombres,
        apellidos: user.apellidos,
        carrera: user.carrera,
        genero: user.genero,
        correo_institucional: user.correo_institucional,
        idRol: user.idRol
      })
    }

    if (user.idRol === ROLES.ADMINISTRADOR) {
      return res.json({
        idAdministrador: user.idAdministrador,
        numero_control: user.numero_control,
        idRol: user.idRol
      })
    }

    if (user.idRol === ROLES.RESPONSABLE) {
      return res.json({
        idResponsable: user.idResponsable,
        nombres: user.nombres,
        apellidos: user.apellidos,
        numero_control: user.numero_control,
        idRol: user.idRol
      })
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' })
  }
}
