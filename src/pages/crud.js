import FormActividad from '@/components/FormActividad'
import PageLayout from '@/components/PageLayout'

// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export default function Home () {
  return (
    <PageLayout>
      <div className='px-10 py-5 mx-auto'>
        <FormActividad />
      </div>
    </PageLayout>
  )
}
