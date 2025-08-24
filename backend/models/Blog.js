// models/Blog.js
const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  paragraph: { type: String, default: "" }, // will hold HTML now
  images: [{ type: String }]
});
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: [blockSchema],  // array of blocks
    author: { type: String, default: "Bhavya Patel" },
     metaDescription: { type: String, maxlength: 160 }, // optional, custom description
    slug: { type: String, unique: true, required: true }, // SEO-friendly URL
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Blog", blogSchema);
