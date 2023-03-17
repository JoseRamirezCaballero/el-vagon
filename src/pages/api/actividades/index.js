import { connectToDatabase } from '../../../utils/database'
import { TablaActividad } from '../../../models/actividad.model'

export default async function actividades (req, res) {
  await connectToDatabase()
  // const { method } = req

  // switch (method) {
  //   case 'GET':
  //     return res.status(200).json({ name: 'GET' })
  //   case 'POST':
  //     return res.status(200).json('post')
  //   case 'PUT':
  //     return res.status(200).json('put')
  //   case 'DELETE':
  //     return res.status(200).json('elete')
  //   default:
  //     return res.status(400).json('nel')
  // }

  // temporal para ver la data
  try {
    const records = await TablaActividad.findAll({ raw: true })
    res.status(201).json(records)
  } catch (error) {
    return res.status(400).json('error')
  }
}
