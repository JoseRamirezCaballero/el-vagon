import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { axiosAPI } from '@/utils/constants'

export default function CardInscripcion ({ actividad = {} }) {
  const fechaActual = dayjs()
  const añoActual = fechaActual.format('YYYY')
  const mesActual = fechaActual.format('MM')
  const periodo = mesActual < '06'
    ? `ENERO-JUNIO/${añoActual}`
    : `AGOSTO-DICIEMBRE/${añoActual}`
  const periodoActual = periodo === actividad.periodo
  const [responsable, setResponsable] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = await axiosAPI.get(`/responsables/${actividad.idResponsable}`)
        const responsableData = reponse.data
        setResponsable(responsableData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [actividad.idResponsable])

  const [tooltipVisible, setTooltipVisible] = useState(false)

  const handleMouseEnter = () => {
    setTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex justify-end px-4 pt-4'>
        <span className='flex items-center text-sm font-medium text-gray-900 dark:text-white'><span className={`flex w-2.5 h-2.5 ${periodoActual ? 'bg-green-600' : 'bg-red-600'} rounded-full mr-1.5 flex-shrink-0`} />{periodoActual ? 'En curso' : 'Finalizado'}</span>
      </div>

      <div className='flex flex-col items-center pb-8'>
        <div className='tooltip-container ' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Image className='w-24 h-24 mb-3 rounded-full shadow-lg' src={responsable.genero === 'HOMBRE' ? '/img/entrenador.png' : '/img/entrenadora.png'} alt='Profile' width={100} height={100} />
          <div id='tooltip-default' role='tooltip' className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm ${tooltipVisible ? 'opacity-100' : 'opacity-0'} tooltip dark:bg-gray-700`}>
            {`${responsable.abreviatura_cargo} ${responsable.nombres} ${responsable.apellidos}`}
            <div className='tooltip-arrow' data-popper-arrow />
          </div>
        </div>
        <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{actividad.nombre}</h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>{actividad.periodo}</span>
        <div className='flex mt-4 space-x-3 md:mt-6'>
          <Link href='#' className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'><svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z' clipRule='evenodd' /></svg> Descargar horario</Link>
        </div>
      </div>
    </div>
  )
}
