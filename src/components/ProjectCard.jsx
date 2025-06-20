import { useState } from "react"
import { StarIcon, ArrowTopRightOnSquareIcon, XMarkIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline"

export default function ProjectCard() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const getStatusStyles = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-900 text-green-300 border-green-800"
            case "In Progress":
                return "bg-yellow-900 text-yellow-300 border-yellow-800"
            default:
                return "bg-gray-800 text-gray-300 border-gray-700"
        }
    }

    const openModal = () => {
        setIsModalOpen(true)
        document.body.style.overflow = "hidden" // Prevent background scrolling
    }

    const closeModal = () => {
        setIsModalOpen(false)
        document.body.style.overflow = "unset" // Restore scrolling
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <>
            <div
                className="bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-all duration-300 group overflow-hidden cursor-pointer"
                onClick={openModal}
            >
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={ "/placeholder.svg"}
                        // alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                </div>
                <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors">
                            Project Title
                        </h3>
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles('Active')}`}
                        >
                            Active
                        </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit assumenda earum labore minima. Eius laudantium sequi saepe repudiandae recusandae hic quia eaque rem, molestiae voluptatibus natus dolores corporis ipsam omnis. Laudantium iure a consequatur ipsam itaque nemo, assumenda ex quae, tenetur ad praesentium, rerum tempore neque et veritatis consectetur hic!
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                            <span
                                // key={tech}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700"
                            >
                                HTML
                            </span>
                        {/* {project.technologies.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                                +{project.technologies.length - 3} more
                            </span>
                        )} */}
                    </div>

                    <div className="flex items-center space-x-4">
                        <a
                            // href={project.githubUrl}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center text-gray-400 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="text-sm">Code</span>
                        </a>
                        <a
                            // href={project.liveUrl}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center text-gray-400 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">Live Demo</span>
                        </a>
                        <div className="flex items-center text-gray-500 ml-auto">
                            <StarIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">4.8</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={handleBackdropClick}
                >
                    <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="relative">
                            <img
                                src={"/placeholder.svg"}
                                // alt={project.title}
                                className="w-full h-64 sm:h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 bg-gray-900 bg-opacity-75 hover:bg-opacity-100 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>

                            {/* Status Badge */}
                            <div className="absolute top-4 left-4">
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles("Active")}`}
                                >
                                    Active
                                </span>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8">
                            {/* Project Title and Rating */}
                            <div className="flex items-start justify-between mb-4">
                                <h2 className="text-3xl font-bold text-white">Project Title</h2>
                                <div className="flex items-center text-yellow-400">
                                    <StarIcon className="h-5 w-5 mr-1 fill-current" />
                                    <span className="text-lg font-semibold">4.8</span>
                                    <span className="text-gray-400 ml-1">(24 reviews)</span>
                                </div>
                            </div>

                            {/* Project Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400">
                                <div className="flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    <span>Started: March 2024</span>
                                </div>
                                <div className="flex items-center">
                                    <UserIcon className="h-4 w-4 mr-1" />
                                    <span>Team Size: 3 developers</span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-3">About This Project</h3>
                                <p className="text-gray-300 leading-relaxed mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis iusto ipsa ullam magni, obcaecati temporibus quisquam consectetur nesciunt soluta explicabo itaque necessitatibus! Enim similique mollitia odit, quaerat neque temporibus perferendis. Quod veritatis repellat facere natus ipsa voluptates, optio cumque cupiditate nemo ipsam numquam. Non enim doloremque iure cum alias.</p>
                                <p className="text-gray-300 leading-relaxed">
                                    This project showcases modern web development practices with a focus on user experience, performance
                                    optimization, and scalable architecture. Built with industry-standard tools and following best
                                    practices for maintainable code.
                                </p>
                            </div>

                            {/* Key Features */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        Responsive Design
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        Real-time Updates
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        User Authentication
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        API Integration
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        Performance Optimized
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                        Cross-browser Compatible
                                    </li>
                                </ul>
                            </div>

                            {/* Technologies */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">

                                        <span
                                            // key={tech}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors"
                                        >
                                            HTML
                                        </span>
                               
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    // href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center bg-white text-black hover:bg-gray-200 px-6 py-3 font-medium rounded-md transition-colors"
                                >
                                    <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                                    View Live Demo
                                </a>
                                <a
                                    // href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center border border-gray-600 text-white hover:bg-gray-800 px-6 py-3 font-medium rounded-md transition-colors"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.239 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    View Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
