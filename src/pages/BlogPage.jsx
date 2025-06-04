import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosHeartEmpty } from "react-icons/io";
import { CiTrash } from "react-icons/ci";

const API_URL = 'http://localhost:3000/blogs';


const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true)
  const[favorite, setFavorite] = useState([])
  

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setBlogs(res.data);
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    };

    fetchBlogs();
  }, [loading]); 

  async function handleDelete(id) {
    const confirmDelete = confirm('Do you want to delete your blog?');
    if(confirmDelete === 'yes') return
   try {
     setLoading(true)
    await axios.delete(`${API_URL}/${id}`)
    setLoading(false)
   } catch (error) {
    console.log(error)
    setLoading(false)
   }
  }

  

  const addToFavorite = (id) => {
    setFavorite((prev) =>
    prev.includes(id) ? prev.filter((blogId) => blogId !== id) : [...prev, id]
  );
  }

  return (
    
     <section>
      {blogs.length === 0 ? (
        <div className="text-center text-[#0259aa] text-3xl pt-40">No blogs added yet.</div>
      ) : (
        blogs.map((blog) => (
          <div className='pt-10' key={blog.id}>
            <div className='flex gap-5 border-2 border-[#0259aa] p-2 w-[31rem] rounded-lg mb-5'>
              <div className='flex flex-col gap-5'>
                <div className='border-2 border-[#0259aa] w-32 h-9 text-center rounded-lg text-xl text-[#0259aa]'>{blog.title}</div>
                <div className='border-2 border-[#0259aa] w-[24rem] h-36 rounded-lg text-center pt-12'>{blog.description}</div>
              </div>
              <div className='flex gap-5 mb-40 text-2xl'>
                <button onClick={() => addToFavorite(blog.id)} className={favorite.includes(blog.id) ? 'text-red-600' : ''}><IoIosHeartEmpty /></button>
                <button onClick={() => handleDelete(blog.id)} className='text-red-600'><CiTrash /></button>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default BlogPage;
