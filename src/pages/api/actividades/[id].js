import { TablaActividad } from '@/models/actividad.model'
import { TablaResponsable } from '@/models/responsable.model'
import { TablaInscripcion } from '@/models/inscripcion.model'

export default async function idActividad (req, res) {
  const { query } = req
  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaActividad.findByPk(query.id, { include: [TablaResponsable] })
        if (!records) {
          res.status(404).json({ message: 'Activity not found' })
        }
        res.status(200).json(records)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener la actividad.' })
      }
      break
    case 'PUT':
      try {
        const actividad = await TablaActividad.findByPk(query.id)
        await actividad.update(req.body)
        res.status(200).json(actividad)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al actualizar la actividad.' })
      }
      break
    case 'DELETE':
      try {
        await TablaInscripcion.destroy({ where: { idActividad: query.id } })

        const actividad = await TablaActividad.findByPk(query.id)
        await actividad.destroy()

        res.status(200).json({ message: 'Actividad eliminada exitosamente.' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar la actividad.' })
      }
      break

    default:
      res.status(405).json({ message: 'Método no permitido.' })
  }
}
