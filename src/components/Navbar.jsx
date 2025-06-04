import React from 'react'
import { Link, NavLink } from 'react-router'

const Navbar = () => {
  return (
    <nav className='flex bg-[#A5D8FF] text-[#0259aa] justify-between items-center h-14 px-3 border-2 border-[#0259aa] rounded-lg'>
        <div className='text-xl italic font-bold border-2 w-24 text-center rounded-lg'>LOGO</div>
        <ul className='flex gap-8 pr-20 text-lg'>
           <li className='border-2 w-20 rounded-lg text-center'>
            <NavLink to='/home' href="">{({isActive}) => (<span className= {isActive ? 'text-red-600  border-red-600' : ''}>Home</span>)}</NavLink>
           </li>
           <li className='border-2 w-20 rounded-lg text-center'>
            <NavLink to='/blog' href="">{({isActive}) => (<span className={isActive ? 'text-red-600' : ''} >Blog</span>)}</NavLink>
           </li>
           <li className='border-2 w-24 rounded-lg text-center'>
            <NavLink to='/addnew' href="">{({isActive}) => (<span className={isActive ? 'text-red-600' : ''}>AddNew</span>)}</NavLink>
           </li>
           
        </ul>
    </nav>
  )
}

export default Navbar