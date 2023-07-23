import axios from "axios";
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import CircularProgress from "@mui/material/CircularProgress";

const UserBlog = () => {
  const [blogs, setBlog] = useState([]);
  const [loading, isSetLoading] = useState(false);

  const getUserBlog = async () => {
    try {
      isSetLoading(true);
      const id = localStorage.getItem("userId");

      console.log(id);
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      isSetLoading(false);
      // console.log(data, "userblog value----");
      if (data.success) {
        setBlog(data?.userBlog);
      }
    } catch (error) {
      isSetLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getUserBlog();
  }, []);
  console.log(blogs, "user blog ");
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

export default UserBlog;
