import { useEffect, useState } from "react";
import axios from "axios";
import { IoIosHeartEmpty } from "react-icons/io";
import { CiTrash } from "react-icons/ci";

const API_URL = "http://localhost:3000/blogs";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickBlog, setClickBlog] = useState(null);
  const [likedIds, setLikedIds] = useState([]);
  const [favorite, setFavorite] = useState([]);

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
      await axios.put(`${API_URL}/${blog.id}`, {
        ...blog,
        liked: !isAlreadyLiked,
      });

      if (isAlreadyLiked) {
        setFavorite(favorite.filter((fav) => fav.id !== blog.id));
        setLikedIds(likedIds.filter((id) => id !== blog.id));
      } else {
        setFavorite([...favorite, { ...blog, liked: true }]);
        setLikedIds([...likedIds, blog.id]);
      }

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
      setLikedIds(likedIds.filter((likedId) => likedId !== id));
      setClickBlog(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <section className="flex gap-60 pt-10 bg-violet-200 min-h-screen">
      <div>
        {blogs.length === 0 ? (
          <div className="text-[#0259aa] text-3xl pt-40 pl-[30rem]">
            No blogs added yet.
          </div>
        ) : (
          blogs.map((blog) => (
            <div className="pt-10 " key={blog.id}>
              <div className="flex gap-5 border-1 border-violet-300 shadow-lg ml-10 p-2 w-[27rem] rounded-lg mb-5">
                <div className="flex flex-col gap-5 ">
                  <div className=" text-xl text-[#0259aa]">{blog.title}</div>
                  <div
                    onClick={() => setClickBlog(blog)}
                    className="border-1 border-violet-300  w-[20rem] h-36 rounded-lg text-center text-[#0259aa] pt-12 pl-1 truncate"
                  >
                    {blog.description}
                  </div>
                </div>
                <div className="flex gap-5 mb-40 text-2xl ">
                  <button
                    onClick={() => clickLike(blog)}
                    className={
                      likedIds.includes(blog.id)
                        ? "text-red-600"
                        : "text-[#0259aa]"
                    }
                  >
                    <IoIosHeartEmpty className="cursor-pointer " />
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

      {blogs.length > 0 && (
        <div className=" flex pt-10 ">
          {clickBlog ? (
            <div className="flex border-1 border-violet-300 shadow-lg p-2 w-[28rem] rounded-lg mb-5">
              <div className="flex flex-col gap-5">
                <div className=" text-xl text-[#0259aa]">{clickBlog.title}</div>
                <div className=" w-[24rem] border-1 border-violet-300 h-36 text-[#0259aa] rounded-lg text-center pt-4 px-3 break-words">
                  {clickBlog.description}
                </div>
              </div>
              <div>
                <button
                  onClick={() => setClickBlog(null)}
                  className="text-red-600 cursor-pointer"
                >
                  close
                </button>
              </div>
            </div>
          ) : (
            <div className="text-2xl pt-10 pl-10 text-gray-500">
              Click on Blog to view details
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default BlogPage;
