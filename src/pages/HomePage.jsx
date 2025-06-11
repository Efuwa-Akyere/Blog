import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/blogs";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setBlogs(res.data);

        const likedBlogs = res.data.filter(blog => blog.liked === true);
        setFavorite(likedBlogs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="pt-10 bg-violet-200 min-h-screen">
      {blogs.length === 0 ? (
        <div className="text-center text-[#0259aa] text-3xl pt-40">
          No blogs added yet.
        </div>
      ) : (
        <div>
          <div className="pt-10">
            <div className=" bg-violet-400 text-[#0259aa] w-32 h-9 text-center rounded-lg text-xl ml-10">
              All Blogs
            </div>
            <div className="grid lg:grid-cols-3">
              {blogs.map((blog) => (
              <div className="pt-10 " key={blog.id}>
                <div className="border-1 border-violet-300 shadow-lg ml-10 p-2 w-[22rem] rounded-lg mb-5">
                  <div className="flex flex-col gap-5">
                    <div className="text-xl text-[#0259aa]">
                      {blog.title}
                    </div>
                    <div className="border-1 border-violet-300  w-[20rem] h-30 rounded-lg text-center text-[#0259aa] py-8  break-words px-3">
                      {blog.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>

          <div className="pt-10">
            <div className=" bg-violet-400 text-[#0259aa] w-32 h-9 text-center rounded-lg text-xl mb-5 ml-10">
              Favorite
            </div>
            <div className="grid grid-cols-3">
              {favorite.length === 0 ? (
              <div className="text-gray-500">No favorites yet.</div>
            ) : (
              favorite.map((blog) => (
                <div className="pt-4" key={blog.id}>
                  <div className="flex gap-5 border-1 border-violet-300 shadow-lg ml-10 p-2 w-[22rem] rounded-lg mb-5">
                    <div className="flex flex-col gap-5">
                      <div className="text-xl text-[#0259aa]">
                        {blog.title}
                      </div>
                      <div className="border-1 border-violet-300  w-[20rem] h-30 rounded-lg text-center text-[#0259aa] py-8  break-words px-3">
                        {blog.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomePage;
