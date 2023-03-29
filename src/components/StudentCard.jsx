import Image from 'next/image'

export default function StudentCard ({ nombres, apellidos, numerocontrol, carrera }) {
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex flex-col items-center justify-center text-center pb-10 h-72'>
        <Image width={50} height={50} className='w-24 h-24 mb-3 rounded-full shadow-lg' src='https://upload.wikimedia.org/wikipedia/commons/8/85/Instituto_Tecnologico_de_Oaxaca_-_original.svg' alt='Logo ITO' priority />
        <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{apellidos} {nombres}</h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>{numerocontrol}@itoaxaca.edu.mx</span>
        <span className='text-sm text-gray-500 dark:text-gray-400'>{carrera}</span>
      </div>
    </div>

  )
}
