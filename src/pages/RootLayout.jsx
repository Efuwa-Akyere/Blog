import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const RootLayout = () => {
  const[favorite, setfavorite] = useState([])
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default RootLayout