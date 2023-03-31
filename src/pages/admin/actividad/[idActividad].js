import { useRouter } from 'next/router'

export default function Actividad () {
  const router = useRouter()
  const { idActividad } = router.query

  return (
    <div>
      <h1>Actividad {idActividad}</h1>
      <p>Aquí está la información de la actividad {idActividad}.</p>
    </div>
  )
}
