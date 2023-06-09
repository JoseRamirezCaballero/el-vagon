import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { axiosAPI } from '@/utils/constants'
import ButtonDarkMode from '@/components/ButtonDarkMode'

export default function Navigation ({ routes = [], logged = false, profile = {} }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenProfile, setIsOpenProfile] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = () => {
    setIsOpenProfile(!isOpenProfile)
  }

  const logout = async () => {
    await axiosAPI.get('/auth/logout')
  }

  return (
    <nav className='bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 rounded-b-3xl shadow-md mb-28'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <Link href='/' className='flex items-center'>
          <Image
            width={50}
            height={50}
            className='w-12 h-12'
            src='https://upload.wikimedia.org/wikipedia/commons/8/85/Instituto_Tecnologico_de_Oaxaca_-_original.svg'
            alt='Logo ITO'
            priority
          />

          <span className='bg-blue-100 text-blue-800 text-xl font-semibold px-2 rounded dark:bg-blue-200 dark:text-blue-800 ml-2 inline'>
            TecNM
          </span>
        </Link>
        <div className='flex md:order-2'>
          {logged && (
            <button
              id='avatarButton'
              type='button'
              data-dropdown-toggle='userDropdown'
              data-dropdown-placement='bottom-start'
              className='w-10 h-10 rounded-full cursor-pointer mr-4'
              onClick={toggleDropdown}
            >
              <Image
                src={profile.genero === 'HOMBRE' ? '/img/profile-man.png' : '/img/profile-woman.png'}
                alt='User dropdown'
                width={40}
                height={40}
              />
            </button>
          )}

          {logged && (
            <div
              id='userDropdown'
              className={`z-10 ${isOpenProfile ? '' : 'hidden'} fixed right-14 top-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
            >
              <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                <div>{profile.nombre_completo}</div>
                <div className='font-medium truncate text-blue-900 dark:text-blue-400'>{profile.correo_institucional}</div>
              </div>
              {/* <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='avatarButton'>
                <li>
                  <Link href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>Editar Perfil</Link>
                </li>
              </ul> */}
              <div className='py-1'>
                <Link href='/login' onClick={logout} className='block px-4 py-2 text-sm text-red-700 hover:bg-red-100 dark:hover:bg-red-600 dark:text-red-300 dark:hover:text-white'>
                  Cerrar sesión
                </Link>
              </div>
            </div>
          )}

          <div className='hidden md:block'>
            <ButtonDarkMode />
          </div>
          <button
            onClick={toggleMenu}
            data-collapse-toggle='navbar-sticky'
            type='button'
            className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-sticky'
            aria-expanded='false'
          >
            <span className='sr-only'>Abrir Menu</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
        <div
          className={`${isOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id='navbar-cta'
        >
          <ul className='flex flex-col p-4 mt-4 bg-white md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700'>
            {routes.map((route) => (
              <li key={route.url}>
                <Link
                  href={route.url}
                  className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className='md:hidden p-4 flex justify-center items-center'>
            <ButtonDarkMode />
          </div>
        </div>
      </div>
    </nav>
  )
}
