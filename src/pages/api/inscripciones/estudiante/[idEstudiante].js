import { TablaInscripcion } from '@/models/inscripcion.model'
import { TablaActividad } from '@/models/actividad.model'

export default async function idEstudiante (req, res) {
  const { query } = req
  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaInscripcion.findAll({
          where: { idEstudiante: query.idEstudiante },
          include: [TablaActividad]
        })
        if (!records) {
          res.status(404).json({ message: 'No existen inscripciones con el id del estudiante.' })
        }
        res.status(200).json(records)
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener la inscripcion.' })
      }
      break
    default:
      res.status(405).json({ message: 'Método no permitido.' })
  }
}
