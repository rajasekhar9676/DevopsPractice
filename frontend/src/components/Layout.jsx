import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-text">Founder OS</h1>
          <p className="text-sm text-gray-400 mt-1">Operating System for Serious Builders</p>
        </div>
        <nav className="flex-1 p-4">
          <Link
            to="/dashboard"
            className={`block px-4 py-3 rounded-xl mb-2 transition-all ${
              isActive('/dashboard')
                ? 'bg-accent text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-text'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/idea-clarity"
            className={`block px-4 py-3 rounded-xl mb-2 transition-all ${
              isActive('/idea-clarity')
                ? 'bg-accent text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-text'
            }`}
          >
            Idea Clarity
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-secondary border-b border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-text">
            {location.pathname === '/dashboard' && 'Dashboard'}
            {location.pathname === '/idea-clarity' && 'Idea Clarity Engine'}
            {location.pathname.startsWith('/validation-sprint') && 'Validation Sprint'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-text">
              <span className="text-gray-400">Welcome,</span> {user?.name}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-danger text-white rounded-xl hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

