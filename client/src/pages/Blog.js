import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import CircularProgress from "@mui/material/CircularProgress";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, isSetLoading] = useState(false);
  // get blogs
  const getBlogs = async () => {
    try {
      isSetLoading(true);
      const { data } = await axios.get(`/api/v1/blog/all-blogs`);
      isSetLoading(false);
      // console.log(data.allBlog, "allblogs");
      setBlogs(data?.allBlog);
    } catch (error) {
      isSetLoading(false);
      console.log(error);
    }
  };
  console.log(blogs, "value in blog-");
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      {loading ? (
        <div className="spinner">
          <CircularProgress />
        </div>
      ) : (
        <>
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                id={blog._id}
                isUser={true}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={blog.user.username}
                time={blog.createdAt}
              />
            ))
          ) : (
            <h1>You Havent Created a blog</h1>
          )}
        </>
      )}
    </>
  );
};

export default Blog;
