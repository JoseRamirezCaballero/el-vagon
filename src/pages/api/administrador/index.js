import { connectToDatabase } from '@/utils/database'
import { TablaAdministrador } from '@/models/administrador.model'

export default async function administradores (req, res) {
  await connectToDatabase()

  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaAdministrador.findAll({ raw: true })
        res.status(200).json(records)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener los Administradores.' })
      }
      break
    default:
      res.status(405).json({ message: 'Método no permitido.' })
  }
}
