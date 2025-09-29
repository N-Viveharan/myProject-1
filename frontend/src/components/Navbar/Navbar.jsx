import React, { useState } from 'react'
import ProfileInfo from '../../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'

function Navbar({userInfo,onSearchNote, handleCleanSearch}) {
  const [searchQuery,setSearchQuery]=useState("")
  const navigate=useNavigate()
  const onLogout=()=>{
    localStorage.clear()
    navigate('/login')
  }
  const handleSearch=()=>{
    if (searchQuery) {
      onSearchNote(searchQuery)
    }
  }
  const onClearSearch=()=>{
    setSearchQuery("")
     handleCleanSearch()
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-2xl'>
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
        <SearchBar
        value={searchQuery}
        onChanges={({target})=>{
          setSearchQuery(target.value)

        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}/>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar