import Image from 'next/image'
import Link from 'next/link'
import ButtonDarkMode from './ButtonDarkMode'

const routes = [
  { name: 'Home', url: '/' },
  { name: 'Actividades', url: '/actividades' },
  { name: 'CRUD Actividades', url: '/admin/actividades' },
  { name: 'CRUD Responsables', url: '/admin/responsables' }
]

export default function Header () {
  return (
    <nav className='h-16 dark:bg-gray-900 flex items-center justify-between border-b-2 dark:border-white border-black px-4'>
      <div>
        <Image width={50} height={50} className='w-14 h-14' src='https://upload.wikimedia.org/wikipedia/commons/8/85/Instituto_Tecnologico_de_Oaxaca_-_original.svg' alt='Logo ITO' priority />
      </div>

      <ul className='flex flex-row gap-3'>
        {routes.map((route) => (
          <li key={route.url}>
            <Link href={route.url} className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-base p-2.5'>
              {route.name}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <ButtonDarkMode />
      </div>
    </nav>
  )
}
