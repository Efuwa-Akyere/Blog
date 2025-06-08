import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiTrash } from "react-icons/ci";

const API_URL = "http://localhost:3000/blogs";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickBlog, setClickBlog] = useState(null);
  const[liked, setLiked] = useState(false)
  const[blogEditData, setBlogEditData] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setBlogs(res.data);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [loading]);

  async function handleDelete(id) {
    const confirmDelete = confirm("Do you want to delete your blog?");
    if (!confirmDelete) return;
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

   

  // function handleEdit(blog) {
  //   setBlogEditData(blog);
  //   setForm({
  //     title: blog.title,
  //     description: blog.description
  //   });
  // }

  // async function handleupdate() {
  //  try {
  //    const updatedBlog = {...blogEditData, ...form}
  //   await axios.put(`${API_URL}/${blogEditData.id}`, updatedBlog);
    
  //   setBlogs((prev) => prev.map((u) => (b.id === blogEditData.id ? updatedBlog : b)))
  //   setBlogEditData(null);
  //  } catch (error) {
  //   console.log(error)
  //  }
  // }

  return (
    <section className="flex gap-60">
      <div>
        {blogs.length === 0 ? (
          <div className="text-[#0259aa] text-3xl pt-40 pl-[30rem]">
            No blogs added yet.
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              className="pt-10 "
              key={blog.id}
              
            >
              <div className="flex gap-5 border-2 border-[#0259aa] ml-10 p-2 w-[31rem] rounded-lg mb-5">
                <div className="flex flex-col gap-5">
                  <div className="border-2 border-[#0259aa] w-32 h-9 text-center rounded-lg text-xl text-[#0259aa]">
                    {blog.title}
                  </div>
                  <div  onClick={() => setClickBlog(blog)} className="border-2 border-[#0259aa] w-[24rem] h-36 rounded-lg text-center pt-12 pl-1 truncate">
                    {blog.description}
                  </div>
                </div>
                <div className="flex gap-5 mb-40 text-2xl ">
                  <button onClick={() => setLiked(!liked)}
                    className={liked ? 'text-red-600 ' : ''}>
                    <IoIosHeartEmpty className="cursor-pointer"/>
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="text-red-600 cursor-pointer"
                  >
                    <CiTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className=" flex pt-10 ">
        {clickBlog ? (
          <div className="flex border-2 border-[#0259aa] p-2 w-[31rem] rounded-lg mb-5">
            <div className="flex flex-col gap-5">
              <div className="border-2 border-[#0259aa] w-32 h-9 text-center rounded-lg text-xl text-[#0259aa]">
                {clickBlog.title}
              </div>
              <div className="border-2 border-[#0259aa] w-[24rem] rounded-lg text-center pt-4 px-3 break-words">
                {clickBlog.description}
              </div>
            </div>
            <div>
              <button
                onClick={() => setClickBlog(null)}
                className="text-red-600"
              >
                close
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default BlogPage;
