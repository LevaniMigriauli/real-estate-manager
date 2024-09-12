import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ErrorPage = () => {
  // const navigate = useNavigate()
  //
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/')
  //   }, 5000)
  //
  //   return () => clearTimeout(timer)
  // }, [navigate])

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  )
}

export default ErrorPage