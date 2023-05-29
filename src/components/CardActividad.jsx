import Link from 'next/link'
import Image from 'next/image'

export default function CardActividad ({ actividades }) {
  return (
    <div className='grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2 justify-items-center'>
      {actividades.map(actividad => (
        <div key={actividad.idActividad} className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <Link href='#' className='flex justify-center'>
            <Image className='p-8 rounded-t-lg' src='/img/ajedrez.png' alt='product image' width={150} height={150} />
          </Link>
          <div className='px-5 pb-5'>
            <Link href='#'>
              <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>{actividad.nombre}</h5>
              <h6 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>{actividad['responsable.nombres']}</h6>
              <h6 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>{actividad.lugar}</h6>
            </Link>
            <div className='flex items-center mt-2.5 mb-5'>
              <div className='w-full bg-gray-200 rounded-full dark:bg-gray-700'>
                <div className='w-[45%] bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'>45%</div>
              </div>
              <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3'>{actividad.creditos}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-bold text-gray-900 dark:text-white'>{actividad.horario}</span>
              <Link href='#' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Ingresar</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
