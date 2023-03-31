import { connectToDatabase } from '@/utils/database'
import { TablaResponsable } from '@/models/responsable.model'

export default async function responsables (req, res) {
  await connectToDatabase()

  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaResponsable.findAll({ raw: true })
        res.status(200).json(records)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener Responsables.' })
      }
      break
    case 'POST':
      try {
        const responsable = await TablaResponsable.create(req.body)
        res.status(201).json(responsable)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear Responsable.' })
      }
      break
    case 'PUT':
      try {
        const responsable = await TablaResponsable.findByPk(req.body.idResponsable)
        await responsable.update(req.body)
        res.status(200).json(responsable)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al actualizar Responsable.' })
      }
      break
    case 'DELETE':
      try {
        const responsable = await TablaResponsable.findByPk(req.body.idResponsable)
        await responsable.destroy()
        res.status(200).json({ message: 'Responsable eliminada exitosamente.' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar Responsable.' })
      }
      break
    default:
      res.status(405).json({ message: 'Método no permitido.' })
  }
}
