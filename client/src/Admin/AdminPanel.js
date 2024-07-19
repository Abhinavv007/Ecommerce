import React from 'react'
import AdminMenu from './AdminMenu'

function AdminPanel() {
  return (
    <div style={{display:"flex"}}>
    <AdminMenu />
    <div style={{margin:30}}>
        <p>Admin Panel</p>
    </div>
    </div>
  )
}

export default AdminPanel