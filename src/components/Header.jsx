import Image from 'next/image'
import Link from 'next/link'
import ButtonDarkMode from './ButtonDarkMode'

export default function Header () {
  return (
    <header className='h-16 dark:bg-gray-900 flex items-center justify-between border-b-2 dark:border-white border-black'>
      <div>
        <Image width={50} height={50} src='https://upload.wikimedia.org/wikipedia/commons/8/85/Instituto_Tecnologico_de_Oaxaca_-_original.svg' alt='Logo ITO' priority />
      </div>
      <ul className='ml-6 flex flex-row gap-3'>
        <li>
          <Link href='/' className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'>
            Home
          </Link>
        </li>
        <li>
          <Link href='/actividades' className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'>
            Actividades
          </Link>
        </li>
        <li>
          <Link href='/admin/actividades' className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'>
            CRUD Actividades
          </Link>
        </li>
        <li>
          <Link href='/admin/responsables' className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'>
            CRUD Responsables
          </Link>
        </li>
      </ul>
      <div className='ml-auto'>
        <ButtonDarkMode />
      </div>
    </header>
  )
}
