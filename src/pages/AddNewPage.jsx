import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Link, NavLink } from 'react-router'

const API_URL = 'http://localhost:3000/blogs'

const AddNewPage = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [form, setForm] = useState({
        title: '',
        description: ''
    });

    

    async function handleSubmit(event) {
        event.preventDefault();
    

    const{title,description} = form;

    if(!title|| !description) return;
   try {
        const res = await axios.post(API_URL, form);
        setBlogs((prev) => [...prev, res.data]);
        setForm({title:'', description:''});
        navigate('/blog');
        console.log(res.data)
    } catch (error) {
        console.log(error)
    
   }
    }
    
  return (
    
        <form onSubmit={handleSubmit} className='bg-[#A5D8FF] pt-10'>
            <div className='flex flex-col gap-y-5'>
                <label htmlFor="" className='border-2 border-[#0259aa] w-32 h-9 text-center rounded-lg text-xl text-[#0259aa]'>Title</label>
                <input type="text"
                 id="title" 
                 name="title"
                  placeholder='Enter title...' 
                  value={form.title}
                  onChange={(event) => setForm({...form, title: event.target.value})}
                  className='border-2 border-[#0259aa] w-[24rem] h-16 rounded-lg text-center '/>
            </div>

            <div className='flex flex-col pt-16 gap-y-5'>
                <label htmlFor="" className='border-2 border-[#0259aa] w-44 h-9 text-center rounded-lg text-xl text-[#0259aa]'>Description</label>
                <textarea type="text" 
                id="description"
                 name="description"
                  placeholder='Enter description' 
                  value={form.description}
                  onChange={(event) => setForm({...form, description: event.target.value})}
                  className='border-2 border-[#0259aa] w-[24rem] h-36  rounded-lg text-center pt-12 '></textarea>
            </div>
            <div className='pt-16 pl-[8rem]'>
                <button type="submit" className="border-2 border-[#0259aa] text-[#0259aa] w-32 px-12 py-1 rounded-lg text-xl hover:bg-[#0259aa] hover:text-white">
  Add
</button>

            </div>
        </form>
    
  )
}

export default AddNewPage