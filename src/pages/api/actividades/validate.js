import { TablaActividad } from '@/models/actividad.model'

export default async function validateActivity (req, res) {
  const { lugar, horario } = req.body

  try {
    const horarioPrefix = horario.substring(0, 2)
    const existsActivity = await TablaActividad.validateActividad(lugar, horarioPrefix)

    if (existsActivity) {
      res.status(400).json({ error: 'La actividad ya existe.' })
    } else {
      res.status(200).json({ message: 'La actividad no existe.' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en la validación de la actividad.' })
  }
}
