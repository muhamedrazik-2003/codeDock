import React, { useEffect, useState, useContext } from 'react'
import ProjectCard from './ProjectCard'
import { userProject } from '../services/allApis'
import { dataRefreshContext } from '../ContextApi/Context'


function ProjectList() {
    const [projects, setProjects] = useState([])
    const { dataRefresh } = useContext(dataRefreshContext);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            getData()
        }
    }, [dataRefresh])

    const getData = async () => {
        try {
            const response = await userProject();
            console.log(response)

            if (response.status === 200) {
                setIsLoading(false)
                setProjects(response.data)
            }
        } catch (error) {
            console.error("Backend Api Error", error)
        }

    }
    // const deleteData = async (id) => {
    //     try {
    //         const response = await deleteProject(id);
    //         if (response.status === 200) {
    //             getData()
    //         }
    //     } catch (error) {
    //         console.error("BAckend Api Error", error)
    //     }
    // }
    return (
        <section className="w-full">
            <h2 className="text-xl font-semibold text-white mb-4 px-4">Your Projects</h2>

            {projects?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {projects.map((project) => (
                        isLoading
                            ? <h1>Loading Projects</h1>
                            : <ProjectCard
                                key={project._id}
                                project={project}
                            />


                    ))}
                </div>
            ) : (
                <div className="text-gray-500 italic px-4">No projects found. Start by adding a new one.</div>
            )}
        </section>
    )

}

export default ProjectList