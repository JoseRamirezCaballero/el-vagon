import { connectToDatabase } from '@/utils/database'
import { TablaRol } from '@/models/rol.model'

export default async function roles (req, res) {
  await connectToDatabase()

  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaRol.findAll({ raw: true })
        res.status(200).json(records)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener los roles.' })
      }
      break
    case 'POST':
      try {
        const rol = await TablaRol.create(req.body)
        res.status(201).json(rol)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear el Rol.' })
      }
      break
    case 'PUT':
      try {
        const rol = await TablaRol.findByPk(req.body.idRol)
        await rol.update(req.body)
        res.status(200).json(rol)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al actualizar el Rol.' })
      }
      break
    case 'DELETE':
      try {
        const rol = await TablaRol.findByPk(req.body.idRol)
        await rol.destroy()
        res.status(200).json({ message: 'rol eliminado exitosamente.' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar el Rol.' })
      }
      break
    default:
      res.status(405).json({ message: 'Método no permitido.' })
  }
}
