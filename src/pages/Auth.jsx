import { useState } from "react"
import { CodeBracketIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { loginUser, registerUser } from "../services/allApis"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
const Auth = () => {
  const [isRegistered, setIsRegistered] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  })
  const navigate = useNavigate();

  const handleUserAuth = () => {
    setIsRegistered(!isRegistered)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isRegistered) {
      const regResponse = await registerUser(formData);
      console.log(regResponse);
      if (regResponse.status === 201) {
        toast.success('registration Completed');
        handleUserAuth();
      } else {
        toast.error("something went Wrong");
      }
    } else {
      const loginResponse = await loginUser(formData);
      console.log(loginResponse);
      if (loginResponse.status === 200) {
        toast.success('Login Successfull');
        sessionStorage.setItem("token",loginResponse.data.token)
        sessionStorage.setItem("username",loginResponse.data.username)
        navigate('/');
      } else {
        toast.error("something went Wrong");
      }
    };

  }

  return (
    <div className="w-full bg-black text-white">
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <CodeBracketIcon className="h-12 w-12 text-white mr-3" />
              <span className="text-2xl font-bold">codeDock</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {isRegistered ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-400 text-lg">
              {isRegistered ? "Join codeDock to manage your projects" : "Sign in to your codeDock account"}
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  required
                />
                <label htmlFor="email" className="absolute -top-2 left-2 bg-gray-900 px-2 text-sm text-gray-400">
                  Email Address
                </label>
              </div>

              {/* Username Field (Register only) */}
              {isRegistered && (
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="block w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors"
                    placeholder="Choose a username"
                    required
                  />
                  <label htmlFor="username" className="absolute -top-2 left-2 bg-gray-900 px-2 text-sm text-gray-400">
                    Username
                  </label>
                </div>
              )}

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full px-3 py-3 pr-10 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <label htmlFor="password" className="absolute -top-2 left-2 bg-gray-900 px-2 text-sm text-gray-400">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-black hover:bg-blue-500 px-6 py-3 text-lg font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {isRegistered ? "Create Account" : "Sign In"}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">or</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400">
                {isRegistered ? "Already have an account?" : "Don't have an account?"}
                <button
                  onClick={handleUserAuth}
                  className="ml-2 text-white hover:text-gray-300 font-medium transition-colors focus:outline-none"
                >
                  {isRegistered ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
