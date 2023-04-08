import Head from 'next/head'
import Login from '@/components/Login'

export default function InciarSesion () {
  return (
    <>
      <Head>
        <title>Inicia Sesión</title>
        <meta name='description' content='Actividades Complementarias' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Login />
    </>
  )
}
