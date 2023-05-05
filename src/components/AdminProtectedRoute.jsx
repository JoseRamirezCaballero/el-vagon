import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '@/components/Loader'

export default function AdminProtectedRoute ({ children }) {
  const [userData, setUserData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    axios.get('/api/profile').then((response) => {
      setUserData(response.data)
    })
  }, [])

  if (!userData) {
    return (
      <Loader />
    )
  }

  if (userData.idRol !== 2) {
    router.push('/')
    return null
  }

  return <>{children}</>
}
