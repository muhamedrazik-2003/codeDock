import { useState } from "react"
import { StarIcon, ArrowTopRightOnSquareIcon, XMarkIcon, CalendarIcon, UserIcon, PlusCircleIcon } from "@heroicons/react/24/outline"

export const AddProject = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
        document.body.style.overflow = "hidden" // Prevent background scrolling
    }

    const closeModal = () => {
        setIsModalOpen(false)
        document.body.style.overflow = "unset" // Restore scrolling
    }

    return (
        <>
            <button onClick={openModal} className='bg-white text-black p-3 mx-4 px-4 rounded-md font-semibold'>Add Projects</button>
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                >
                    <div className=" bg-grey-950 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="relative">
                            <label htmlFor="image">
                                <input type="file" className="hidden" id="image" name="image" />
                                <img
                                    src={"/placeholder.svg"}
                                    // alt={project.title}
                                    className="w-full  h-64 sm:h-80 object-cover"
                                />
                            </label>

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 bg-gray-900 bg-opacity-75 hover:bg-opacity-100 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 sm:p-8">
                            {/* Project Title and Rating */}
                            <div className="mb-4 space-y-1">
                                <label htmlFor="title" className="block text-sm">Project Title</label>
                                <input id="title" className="text-3xl font-bold border border-gray-700 rounded-md shadow-lg w-full p-0.5 px-4 text-white" placeholder="Project Title" />
                            </div>
                            {/* Description */}
                            <div className="mb-4 space-y-1">
                                <label htmlFor="title" className="block text-sm">Project Description</label>
                                <textarea id="title" rows={'3'} className="font-bold border border-gray-700 rounded-md shadow-lg w-full p-0.5 px-4 text-white" placeholder="Describe Your Project" />
                            </div>
                            <div className="mb-4 space-y-1">
                                <label htmlFor="title" className="block text-sm">Features <span className="text-yellow-500">(use Comma to seperate)</span></label>
                                <textarea id="title" rows={'3'} className="font-bold border border-gray-700 rounded-md shadow-lg w-full p-0.5 px-4 text-white" placeholder="Project Features" />
                            </div>
                            <div className="mb-4 space-y-1">
                                <label htmlFor="title" className="block text-sm">Technologies Used <span className="text-yellow-500">(use Comma to seperate)</span></label>
                                <textarea id="title" rows={'3'} className="font-bold border border-gray-700 rounded-md shadow-lg w-full p-0.5 px-4 text-white" placeholder="Technologies Used to build this Project" />
                            </div>
                            <div className="mb-4 space-y-1">
                                <label htmlFor="title" className="block text-sm">Project Live URL</label>
                                <input id="title" className=" font-bold border border-gray-700 rounded-md shadow-lg w-full p-0.5 px-4 text-white" placeholder="Project Live URL" />
                            </div>
                            <div className="mb-4 space-y-1">
                                <label htmlFor="title" className="block text-sm">Project Repository URL</label>
                                <input id="title" className=" font-bold border border-gray-700 rounded-md shadow-lg w-full p-0.5 px-4 text-white" placeholder="Project Repository URL" />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={closeModal}
                                    // href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center bg-white text-black hover:bg-gray-200 px-6 py-3 font-medium rounded-md transition-colors"
                                >
                                    <XMarkIcon className="h-5 w-5 mr-2" />
                                    Cancel
                                </button>
                                <button
                                    onClick={closeModal}
                                    // href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center border border-gray-600 text-white hover:bg-gray-800 px-6 py-3 font-medium rounded-md transition-colors"
                                >
                                    <PlusCircleIcon className="h-5 w-5 mr-2" />
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
