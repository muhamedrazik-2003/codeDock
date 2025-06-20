import logo from "../assets/logo.png"
import { Link } from "react-router-dom"

const Header = () => {
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
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
