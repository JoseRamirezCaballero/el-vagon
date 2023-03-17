export default function id (req, res) {
//   const { query } = req
  console.log(req.query)

  const { method } = req

  switch (method) {
    case 'GET':
      return res.status(200).json('Obtener una unica actividad')
    case 'POST':
      return res.status(200).json('Agregando una unica actividad')
    case 'PUT':
      return res.status(200).json('Actualizando una unica actividad')
    case 'DELETE':
      return res.status(200).json('Borrando una unica actividad')
    default:
      return res.status(400).json('Invalid method')
  }
}
