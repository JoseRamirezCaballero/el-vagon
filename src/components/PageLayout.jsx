import Head from 'next/head'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ROLES, ADMIN_ROUTES, STUDENT_ROUTES, RESPONSABLE_ROUTES } from '@/utils/constants'

export default function PageLayout ({ children, title = 'Actividades Complementarias', descriptionContent = 'Sistema de Actividades Complementarias', rol }) {
  let routes = []
  if (rol === ROLES.ESTUDIANTE) {
    routes = STUDENT_ROUTES
  } else if (rol === ROLES.ADMINISTRADOR) {
    routes = ADMIN_ROUTES
  } else if (rol === ROLES.RESPONSABLE) {
    routes = RESPONSABLE_ROUTES
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
