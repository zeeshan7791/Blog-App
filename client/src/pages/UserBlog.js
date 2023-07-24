import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs, "myblogs-----------");
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={"blog.username"}
            time={blog.createdAt}
          />
        ))
      ) : (
        <div className="emptyBlog">
          <h1>You Haven't Created a blog</h1>
        </div>
      )}
    </div>
  );
};

export default UserBlog;
