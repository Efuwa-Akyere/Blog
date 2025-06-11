import React from 'react'
import { Link, NavLink } from 'react-router'

const Navbar = () => {
  return (
    <nav className='flex bg-violet-300 text-[#0259aa] fixed top-0 left-0 w-full   justify-between items-center h-14 px-3 '>
        <div className='text-xl italic font-bold '>LOGO</div>
        <ul className='flex gap-8 pr-20 text-lg'>
           <li className=''>
            <NavLink to='/home' href="">{({isActive}) => (<span className= {isActive ? 'text-violet-600  border-red-600' : ''}>Home</span>)}</NavLink>
           </li>
           <li className=''>
            <NavLink to='/blog' href="">{({isActive}) => (<span className={isActive ? 'text-violet-600 ' : ''} >Blog</span>)}</NavLink>
           </li>
           <li className=''>
            <NavLink to='/addnew' href="">{({isActive}) => (<span className={isActive ? 'text-violet-600 ' : ''}>AddNew</span>)}</NavLink>
           </li>
           
        </ul>
    </nav>
  )
}

export default Navbar