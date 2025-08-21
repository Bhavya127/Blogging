import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState({ title: "", blocks: [] });
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        const data = await res.json();

        const blocks = data.content.map((block) => ({
          paragraph: block.paragraph || "",
          images: block.images?.filter((img) => img) || [],
        }));

        setBlog({ title: data.title, blocks });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchOtherBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/getblogs`);
        const data = await res.json();
        // Exclude current blog
        setOtherBlogs(data.filter((b) => b._id !== id));
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
    fetchOtherBlogs();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog.title) return <p className="text-center mt-10">Blog not found</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

      {blog.blocks.map((block, idx) => (
        <div key={idx} className="mb-6">
          {block.images.map((img, imgIdx) => (
            <img
              key={imgIdx}
              src={img}
              alt={`Block ${idx} Img ${imgIdx}`}
              className="w-full mb-2 rounded"
            />
          ))}
          <p className="text-lg">{block.paragraph}</p>
        </div>
      ))}

      {/* Other Blogs Section */}
      {otherBlogs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Other Blogs You Might Like</h2>
          <ul className="space-y-2">
            {otherBlogs.map((b) => (
              <li key={b._id}>
                <Link
                  to={`/blog/${b._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
