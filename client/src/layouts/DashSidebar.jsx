import { Sidebar } from 'flowbite-react'
import {HiUser, HiOutlineLogout} from 'react-icons/hi'
import {useLocation, Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'

export default function DashSidebar() {
  const location = useLocation()
  const [tab, setTab] = useState("")
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item active={tab==="profile"}
              className="cursor-pointer"  
              icon={HiUser} 
              label={"User"} 
              labelColor={"dark"}
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Sidebar.Item icon={HiOutlineLogout} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
