import Prompt from '@/components/Prompt'
import PageLayout from '@/components/PageLayout'

// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export default function Home () {
  return (
    <PageLayout>
      <div>
        <Prompt />
      </div>
    </PageLayout>
  )
}
