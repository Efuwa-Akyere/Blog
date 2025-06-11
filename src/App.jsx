import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import RootLayout from './pages/RootLayout'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import AddNewPage from './pages/AddNewPage'
import React, { useState } from 'react'

function App() {
  const [favorite, setFavorite] = useState([])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />, 
      children:[
        {
          path: 'home',
          element: <HomePage favorite={favorite} />
        },
        {
          path: 'blog',
          element: <BlogPage favorite={favorite} setFavorite={setFavorite} />
        },
        {
          index: true,
          element: <AddNewPage />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
