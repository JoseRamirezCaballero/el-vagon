import { useEffect, useState } from 'react'
import StudentProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import CardInscripcion from '@/components/CardInscripcion'
import { ROLES, axiosAPI } from '@/utils/constants'

export default function Historial () {
  const [perfil, setPerfil] = useState([])
  const [inscripciones, setInscripciones] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await axiosAPI.get('/profile')
        const profileData = profile.data
        const inscripcionesResponse = await axiosAPI.get(`/inscripciones/estudiante/${profileData.idEstudiante}`)
        const inscripcionesData = inscripcionesResponse.data
        setInscripciones(inscripcionesData)
        setPerfil(profileData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <StudentProtectedRoute rol={ROLES.ESTUDIANTE}>
      <PageLayout rol={ROLES.ESTUDIANTE}>

        <h1 className='mb-4 text-center text-2xl font-semibold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Historial de <span className='text-orange-600 dark:text-orange-500'>Actividades Extraescolares</span></h1>
        <p className='text-lg p-4 mb-2 text-center font-normal text-gray-500 lg:text-xl dark:text-gray-400'>¡Bienvenido/a! Aquí podrás encontrar todas las actividades en las que te has inscrito a lo largo de tus periodos escolares. Este registro te permitirá revivir tus experiencias y recordar tus logros. ¡Disfruta de cada momento!</p>
        <div className={inscripciones.length === 1 ? 'grid grid-cols-1 justify-items-center' : inscripciones.length === 2 ? 'grid justify-items-center grid-cols-1 sm:grid-cols-2 gap-2' : 'grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center'}>
          {inscripciones.length > 0
            ? (
                inscripciones.map((inscripcion) => (
                  <CardInscripcion key={inscripcion.idIncripcion} actividad={inscripcion.actividad} profile={perfil} />
                ))
              )
            : (
              <figure className='max-w-screen-md mx-auto text-center mt-5 p-4 lg:p-0'>
                <p className='text-2xl font-medium text-gray-900 dark:text-white'>Hasta el momento, tu historial de inscripción de actividades extraescolares se encuentra vacío. No se han registrado actividades en tu perfil.</p>
                <div role='status' className='space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center mt-6'>
                  <div className='flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700'>
                    <svg className='w-12 h-12 text-gray-200' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' fill='currentColor' viewBox='0 0 640 512'><path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' /></svg>
                  </div>
                  <div className='w-full'>
                    <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4' />
                    <div className='h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5' />
                    <div className='h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5' />
                    <div className='h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5' />
                    <div className='h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5' />
                    <div className='h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[360px]' />
                  </div>
                  <span className='sr-only'>Loading...</span>
                </div>
              </figure>
              )}

        </div>
      </PageLayout>
    </StudentProtectedRoute>
  )
}
