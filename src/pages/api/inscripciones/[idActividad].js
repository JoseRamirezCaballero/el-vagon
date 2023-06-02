import { TablaInscripcion } from '@/models/inscripcion.model'

export default async function idActividad (req, res) {
  const { query } = req
  switch (req.method) {
    case 'GET':
      try {
        const records = await TablaInscripcion.findAll({
          where: { idActividad: query.idActividad }
        })
        if (!records) {
          res.status(404).json({ message: 'No existen inscripciones con el id de la actividad.' })
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
