import { connectToDatabase } from '@/utils/database'
import { TablaActividad } from '@/models/actividad.model'
import { TablaResponsable } from '@/models/responsable.model'
import { TablaAdministrador } from '@/models/administrador.model'
import { TablaRol } from '@/models/rol.model'
import { TablaInscripcion } from '@/models/inscripcion.model'
import { TablaEstudiante } from '@/models/estudiante.model'

export default async function connection (req, res) {
  await connectToDatabase()
  if (req.method === 'GET') {
    try {
      await TablaActividad.findByPk(1)
      await TablaResponsable.findByPk(1)
      await TablaInscripcion.findByPk(1)
      await TablaEstudiante.findByPk(1)
      await TablaAdministrador.findOrCreate({
        where: { idAdministrador: 1 },
        defaults: {
          idRol: 2,
          numero_control: 'ADMIN',
          password: 'admin'
        }
      })
      await TablaRol.findOrCreate({
        where: { idRol: 1 },
        defaults: {
          rol: 'estudiante'
        }
      })
      await TablaRol.findOrCreate({
        where: { idRol: 2 },
        defaults: {
          rol: 'admin'
        }
      })
      res.status(200).json({ message: 'Sucess' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error' })
    }
  }
}
