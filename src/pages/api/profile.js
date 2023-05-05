import { verify } from 'jsonwebtoken'
export default async function profileHandler (req, res) {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ error: 'No Token' })
  }
  try {
    const user = verify(token, process.env.JWT_SECRET)

    if (user.idRol === 1) {
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

    if (user.idRol === 2) {
      return res.json({
        numero_control: user.numero_control,
        idRol: user.idRol
      })
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' })
  }
}
