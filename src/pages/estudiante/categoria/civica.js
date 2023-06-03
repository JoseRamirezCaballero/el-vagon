import { useEffect, useState } from 'react'
import StudentProtectedRoute from '@/components/ProtectedRoute'
import PageLayout from '@/components/PageLayout'
import CardActividad from '@/components/CardActividad'
import { ROLES, axiosAPI } from '@/utils/constants'

export default function Civica ({ actividades }) {
  const [cantidadEstudiantes, setCantidadEstudiantes] = useState([])

  useEffect(() => {
    const obtenerCantidadEstudiantes = async () => {
      try {
        const responses = await Promise.all(
          actividades.map((actividad) =>
            axiosAPI.get(`/inscripciones/${actividad.idActividad}`)
          )
        )
        const cantidadEstudiantes = responses.map(
          (response) => response.data.length
        )
        setCantidadEstudiantes(cantidadEstudiantes)
      } catch (error) {
        console.error('Error al obtener la cantidad de estudiantes:', error)
      }
    }

    obtenerCantidadEstudiantes()
    const interval = setInterval(obtenerCantidadEstudiantes, 5000)
    return () => clearInterval(interval)
  }, [actividades])

  return (
    <StudentProtectedRoute rol={ROLES.ESTUDIANTE}>
      <PageLayout rol={ROLES.ESTUDIANTE}>
        <div className='flex justify-center mb-2'>
          <h1 className='mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl'>Actividades <span className='text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-amber-400'>Cívicas</span></h1>
        </div>
        <div className={actividades.length > 0 ? 'grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center' : ''}>
          {actividades.length > 0
            ? (
                actividades.map((actividad, index) => (
                  <CardActividad key={actividad.idActividad} actividad={actividad} cantidadEstudiantes={cantidadEstudiantes[index]} />
                ))
              )
            : (
              <figure className='max-w-screen-md mx-auto text-center mt-5 p-4 lg:p-0'>
                <p className='text-2xl font-medium text-gray-900 dark:text-white'>Por el momento no hay actividades extraescolares cívicas.</p>
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

export async function getServerSideProps () {
  try {
    const response = await axiosAPI.get('/actividades')
    const actividades = response.data.filter(
      actividad => actividad.categoria === 'CIVICA' && actividad.estatus
    )
    return {
      props: { actividades }
    }
  } catch (error) {
    console.error('Error al obtener las actividades:', error)
    return {
      props: { actividades: [] }
    }
  }
}
