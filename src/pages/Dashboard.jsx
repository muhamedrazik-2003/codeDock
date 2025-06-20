import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AddProject } from '../components/AddProject'
import { UserCircleIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {
  const [profileShow, setProfileShow] = useState(true)

  return (
    <>
      <Header />
      <section className='min-h-100 p-8 w-full  mx-auto grid grid-cols-[1fr_auto]'>
        <div>
          <AddProject />
        </div>
        <div className={`border-l border-gray-500  space-y-6 ${profileShow ?  'w-[300px]' : ''  }`}>
          <button className=' pl-4 ' onClick={() => setProfileShow(prev => !prev)}>
            {profileShow
              ? <ChevronDoubleRightIcon className='size-6' />
              : <ChevronDoubleLeftIcon className='size-6' />
            }
          </button>
          {profileShow
            && <>
              <div>
                <div className='flex items-center gap-2 pl-12'>
                  <UserCircleIcon className='size-7' />
                  <h1 className='text-3xl'>Profile</h1>
                </div>
              </div>
              <div className='space-y-3 pl-12'>
                <div className='space-y-1'>
                  <p className='text-sm text-gray-500'>Profile Name</p>
                  <p className='text-xl italic'>Jhon Doe</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-gray-500'>GitHub</p>
                  <p className='text-xl italic'>johndoe/github.com</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-gray-500'>LinkedIn</p>
                  <p className='text-xl italic'>JhonDoe/Linkedin</p>
                </div>
              </div>
            </>

          }
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Dashboard
