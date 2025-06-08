import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'

const RootLayout = () => {
  const[favorite, setfavorite] = useState([])
  return (
    <>
    <Navbar />
    <Outlet context={[favorite, setfavorite]}/>
    </>
  )
}

export default RootLayout