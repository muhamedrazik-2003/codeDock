import { useEffect, useState, useContext } from "react"
import { X, PlusCircle } from "lucide-react"
import { toast } from "react-toastify"
import { addProject } from "../services/allApis"
import { dataRefreshContext } from "../ContextApi/Context"

export const AddProject = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projectData, setProjectData] = useState({
        title: "", description: "", languages: "", githubrepository: "", livelink: "", image: ""
    })
    const [preview, setPreview] = useState("")

    const { setDataRefresh } = useContext(dataRefreshContext);
    useEffect(() => {
        if (projectData.image) {
            setPreview(URL.createObjectURL(projectData.image))
        } else {
            setPreview("")
        }
    }, [projectData.image])

    const openModal = () => {
        setIsModalOpen(true)
        document.body.style.overflow = "hidden"
    }

    const closeModal = () => {
        setIsModalOpen(false)
        document.body.style.overflow = "unset"
    }

    const handleSubmit = async () => {
        const { title, description, languages, githubrepository, livelink, image } = projectData
        if (!title || !description || !languages || !githubrepository || !livelink || !image) {
            toast.warning("Enter All Values")
            return
        }

        const response = await addProject(projectData)
        if (response.status === 200) {
            toast.success("Project Added Successfully")
            closeModal()
            setProjectData({
                title: "", description: "", languages: "", githubrepository: "", livelink: "", image: ""
            })
            setPreview("")
            setDataRefresh(response);
        } else {
            toast.error("Project Adding Failed")
        }
    }

    return (
        <>
            <button onClick={openModal} className='bg-white text-black p-3 mx-4 mb-8 px-4 rounded-md font-semibold'>
                Add Projects
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-950 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="relative">
                            <label htmlFor="image" className="cursor-pointer block">
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="hidden"
                                    onChange={(e) => setProjectData({ ...projectData, image: e.target.files[0] })}
                                />
                                <img
                                    src={preview || "/placeholder.svg"}
                                    alt="preview"
                                    className="w-full h-64 sm:h-80 object-cover rounded-t-lg"
                                />
                            </label>
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />

                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 bg-gray-900 bg-opacity-70 hover:bg-opacity-100 rounded-full text-gray-400 hover:text-white transition"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Form Section */}
                        <div className="p-6 sm:p-8 space-y-5">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm text-gray-300 mb-1">
                                    Project Title
                                </label>
                                <input
                                    id="title"
                                    placeholder="Project Title"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm text-gray-300 mb-1">
                                    Project Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    placeholder="Describe your project"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                                />
                            </div>

                            {/* Technologies */}
                            <div>
                                <label htmlFor="technologies" className="block text-sm text-gray-300 mb-1">
                                    Technologies Used <span className="text-yellow-500">(comma separated)</span>
                                </label>
                                <textarea
                                    id="technologies"
                                    rows={2}
                                    placeholder="E.g., React, Node.js"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                                    onChange={(e) => setProjectData({ ...projectData, languages: e.target.value })}
                                />
                            </div>

                            {/* Live & Repo URLs */}
                            <div>
                                <label htmlFor="githubrepository" className="block text-sm text-gray-300 mb-1">
                                    Project Live URL
                                </label>
                                <input
                                    id="githubrepository"
                                    placeholder="https://yourproject.live"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                                    onChange={(e) => setProjectData({ ...projectData, githubrepository: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="livelink" className="block text-sm text-gray-300 mb-1">
                                    Project Repository URL
                                </label>
                                <input
                                    id="livelink"
                                    placeholder="https://github.com/yourrepo"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                                    onChange={(e) => setProjectData({ ...projectData, livelink: e.target.value })}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                                <button
                                    onClick={closeModal}
                                    className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition"
                                >
                                    <X className="h-5 w-5 mr-2" />
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                    className="flex items-center justify-center border border-gray-600 text-white hover:bg-gray-800 px-6 py-2 rounded-md transition"
                                >
                                    <PlusCircle className="h-5 w-5 mr-2" />
                                    Add Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
