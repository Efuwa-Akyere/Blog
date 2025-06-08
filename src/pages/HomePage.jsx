import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/blogs";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setBlogs(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section>
      {blogs.length === 0 ? (
        <div className="text-center text-[#0259aa] text-3xl pt-40">
          No blogs added yet.
        </div>
      ) : (
        <>
          <div className="pt-10">
            <div className="border-2 border-[#0259aa] w-32 h-9 text-center rounded-lg text-xl text-[#0259aa]">
              All Blogs
            </div>
            {blogs.map((blog) => (
              <div className="pt-10" key={blog.id}>
                <div className="flex gap-5 border-2 border-[#0259aa] p-2 w-[31rem] rounded-lg mb-5">
                  <div className="flex flex-col gap-5">
                    <div className="border-2 border-[#0259aa] w-32 h-9 text-center rounded-lg text-xl text-[#0259aa]">
                      {blog.title}
                    </div>
                    <div className="border-2 border-[#0259aa] w-[24rem] h-36 rounded-lg text-center pt-12 break-words px-3">
                      {blog.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-10">
            <div className="border-2 border-[#0259aa] w-32 h-9 text-center rounded-lg text-xl text-[#0259aa]">
              Favorite
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default HomePage;
