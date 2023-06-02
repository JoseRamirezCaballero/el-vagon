import Image from 'next/image'
import { useContext, useState } from 'react'
import { Toaster, toast } from 'sonner'
import ProfileContext from '@/contexts/dataProfile'
import { axiosAPI } from '@/utils/constants'

export default function CardActividad ({ actividades }) {
  const profile = useContext(ProfileContext)
  const [showInscripcionModal, setShowInscripcionModal] = useState(false)
  const [idActividad, setIdActividad] = useState()
  const [periodo, setPeriodo] = useState()

  const notification = ({ bool, descriptionToast = '' }) => {
    bool
      ? toast.success('Actividad modificada', {
        description: descriptionToast
      })
      : toast.error('Error al modificar Actividad', {
        description: descriptionToast
      })
  }

  const showModalInscripcion = (idActividad, periodo) => {
    setIdActividad(idActividad)
    setPeriodo(periodo)
    setShowInscripcionModal(true)
  }

  const inscribirse = async () => {
    try {
      const validate = await axiosAPI.post('/inscripciones/validate', {
        idEstudiante: profile.idEstudiante,
        idActividad,
        periodo
      })

      if (validate.status === 200) {
        const response = await axiosAPI.post('/inscripciones', {
          idEstudiante: profile.idEstudiante,
          idActividad
        })
        if (response) {
          notification({ bool: true, descriptionToast: 'Te has inscrito correctamente' })
        }
      } else {
        notification({ bool: false, descriptionToast: 'Intentelo de nuevo' })
      }

      setShowInscripcionModal(false)
    } catch (error) {
      setShowInscripcionModal(false)
      notification({ bool: false, descriptionToast: 'Ya estás inscrito en una actividad durante este periodo, por lo que no es posible registrarte en otra actividad adicional en este momento.' })
    }
  }

  // const [porcentaje, setPorcentaje] = useState(0)

  // useEffect(() => {
  //   const fetchDatos = async () => {
  //     try {
  //       const resInscripcion = await axiosAPI.get(`/inscripciones/${idActividad}`)
  //       const resActividad = await axiosAPI.get(`/actividades/${idActividad}`)
  //       const total = resActividad.data.capacidad_maxima
  //       const cantidadEstudiantes = resInscripcion.data.length
  //       const porcentaje = Math.round((cantidadEstudiantes / total) * 100)
  //       setPorcentaje(porcentaje)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   fetchDatos()
  // }, [idActividad])

  return (
    <div className='grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center'>
      {actividades.map(actividad => (
        <div key={actividad.idActividad} className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex justify-center'>
            <Toaster position='bottom-right' expand richColors />
            <Image className='p-8 rounded-t-lg' src='/img/ajedrez.png' alt='product image' width={150} height={150} />
          </div>
          <div className='px-5 pb-5'>
            <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>{actividad.nombre}</h5>
            <h6 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>{actividad['responsable.nombres']}</h6>
            <h6 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>{actividad.lugar}</h6>
            <div className='flex items-center mt-2.5 mb-5'>
              <div className='w-full bg-gray-200 rounded-full dark:bg-gray-700'>
                <div className='w-[45%] bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'>45%</div>
              </div>
              <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>{actividad.creditos}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-bold text-gray-900 dark:text-white'>{actividad.horario}</span>
              <button onClick={() => showModalInscripcion(actividad.idActividad, actividad.periodo)} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Inscribirme</button>
            </div>
            <div id='popup-modal' tabIndex='-1' className={`fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center ${showInscripcionModal ? '' : 'hidden'}`}>
              <div className='relative w-full max-w-md max-h-full'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                  <button onClick={() => setShowInscripcionModal(false)} className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white' data-modal-hide='popup-modal'>
                    <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' /></svg>
                    <span className='sr-only'>Close modal</span>
                  </button>
                  <div className='p-6 text-center'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-check mx-auto mb-4 text-green-400 w-14 h-14 dark:text-gray-200' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                      <circle cx='12' cy='12' r='10' />
                      <path d='M8 12l3 3l6 -6' />
                    </svg>

                    <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>{`¿Te gustaría inscribirte en la actividad "${actividad.nombre}"? Solo podrás inscribirte en una única actividad.`}</h3>
                    <button onClick={() => inscribirse(actividad.idActividad)} data-modal-hide='popup-modal' type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'>
                      Si, Inscribirme
                    </button>
                    <button onClick={() => setShowInscripcionModal(false)} data-modal-hide='popup-modal' type='button' className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'>No, Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
