const blogModel = require("../Models/blogModel");
// create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    console.log(title);
    console.log(description);
    console.log(image);
    if (!title || !description || !image) {
      return res.status(500).json({
        success: false,
        message: "please provide all fields",
      });
    }
    const newBlog = new blogModel({ title, description, image });
    await newBlog.save();
    return res.status(400).json({
      success: true,
      message: "new blog created",
      newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while creating blog",
      error,
    });
  }
};
// get all blog
exports.getAllBlogs = async (req, res) => {
  try {
    const allBlog = await blogModel.find({});
    if (allBlog.length < 0) {
      return res.status(500).json({
        success: false,
        message: "no blog found",
      });
    }
    res.status(200).json({
      success: true,
      blogsCount: allBlog.length,
      message: "All Blog Lists",
      allBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while gettig blog",
      error,
    });
  }
};
// update blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error WHile Updating Blog",
      error,
    });
  }
};
// get single blog
exports.getBlogbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    console.log(blog, "value in blog");
    if (!blog) {
      return res.status(500).json({
        success: false,
        message: "blog doesnot exist with id",
      });
    }
    return res.status(400).json({
      success: true,
      message: "single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while getting Blog",
      error,
    });
  }
};
// delete blog
exports.deleteBlog = async (req, res) => {
  try {
    await blogModel.findByIdAndDelete(req.params.id);
    return res.status(400).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};
