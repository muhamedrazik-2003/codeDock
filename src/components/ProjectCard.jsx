import { useState, useEffect, useContext } from "react";
import {
    StarIcon,
    ArrowTopRightOnSquareIcon,
    XMarkIcon,
    CalendarIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { Pen, Trash, Check, X, Code } from "lucide-react";
import baseUrl from "../services/base_url";
import { deleteProject, updateProject } from "../services/allApis";
import { toast } from "react-toastify";
import { dataRefreshContext } from "../ContextApi/Context";
import { authContext } from "../ContextApi/Context";

export default function ProjectCard({ project, setReload }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...project });
    const [preview, setPreview] = useState("")
    const { setDataRefresh } = useContext(dataRefreshContext);
    const { authStatus } = useContext(authContext);
    const currentUser = JSON.parse(sessionStorage.getItem('user'))
    console.log(sessionStorage.getItem('user'));

    console.log("current user",currentUser);
    // console.log(currentUser?._id === project?.userId);

    useEffect(() => {
        if (editedData.image.type) {
            setPreview(URL.createObjectURL(editedData.image))
        } else {
            setPreview("")
        }
    }, [editedData.image.type])

    const getStatusStyles = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-900 text-green-300 border-green-800";
            case "In Progress":
                return "bg-yellow-900 text-yellow-300 border-yellow-800";
            default:
                return "bg-gray-800 text-gray-300 border-gray-700";
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        document.body.style.overflow = "unset";
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await deleteProject(id);
            if (response.status === 200) {
                toast.success("Project deleted Successfully")
                closeModal()
                setReload(prev => !prev)
            }
        } catch (error) {
            toast.error("failed to delete project")
            console.error("BAckend Api Error", error)
        }
    }

    const handleUpdate = async (id, data) => {
        const { title, description, languages, githubrepository, livelink, image } = editedData
        if (!title || !description || !languages || !githubrepository || !livelink || !image) {
            toast.warning("Enter All Values")
        } else {
            if (image.type) {
                const header = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }
                const response = await updateProject(id, data, header);
                if (response.status === 200) {
                    toast.success("Project Updated Successfully")
                    setPreview("")
                    closeModal()
                    setDataRefresh(response);
                } else {
                    toast.error("Project updating Failed")
                }
            } else {
                const header = {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }
                const response = await updateProject(id, data, header);
                if (response.status === 200) {
                    toast.success("Project Updated Successfully")
                    setPreview("")
                    closeModal()
                    setDataRefresh(response);
                } else {
                    toast.error("Project updating Failed")
                }
            }
        }
    }

    return (
        <>
            {/* card  */}
            <div
                className="bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-all duration-300 group overflow-hidden cursor-pointer"
                onClick={openModal}
            >
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={
                            project?.image ? `${baseUrl}/images/${project.image}` : "/placeholder.svg"
                        }
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                </div>
                <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors">
                            {project.title}
                        </h3>
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(
                                "Active"
                            )}`}
                        >
                            Active
                        </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.languages?.split(",").map((lang, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700"
                            >
                                {lang.trim()}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <a
                            href={project.githubrepository}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center text-gray-400 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Code className="h-5 w-5 mr-2" />
                            <span className="text-sm">Code</span>
                        </a>
                        <a
                            href={project.livelink}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center text-gray-400 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">Live Demo</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={handleBackdropClick}
                >
                    <div className="relative bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
                        <button
                            onClick={closeModal}
                            className="absolute border border-slate-600 top-4 right-4 p-2 bg-gray-900 bg-opacity-70 hover:bg-opacity-100 rounded-full text-gray-400 hover:text-white transition"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        {/* Editable Fields */}
                        {isEditing ? (
                            <>
                                <label htmlFor="image" className="cursor-pointer block">
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        className="hidden"
                                        onChange={(e) => setEditedData({ ...editedData, image: e.target.files[0] })}
                                    />
                                    <img
                                        src={
                                            preview ? preview : `${baseUrl}/images/${project.image}`
                                        }
                                        alt="preview"
                                        className="w-full h-64 sm:h-80 object-cover rounded-t-lg"
                                    />
                                </label>
                                <input
                                    value={editedData.title}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, title: e.target.value })
                                    }
                                    className="text-2xl font-bold text-white bg-gray-800 rounded p-2 w-full mb-4"
                                />
                                <textarea
                                    value={editedData.description}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, description: e.target.value })
                                    }
                                    className="text-white bg-gray-800 rounded p-2 w-full mb-4"
                                    rows={4}
                                />
                                <textarea
                                    value={editedData.languages}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, languages: e.target.value })
                                    }
                                    className="text-white bg-gray-800 rounded p-2 w-full mb-4"
                                    placeholder="Technologies (comma separated)"
                                />
                                <input
                                    value={editedData.githubrepository}
                                    onChange={(e) =>
                                        setEditedData({
                                            ...editedData,
                                            githubrepository: e.target.value,
                                        })
                                    }
                                    className="text-white bg-gray-800 rounded p-2 w-full mb-4"
                                    placeholder="GitHub URL"
                                />
                                <input
                                    value={editedData.livelink}
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, livelink: e.target.value })
                                    }
                                    className="text-white bg-gray-800 rounded p-2 w-full mb-6"
                                    placeholder="Live URL"
                                />

                                {/* Buttons */}

                                <div className="flex justify-end flex-wrap gap-4">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => {
                                                    setEditedData({ ...project });
                                                    setIsEditing(false);
                                                }}
                                                className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 px-6 py-3 font-medium rounded-md text-white"
                                            >
                                                <X className="h-4 w-4 mr-2" />
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleUpdate(editedData._id, editedData)}
                                                className="flex items-center justify-center border border-green-600 text-green-400 hover:bg-green-800 px-6 py-3 font-medium rounded-md transition-colors"
                                            >
                                                <Check className="h-4 w-4 mr-2" />
                                                Update
                                            </button>
                                        </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* View Mode */}

                                <img
                                    src={
                                        project?.image ? `${baseUrl}/images/${project.image}` : "/placeholder.svg"
                                    }
                                    alt={project.title}
                                    className="w-full h-64 sm:h-80 object-cover rounded-t-lg"
                                />

                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {project.title}
                                </h2>
                                <p className="text-gray-300 mb-4">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.languages?.split(",").map((tech, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700"
                                        >
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-wrap justify-between gap-4">
                                    <div className="flex gap-4">
                                        <a
                                            href={project.livelink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center bg-white text-black hover:bg-gray-200 px-6 py-3 font-medium rounded-md transition-colors"
                                        >
                                            <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                                            Live Demo
                                        </a>
                                        <a
                                            href={project.githubrepository}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center border border-gray-600 text-white hover:bg-gray-800 px-6 py-3 font-medium rounded-md transition-colors"
                                        >
                                            <Code className="h-5 w-5 mr-2" />
                                            Source Code
                                        </a>
                                    </div>

                                    {authStatus && currentUser._id === project.userId &&
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="flex items-center justify-center border border-blue-600 text-blue-400 hover:bg-blue-800 px-6 py-3 font-medium rounded-md transition-colors"
                                            >
                                                <Pen className="h-4 w-4 mr-2" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteData(project._id)
                                                }}
                                                className="flex items-center justify-center border border-red-600 text-red-400 hover:bg-red-800 px-6 py-3 font-medium rounded-md transition-colors"
                                            >
                                                <Trash className="h-4 w-4 mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    }

                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
