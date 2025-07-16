import React, { useEffect, useState, useContext } from 'react'
import ProjectCard from './ProjectCard'
import { deleteProject, userProject } from '../services/allApis'
import { addResponseContext } from '../ContextApi/Context'


function ProjectList() {
    const [projects, setProjects] = useState([])
  const { addResponse } = useContext(addResponseContext);

    useEffect(() => {
        if (sessionStorage.getItem("username")) {
            getData()
        }
    }, [addResponse])

    const getData = async () => {
        try {
            const response = await userProject();
            console.log(response)

            if (response.status === 200) {
                setProjects(response.data)
            }
        } catch (error) {
            console.error("BAckend Api Error", error)
        }

    }
    const deleteData = async (id) => {
        try {
            const response = await deleteProject(id);
            if (response.status === 200) {
                getData()
            }
        } catch (error) {
            console.error("BAckend Api Error", error)
        }

    }
    return (
        <section className="w-full">
            <h2 className="text-xl font-semibold text-white mb-4 px-4">Your Projects</h2>

            {projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            deleteData={deleteData}
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