import { TablaResponsable } from '@/models/responsable.model'

export default async function idResponsable (req, res) {
  const { query } = req
  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaResponsable.findByPk(query.id)
        res.status(200).json(records)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener al Responsable.' })
      }
      break
    default:
      res.status(405).json({ message: 'Método no permitido.' })
  }
}
