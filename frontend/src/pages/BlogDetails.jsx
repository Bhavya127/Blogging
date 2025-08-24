import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function BlogDetails() {
  const { slug } = useParams(); // ✅ Use slug instead of _id
  const [blog, setBlog] = useState({ title: "", blocks: [], metaDescription: "" });
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${slug}`);
        const data = await res.json();

        if (!data.title) return setBlog({ title: "", blocks: [], metaDescription: "" });

        const blocks = data.content.map((block) => ({
          paragraph: block.paragraph || "",
          images: block.images?.filter((img) => img) || [],
        }));

        setBlog({
          title: data.title,
          blocks,
          metaDescription: data.metaDescription || "",
        });
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
        setOtherBlogs(data.filter((b) => b.slug !== slug)); // exclude current blog
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
    fetchOtherBlogs();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog.title) return <p className="text-center mt-10">Blog not found</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Dynamic SEO */}
      <Helmet>
        <title>{blog.title}</title>
        <meta
          name="description"
          content={blog.metaDescription || "Read this amazing blog"}
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

      {blog.blocks.map((block, idx) => (
        <div key={idx} className="mb-8">
          {/* ✅ Render images */}
          {block.images.map((img, imgIdx) => (
            <img
              key={imgIdx}
              src={img}
              alt={`Block ${idx + 1} Image ${imgIdx + 1}`}
              className="w-full mb-4 rounded-lg shadow"
            />
          ))}

          {/* ✅ Render formatted content with HTML support */}
          {block.paragraph && (
            <div
              className="prose prose-lg max-w-none text-gray-800 text-justify"
              dangerouslySetInnerHTML={{ __html: block.paragraph }}
            />
          )}
        </div>
      ))}

      {/* Other Blogs */}
      {otherBlogs.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Other Blogs You Might Like</h2>
          <ul className="space-y-2">
            {otherBlogs.map((b) => (
              <li key={b._id}>
                <Link
                  to={`/blog/${b.slug}`}
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
