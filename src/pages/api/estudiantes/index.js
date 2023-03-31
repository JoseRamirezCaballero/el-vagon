import { connectToDatabase } from '@/utils/database'
import { TablaEstudiante } from '@/models/estudiante.model'

export default async function estudiantes (req, res) {
  await connectToDatabase()

  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaEstudiante.findAll({ raw: true })
        res.status(200).json(records)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener los estudiantes.' })
      }
      break
    case 'POST':
      try {
        const estudiante = await TablaEstudiante.create(req.body)
        res.status(201).json(estudiante)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear el estudiante.' })
      }
      break
    case 'PUT':
      try {
        const estudiante = await TablaEstudiante.findByPk(req.body.idEstudiante)
        await estudiante.update(req.body)
        res.status(200).json(estudiante)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al actualizar el estudiante.' })
      }
      break
    case 'DELETE':
      try {
        const estudiante = await TablaEstudiante.findByPk(req.body.idEstudiante)
        await estudiante.destroy()
        res.status(200).json({ message: 'Estudiante eliminado exitosamente.' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar el estudiante.' })
      }
      break
    default:
      res.status(405).json({ message: 'Método no permitido.' })
  }
}
