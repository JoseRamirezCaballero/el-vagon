import Head from 'next/head'
// import { Inter } from "next/font/google";
// import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ["latin"] });

export default function Home () {
  return (
    <>
      <Head>
        <title>CRUD</title>
        <meta name='description' content='CRUD con NextJS utilizando PostgreSQL y Tailwind CSS' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1 className='text-3xl font-bold underline'>Tailwind funcionando</h1>
      </main>
    </>
  )
}
