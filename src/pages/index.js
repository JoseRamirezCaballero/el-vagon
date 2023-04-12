import PageLayout from '@/components/PageLayout'
import axios from 'axios'

export default function Home () {
  const logout = async () => {
    await axios.get('/api/auth/logout')
  }
  return (
    <PageLayout>
      <button onClick={() => logout()}>logout</button>
    </PageLayout>
  )
}
