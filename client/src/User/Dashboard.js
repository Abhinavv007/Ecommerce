import React from 'react'
import UserMenu from './UserMenu'
import Header from "../Components/Header"
function Dashboard() {
  return (
    <>
      <Header />
      <div style={{display:"flex"}}>
      <UserMenu />
      <p>Dashboard</p>
      </div>
        
    </>
  )
}

export default Dashboard