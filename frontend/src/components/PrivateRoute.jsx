import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-text">Loading...</div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute

