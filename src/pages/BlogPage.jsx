import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { useOutletContext } from "react-router-dom";

const API_URL = "http://localhost:3000/blogs";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickBlog, setClickBlog] = useState(null);
  const [likedIds, setLikedIds] = useState([]);
  const [favorite, setFavorite] = useOutletContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setBlogs(res.data);

        const likedBlogs = res.data.filter((blog) => blog.liked === true);
        setLikedIds(likedBlogs.map((blog) => blog.id));
        setFavorite(likedBlogs);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const clickLike = async (blog) => {
    const isAlreadyLiked = likedIds.includes(blog.id);
    try {
      // Update backend
      await axios.put(`${API_URL}/${blog.id}`, {
        ...blog,
        liked: !isAlreadyLiked,
      });

      if (isAlreadyLiked) {
        // Remove from favorites
        setFavorite(favorite.filter((fav) => fav.id !== blog.id));
        setLikedIds(likedIds.filter((id) => id !== blog.id));
      } else {
        // Add to favorites
        setFavorite([...favorite, { ...blog, liked: true }]);
        setLikedIds([...likedIds, blog.id]);
      }

      // Update blogs in state with new liked status
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) =>
          b.id === blog.id ? { ...b, liked: !isAlreadyLiked } : b
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  async function handleDelete(id) {
    const confirmDelete = confirm("Do you want to delete your blog?");
    if (!confirmDelete) return;
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));

      setFavorite(favorite.filter((fav) => fav.id !== id));

      setLikedIds(likedIds.filter((id) => id !== id));

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <section className="flex gap-60 pt-10">
      <div>
        {blogs.length === 0 ? (
          <div className="text-[#0259aa] text-3xl pt-40 pl-[30rem]">
            No blogs added yet.
          </div>
        ) : (
          blogs.map((blog) => (
            <div className="pt-10 " key={blog.id}>
              <div className="flex gap-5 border-2 border-[#0259aa] ml-10 p-2 w-[31rem] rounded-lg mb-5">
                <div className="flex flex-col gap-5">
                  <div className="border-2 border-[#0259aa] w-32 h-9 text-center rounded-lg text-xl text-[#0259aa]">
                    {blog.title}
                  </div>
                  <div
                    onClick={() => setClickBlog(blog)}
                    className="border-2 border-[#0259aa] w-[24rem] h-36 rounded-lg text-center pt-12 pl-1 truncate"
                  >
                    {blog.description}
                  </div>
                </div>
                <div className="flex gap-5 mb-40 text-2xl ">
                  <button
                    onClick={() => clickLike(blog)}
                    className={likedIds.includes(blog.id) ? "text-red-600" : ""}
                  >
                    <IoIosHeartEmpty className="cursor-pointer" />
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
