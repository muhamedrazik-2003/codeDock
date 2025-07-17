import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AddProject } from '../components/AddProject'
import ProjectList from '../components/ProjectList'
import { Profile } from '../components/Profile'

const Dashboard = () => {
  const [user, setUser] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUser(sessionStorage.getItem("username"))
    }
  }, [])


  return (
    <>
      <Header />
      <section className="w-full mx-auto bg-[#000] text-gray-200 min-h-100vh">
        <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-800">
          Welcome to CodeDock, {user}
        </h2>

        <div className="grid grid-cols-[1fr_auto] px-6 gap-6">
          <div className="space-y-4 pt-4 pb-20">
            <AddProject />
            <ProjectList />
          </div>

          <Profile/>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Dashboard
