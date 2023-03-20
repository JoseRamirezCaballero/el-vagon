import Head from 'next/head'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PageLayout ({ children, title = 'Actividades Complementarias', descriptionContent = 'Sistema de Actividades Complementarias' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={descriptionContent} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navigation />

      <main className='dark:bg-gray-600 h-full w-full mt-24'>
        {children}
      </main>

      <Footer />
    </>
  )
}
