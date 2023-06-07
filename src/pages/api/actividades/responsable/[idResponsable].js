import { TablaActividad } from '@/models/actividad.model'

export default async function idResponsable (req, res) {
  const { query } = req
  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaActividad.findAll({
          where: { idResponsable: query.idResponsable }
        })
        if (!records) {
          res.status(404).json({ message: 'No existen actividades con el id del Responsable.' })
        }
        res.status(200).json(records)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener las actividades.' })
      }
      break
    default:
      res.status(405).json({ message: 'Método no permitido.' })
  }
}
