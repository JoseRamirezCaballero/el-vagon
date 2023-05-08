import Head from 'next/head'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PageLayout ({ children, title = 'Actividades Complementarias', descriptionContent = 'Sistema de Actividades Complementarias', rol }) {
  let routes = []
  if (rol === 1) {
    routes = [
      { name: 'Inicio', url: '/estudiante' },
      { name: 'Grupos', url: '/estudiante/grupos' }
    ]
  } else if (rol === 2) {
    routes = [
      { name: 'Inicio', url: '/admin' },
      { name: 'Actividades', url: '/admin/actividad/' },
      { name: 'Crear Actividad', url: '/admin/actividad/create' },
      { name: 'Crear Responsable', url: '/admin/responsable/create' }
    ]
  } else if (rol === 3) {
    routes = [
      { name: 'Inicio', url: '/responsable' }
    ]
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={descriptionContent} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navigation routes={routes} />

      <main className='dark:bg-gray-600 h-full w-full mt-24 flex flex-col min-h-[68vh]'>
        {children}
      </main>

      <Footer />
    </>
  )
}
