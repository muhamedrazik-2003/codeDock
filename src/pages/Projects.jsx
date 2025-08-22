import { FolderIcon, MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProjectCard from "../components/ProjectCard"
import { getAllProjects } from "../services/allApis"
import { useEffect, useState } from "react"

export default function Projects() {
    const [allProjects, setAllProjects] = useState([])
    const [searchData, setSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload,setReload] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            getProjectData()
        }
    }, [reload])

    const handleSearch = (value) => {
        const newProjectData = searchData.filter(project => {
            const keyword = (project.title + " " + project.languages).toLowerCase();
            return keyword.includes(value.toLowerCase());
        });

        console.log(newProjectData)
        setAllProjects(newProjectData)
    }

    const getProjectData = async () => {
        try {
            const response = await getAllProjects();
            console.log(response)
            if (response.status === 200) {
                setAllProjects(response.data)
                setSearchData(response.data)
                console.log(allProjects)
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }

    }
    return (
        <div className="w-full bg-black text-white">
            <Header />
            {/* Page Header */}
            <section className="py-16 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-4">
                            <FolderIcon className="h-10 w-10 text-gray-400 mr-3" />
                            <h1 className="text-4xl sm:text-5xl font-bold">All Projects</h1>
                        </div>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Discover our complete collection of development projects, from web applications to mobile apps and
                            everything in between.
                        </p>
                    </div>
                    <div className="relative flex-1 w-3xl mx-auto">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects, technologies..."
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        />
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-[8rem]">
                {
                    isLoading ?
                        <h1 className="my-6  text-center col-span-3 text-xl ">Loading Projects...</h1>
                        : allProjects.length > 0
                            ? allProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} setReload={setReload} />
                            ))
                            : <h1 className="my-6  text-center col-span-3 text-xl">Currently No Projects Found!.</h1>
                }
            </section>

            <Footer />
        </div>
    )
}
