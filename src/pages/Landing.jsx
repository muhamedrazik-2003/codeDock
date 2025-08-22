import { CodeBracketIcon, FolderIcon } from "@heroicons/react/24/outline"
import ProjectCard from "../components/ProjectCard"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllProjects } from "../services/allApis"

export default function Landing() {
  const [logState, setLogState] = useState(false);
  const [sampleProjects, setSampleProjects] = useState([])
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    getProjectData()
    if (sessionStorage.getItem("token")) {
      setLogState(true);
    } else {
      setLogState(false);
    }
  },[])

  const getProjectData = async () => {
    try {
      const response = await getAllProjects();
      console.log(response)
      if (response.status === 200) {
        setSampleProjects(response.data.slice(0, 3))
        console.log(sampleProjects)
        setIsLoading(false)
      }
    } catch (error) {
        setIsLoading(false)
      console.error(error)
    }

  }

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="w-full bg-black text-white">
      <Header />
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Build. Deploy.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                Maintain.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              A centralized platform to showcase, manage, and maintain your development projects with ease and
              precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToProjects}
                className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-medium rounded-md transition-colors"
              >
                View Projects
              </button>
              {
                logState
                  ? <Link to={'/dashboard'} className="border border-gray-600 text-white hover:bg-gray-900 px-8 py-3 text-lg font-medium rounded-md transition-colors">
                    View Dashboard
                  </Link>
                  : <Link to={'/authentication'} className="border border-gray-600 text-white hover:bg-gray-900 px-8 py-3 text-lg font-medium rounded-md transition-colors">
                    Get Started
                  </Link>
              }

            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <FolderIcon className="h-8 w-8 text-gray-400 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our latest development projects, each crafted with attention to detail and modern technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              isLoading ? 
              <h1 className="my-6  text-center col-span-3 text-xl ">Loading Projects...</h1>
              : sampleProjects.length > 0
              ? sampleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
            : <h1 className="my-6  text-center col-span-3 text-xl">Currently No Projects Found!.</h1>
            }
          </div>

          <div className="text-center mt-12">
            {logState
              ? <Link to={'/projects'} className="border border-gray-600 text-white hover:bg-gray-900 px-8 py-3 font-medium rounded-md transition-colors">
                View All Projects
              </Link>
              : <Link to={'/authentication'} className="border border-gray-600 text-white hover:bg-gray-900 px-8 py-3 font-medium rounded-md transition-colors">
                View All Projects
              </Link>

            }
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
