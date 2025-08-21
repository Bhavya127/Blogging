const express = require("express");
const Blog = require("../models/Blog");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload image to Cloudinary (protected for admins)
router.post("/upload-image", verifyToken, verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const stream = cloudinary.uploader.upload_stream(
      { folder: "blogs" },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json({ url: result.secure_url });
      }
    );

    const bufferStream = require("stream").Readable.from(req.file.buffer);
    bufferStream.pipe(stream);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Save blog (only admin)
router.post("/blogs", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, blocks } = req.body;
    const newBlog = new Blog({ title, content: blocks });
    await newBlog.save();
    res.status(201).json({ message: "Blog saved", blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all blogs (public)
router.get("/getblogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single blog by ID (public)
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
