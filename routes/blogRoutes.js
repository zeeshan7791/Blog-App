const express = require("express");
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  getBlogbyId,
  deleteBlog,
} = require("../controllers/blogContoller");
const router = express.Router();
// routes
// get all blogs
router.get("/all-blogs", getAllBlogs);
// create blogs
router.post("/create-blog", createBlog);
// update blog
router.put("/update-blog/:id", updateBlog);
// get single blog
router.get("/single-blog/:id", getBlogbyId);
// delete blog
router.delete("/delete-blog/:id", deleteBlog);

module.exports = router;
