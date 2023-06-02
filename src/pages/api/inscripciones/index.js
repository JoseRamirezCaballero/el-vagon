import { TablaInscripcion } from '@/models/inscripcion.model'
import { TablaActividad } from '@/models/actividad.model'
import { TablaEstudiante } from '@/models/estudiante.model'

export default async function inscripciones (req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaInscripcion.findAll({ raw: true, include: [TablaActividad, TablaEstudiante] })
        res.status(200).json(records)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener las inscripciones.' })
      }
      break
    case 'POST':
      try {
        const inscripcion = await TablaInscripcion.create(req.body)
        res.status(201).json(inscripcion)
      } catch (error) {
        res.status(500).json({ message: 'Error al crear la inscripcion.' })
      }
      break
    case 'DELETE':
      try {
        const inscripcion = await TablaInscripcion.findByPk(req.body.idInscripcion)
        await inscripcion.destroy()
        res.status(200).json({ message: 'Inscripcion eliminada exitosamente.' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar la inscripcion.' })
      }
      break
    default:
      res.status(405).json({ message: 'Método no permitido.' })
  }
}
