import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ResponsableProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import TablaEstudiantesInscritos from '@/components/TablaEstudiantesInscritos'
import { ROLES, axiosAPI } from '@/utils/constants'

export default function InscripcionesID () {
  const router = useRouter()
  const { idActividad } = router.query
  const [actividades, setActividades] = useState([])
  const [actividad, setActividad] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actividadesReponsable = await axiosAPI.get(
          `/inscripciones/actividad/${idActividad}`
        )
        const name = await axiosAPI.get(`/actividades/${idActividad}`)
        setActividad(name.data)
        const actividadesData = actividadesReponsable.data
        setActividades(actividadesData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [idActividad])

  return (
    <ResponsableProtectedRoute rol={ROLES.RESPONSABLE}>
      <PageLayout rol={ROLES.RESPONSABLE}>
        <TablaEstudiantesInscritos actividades={actividades} actividad={actividad} />
      </PageLayout>
    </ResponsableProtectedRoute>
  )
}
