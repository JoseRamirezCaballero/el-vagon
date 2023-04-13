import Head from 'next/head'
import Navigation from '@/components/Navigation'

export default function GuestLayout ({ children, title = 'Actividades Complementarias', descriptionContent = 'Sistema de Actividades Complementarias' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={descriptionContent} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navigation />
      <main className='dark:bg-gray-600 h-full w-full flex flex-col min-h-[68vh]'>
        {children}
      </main>
    </>
  )
}
