import { connectToDatabase } from '../../../utils/database'
import { TablaActividad } from '../../../models/actividad.model'
import { TablaResponsable } from '@/models/responsable.model'

export default async function actividades (req, res) {
  await connectToDatabase()

  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaActividad.findAll({ raw: true, include: [TablaResponsable] })
        console.log(records)
        res.status(200).json(records)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener las actividades.' })
      }
      break
    case 'POST':
      try {
        const actividad = await TablaActividad.create(req.body)
        res.status(201).json(actividad)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear la actividad.' })
      }
      break
    case 'PUT':
      try {
        const actividad = await TablaActividad.findByPk(req.body.idActividad)
        await actividad.update(req.body)
        res.status(200).json(actividad)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al actualizar la actividad.' })
      }
      break
    case 'DELETE':
      try {
        const actividad = await TablaActividad.findByPk(req.body.idActividad)
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
