import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import { deleteProject, updateProject, userProject } from '../services/allApis'
// import { toast } from 'react-toastify'

function ProjectList({ dataRefresh }) {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem("username")) {
            getData()
        }
    }, [dataRefresh])

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
    const updateData = async (id, data, header) => {
        try {
            const response = await updateProject(id, data, header);
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
                            updateData={updateData}
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