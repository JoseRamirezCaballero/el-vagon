import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ButtonDarkMode from '@/components/ButtonDarkMode'

export default function PageLayout ({ children, title = 'Actividades Complementarias', descriptionContent = 'Sistema de Actividades Complementarias' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={descriptionContent} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
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
            <Link href='/crud' className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'>
              CRUD Actividades
            </Link>
          </li>
        </ul>
        <div className='ml-auto'>
          <ButtonDarkMode />
        </div>
      </header>

      <main className='dark:bg-gray-900 h-screen w-screen'>
        {children}
      </main>
    </>
  )
}
