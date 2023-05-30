import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { axiosAPI } from '@/utils/constants'
import Loader from '@/components/Loader'

export default function ProtectedRoute ({ children, rol }) {
  const [userData, setUserData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    axiosAPI.get('/profile').then((response) => {
      setUserData(response.data)
    })
  }, [])

  if (!userData) {
    return (
      <Loader />
    )
  }

  if (userData.idRol === rol) {
    return <>{children}</>
  }

  router.push('/')
  return null
}
