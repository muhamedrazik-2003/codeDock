import React, { useEffect, useState } from 'react'
import { UserCircleIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'
import { Pen } from 'lucide-react';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../services/allApis';


export const Profile = () => {
  const [profileShow, setProfileShow] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    username: '', github: "", linkedin: "", profile: ""
  })
  const [preview, setPreview] = useState("")


  useEffect(() => {
    if (updatedProfile.profile.type) {
      setPreview(URL.createObjectURL(updatedProfile.profile))
    } else {
      setPreview("")
    }
  }, [updatedProfile.profile.type])

  const handleProfileUpdate = async (data) => {
    // console.log(updatedProfile)
    const { username, github, linkedin, profile } = updatedProfile;
    let header = {};
    if (profile.type) {
      header = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Token ${sessionStorage.getItem('token')}`
      }
    } else {
      header = {
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem('token')}`
      }
    }
    const response = await updateUserProfile(data, header);
    if (response.status === 200) {
      toast.success("Profile Updated Successfully")
      setPreview("")
      // setDataRefresh(response);
    } else {
      toast.error("Project updating Failed")
    }
  }

  return (

    <div
      className={`transition-all duration-300 ${profileShow ? 'w-[300px] border-l border-gray-800 pl-6' : ''
        } space-y-6`}
    >
      <div className="pt-6 px-4">
        <button
          onClick={() => setProfileShow(prev => !prev)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          title={profileShow ? "Hide Profile" : "Show Profile"}
        >
          <UserCircleIcon className="size-6" />
          {profileShow ? (
            <ChevronDoubleRightIcon className="size-5" />
          ) : (
            <ChevronDoubleLeftIcon className="size-5" />
          )}
        </button>
      </div>

      {profileShow && (
        <>
          <div className="flex justify-between py-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              {isEditing
                ? <label htmlFor="profile">
                  <input type="file" onChange={(e) => setUpdatedProfile({ ...updatedProfile, profile: e.target.files[0] })} name="profile" id="profile" className='hidden' />
                  <img
                    className='size-8'

                    src={
                      preview ? preview : "/placeholder.svg"
                    }
                    alt="profile image" />
                </label>
                : <img
                  className='size-12'
                  src={
                    preview ? preview : "/placeholder.svg"
                  }
                  alt="profile image"
                />
              }
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Your Profile
              </h1>
            </div>
            <div>
              <Pen onClick={() => setIsEditing(prev => !prev)} className=' text-gray-400 hover:text-white' />
            </div>
          </div>

          <div className="space-y-6">
            {/* Profile Name */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Name
              </p>
              {isEditing
                ? <input onChange={(e) => setUpdatedProfile({ ...updatedProfile, username: e.target.value })} className={'p-2 border-1 my-1 rounded-lg'} type="text" name="username" id="username" placeholder='username' />
                : <p className="text-lg font-medium text-gray-200 italic">
                  Jhon Doe
                </p>
              }

            </div>

            {/* GitHub */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                GitHub
              </p>
              {isEditing
                ? <input onChange={(e) => setUpdatedProfile({ ...updatedProfile, github: e.target.value })} className={'p-2 border-1 my-1 rounded-lg'} type="text" name="github" id="github" placeholder='github Repo' />
                : <a
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-violet-400 hover:underline break-words"
                >
                  johndoe/github.com
                </a>
              }

            </div>

            {/* LinkedIn */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                LinkedIn
              </p>
              {isEditing
                ? <input onChange={(e) => setUpdatedProfile({ ...updatedProfile, linkedin: e.target.value })} className={'p-2 border-1 my-1 rounded-lg'} type="text" name="linkedin" id="linkedin" placeholder='linkedIn URL' />
                : <a
                  href="https://linkedin.com/in/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-violet-400 hover:underline break-words"
                >
                  JhonDoe/Linkedin
                </a>
              }

            </div>
          </div>
          {
            isEditing &&
            <div className='flex justify-end gap-3'>
              <button className='p-1.5 px-3 rounded-3xl bg-red-500 text-white hover:bg-red-800' onClick={() => setIsEditing(false)}>cancel</button>
              <button className='p-1.5 px-3 rounded-3xl bg-green-500 text-white hover:bg-green-800' onClick={() => handleProfileUpdate(updatedProfile)}>update</button>
            </div>
          }

        </>
      )}

    </div>
  )
}
