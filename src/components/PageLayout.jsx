import Head from 'next/head'
import Image from 'next/image'
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
          <Image src='https://upload.wikimedia.org/wikipedia/commons/8/85/Instituto_Tecnologico_de_Oaxaca_-_original.svg' alt='ITO' width={50} height={50} />
        </div>

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
