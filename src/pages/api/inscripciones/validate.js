import { TablaInscripcion } from '@/models/inscripcion.model'

export default async function validateInscription (req, res) {
  const { idEstudiante, periodo } = req.body

  try {
    const existsInscripcion = await TablaInscripcion.validateInscripcion(idEstudiante, periodo)

    if (existsInscripcion) {
      res.status(400).json({ error: 'La inscripcion ya existe.' })
    } else {
      res.status(200).json({ message: 'La inscripcion no existe.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en la validación de la inscripcion.' })
  }
}
