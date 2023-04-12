import { verify } from 'jsonwebtoken'
export default async function profileHandler (req, res) {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ error: 'No Token' })
  }
  try {
    const estudiante = verify(token, process.env.JWT_SECRET)
    return res.json({
      idEstudiante: estudiante.idEstudiante,
      numero_control: estudiante.numero_control,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      carrera: estudiante.carrera,
      genero: estudiante.genero,
      correo_institucional: estudiante.correo_institucional,
      rol: estudiante.rol
    })
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' })
  }
}
