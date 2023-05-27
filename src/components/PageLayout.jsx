import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ROLES, ADMIN_ROUTES, STUDENT_ROUTES, RESPONSABLE_ROUTES } from '@/utils/constants'

export default function PageLayout ({ children, title = 'Actividades Complementarias', descriptionContent = 'Sistema de Actividades Complementarias', rol }) {
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/profile')
        setProfileData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  let routes = []
  const profile = {}

  if (profileData) {
    switch (rol) {
      case ROLES.ESTUDIANTE:
        routes = STUDENT_ROUTES
        profile.nombre_completo = `${profileData.nombres} ${profileData.apellidos}`
        profile.correo_institucional = profileData.correo_institucional
        profile.genero = profileData.genero
        break
      case ROLES.ADMINISTRADOR:
        routes = ADMIN_ROUTES
        profile.nombre_completo = profileData.numero_control
        profile.correo_institucional = 'Jefe de Departamento'
        profile.genero = 'MASCULINO'
        break
      case ROLES.RESPONSABLE:
        routes = RESPONSABLE_ROUTES
        profile.nombre_completo = `${profileData.abreviatura_cargo} ${profileData.nombres} ${profileData.apellidos}`
        profile.correo_institucional = 'Responsable'
        profile.genero = profileData.genero
        break
      default:
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={descriptionContent} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navigation routes={routes} profile={profile} logged />

      <main className='dark:bg-gray-600 h-full w-full mt-24 flex flex-col min-h-[68vh]'>
        {children}
      </main>

      <Footer />
    </>
  )
}
