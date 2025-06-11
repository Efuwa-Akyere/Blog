import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link, NavLink } from "react-router";

const API_URL = "http://localhost:3000/blogs";

const AddNewPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const { title, description } = form;

    if (!title || !description) return;
    try {
      const res = await axios.post(API_URL, form);
      setBlogs((prev) => [...prev, res.data]);
      setForm({ title: "", description: "" });
      navigate("/blog");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="pt-20 px-4 h-[100vh] bg-violet-200">
      <div className="flex flex-col ">
        <label
          htmlFor=""
          className=" border-[#0259aa] w-32 h-9 text-center  text-xl text-[#0259aa]"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title..."
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          className="border-1 border-violet-400 shadow-sm w-[24rem] h-16 rounded-lg text-center focus:border-violet-500"
        />
      </div>

      <div className="flex flex-col pt-16">
        <label
          htmlFor=""
          className=" border-[#0259aa] w-44 h-9 text-center  text-xl text-[#0259aa]"
        >
          Description
        </label>
        <textarea
          type="text"
          id="description"
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
          className="border-1 w-[24rem] h-36  rounded-lg text-center pt-12 border-violet-400 shadow-sm "
        ></textarea>
      </div>
      <div className="pt-16 pl-[8rem]">
        <button
          type="submit"
          className=" bg-violet-400 text-[#0259aa] w-32 px-12 py-1 rounded-lg text-xl hover:bg-violet-700 hover:text-white"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddNewPage;
