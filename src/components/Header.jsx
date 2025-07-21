import { useContext } from "react";
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import { authContext } from "../ContextApi/Context";
import { toast } from "react-toastify";

const Header = () => {
  const { setAuthStatus, authStatus } = useContext(authContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.clear();
    setAuthStatus(false)
    navigate('/')
    toast.warning('user Logged Out')
  }
  return (
    <nav className="border-b border-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-2">
            <img src={logo} className='size-8 rounded-3xl' alt="" />
            <span className="text-xl font-bold">codeDock</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to={'/'} className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to={'/projects'} className="text-gray-300 hover:text-white transition-colors">
              Projects
            </Link>
            {
              authStatus
              && <button onClick={handleLogout} className="text-red-500 hover:text-red-800 transition-colors py-1.5 px-3 border border-red-500 rounded-3xl">
                  Logout
                </button>
            }

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
