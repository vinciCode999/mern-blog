import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DashSidebar, DashProfile } from '../layouts';

export default function Dashboard() {
  //useLocation returns an object that represents the current URL
  const location = useLocation();
  const [tab, setTab] = useState("")

  useEffect(()=>{
    //Location.search contains the query string of the URL (everything after the ?)
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* sidebar */}
      <div className="md:w-56">
        <DashSidebar/>
      </div>
      {/* profile.. */}
      <div className="">
        {tab === 'profile' && <DashProfile/>}
      </div>
    </div>
  )
}
