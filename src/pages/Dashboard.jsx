import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AddProject } from '../components/AddProject'
import { UserCircleIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'
import ProjectList from '../components/ProjectList'

const Dashboard = () => {
  const [user, setUser] = useState("")
  const [dataRefresh, setDataRefresh] = useState(false);

  const [profileShow, setProfileShow] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUser(sessionStorage.getItem("username"))
    }
  }, [dataRefresh])


  return (
    <>
      <Header />
      <section className="w-full mx-auto bg-[#000] text-gray-200 min-h-screen">
        <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-800">
          Welcome to CodeDock, {user}
        </h2>

        <div className="grid grid-cols-[1fr_auto] px-6 gap-6">
          <div className="space-y-4 pt-4">
            <AddProject setDataRefresh={setDataRefresh} />
            <ProjectList dataRefresh={dataRefresh} />
          </div>

          <div
            className={`transition-all duration-300 ${profileShow ? 'w-[300px] border-l border-gray-800 pl-6' : ''
              } space-y-6`}
          >
            <div className="pt-6 px-4">
              <button
                onClick={() => setProfileShow(prev => !prev)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition"
                title={profileShow ? "Hide Profile" : "Show Profile"}
              >
                <UserCircleIcon className="size-6" />
                {profileShow ? (
                  <ChevronDoubleRightIcon className="size-5" />
                ) : (
                  <ChevronDoubleLeftIcon className="size-5" />
                )}
              </button>
            </div>

            {profileShow && (
              <>
                <div className="py-6 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <UserCircleIcon className="size-8 text-gray-400" />
                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                      Your Profile
                    </h1>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Profile Name */}
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      Name
                    </p>
                    <p className="text-lg font-medium text-gray-200 italic">
                      Jhon Doe
                    </p>
                  </div>

                  {/* GitHub */}
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      GitHub
                    </p>
                    <a
                      href="https://github.com/johndoe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-violet-400 hover:underline break-words"
                    >
                      johndoe/github.com
                    </a>
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      LinkedIn
                    </p>
                    <a
                      href="https://linkedin.com/in/johndoe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-violet-400 hover:underline break-words"
                    >
                      JhonDoe/Linkedin
                    </a>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Dashboard
