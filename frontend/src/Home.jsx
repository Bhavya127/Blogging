import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`).then(res => setBlogs(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Latest Blogs</h1>
      {blogs.map(blog => (
        <div key={blog._id} className="p-4 border-b">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
          <Link to={`/blog/${blog._id}`} className="text-blue-500">Read More</Link>
        </div>
      ))}
    </div>
  );
}
