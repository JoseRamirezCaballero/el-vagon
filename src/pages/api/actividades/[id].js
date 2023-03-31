import { TablaActividad } from '@/models/actividad.model'
import { TablaResponsable } from '@/models/responsable.model'

export default async function idActividad (req, res) {
  const { query } = req
  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaActividad.findByPk(query.id, { include: [TablaResponsable] })
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
    default:
      res.status(405).json({ message: 'Método no permitido.' })
  }
}
