const mongoose = require("mongoose");
const blogModel = require("../Models/blogModel");
const User = require("../Models/userModel");
// create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    console.log(title);
    console.log(description);
    console.log(image);
    if (!title || !description || !image || !user) {
      return res.status(500).json({
        success: false,
        message: "please provide all fields",
      });
    }
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({
        success: true,
        message: "unable to find user",
      });
    }
    console.log(existingUser, "value in existing user--------");
    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(200).json({
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
    const allBlog = await blogModel.find({}).populate("user");
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
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
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
    return res.status(200).json({
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
// getUserBlog
exports.getUserBlog = async (req, res) => {
  try {
    console.log(req.params.id, "val in id");
    const userBlog = await User.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user blog",
      userBlog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in getting user blog",
      error,
    });
  }
};
// delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
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
