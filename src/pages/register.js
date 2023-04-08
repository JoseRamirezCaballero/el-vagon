import Head from 'next/head'
import Register from '@/components/Register'

export default function Registrarse () {
  return (
    <>
      <Head>
        <title>Registrate</title>
        <meta name='description' content='Sistema de Actividades Complementarias' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Register />
    </>
  )
}
