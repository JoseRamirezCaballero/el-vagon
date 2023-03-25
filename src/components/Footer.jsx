export default function Footer () {
  return (
    <footer className='bg-gray-200 dark:bg-gray-600 relative bottom-0 w-full'>
      <div className='mx-auto container p-4 sm:p-6'>
        <hr className='my-6 border-gray-500 sm:mx-auto dark:border-white lg:my-8 border-t' />
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm text-gray-500 sm:text-center dark:text-white'>
            © 2023{' '}
            <a href='http://www.itoaxaca.edu.mx' target='_blank' className='hover:underline'>
              Instituto Tecnológico de Oaxaca
            </a>
            . Todos los derechos reservados.
          </span>
          <div className='flex mt-4 space-x-6 sm:justify-center sm:mt-0'>
            <a
              href='https://www.facebook.com/ActExtTecNMOaxaca'
              target='_blank'
              className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='sr-only'>Visita nuestra pagina de Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
