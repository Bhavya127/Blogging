// src/pages/BlogPreview.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BlogPreview() {
  const navigate = useNavigate();
  const location = useLocation();

  // Fallback to empty values if no state is passed
  const {
    title = "",
    blocks = [],
    slug = "",
    metaDescription = "",
  } = location.state || {};

  // Remove Quill caret artifacts and zero-width chars from HTML
  const cleanQuillArtifacts = (html = "") =>
    html
      .replace(/<span class="ql-cursor">.*?<\/span>/g, "")
      .replace(/\ufeff/g, "");

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {/* Blog Content Blocks */}
      {blocks.map((block, idx) => (
        <div key={idx} className="mb-8">
          {/* Images */}
          {Array.isArray(block.images) &&
            block.images
              .filter(Boolean)
              .map((img, imgIdx) => (
                <img
                  key={imgIdx}
                  src={img}
                  alt={`Block ${idx} Image ${imgIdx}`}
                  className="w-full mb-4 rounded shadow"
                />
              ))}

          {/* Paragraph: render HTML */}
          {block.paragraph && (
            <div
              className="prose prose-lg max-w-none text-gray-800 text-justify"
              dangerouslySetInnerHTML={{
                __html: cleanQuillArtifacts(block.paragraph),
              }}
            />
          )}
        </div>
      ))}

      {/* Back to Editor Button */}
      <button
        onClick={() =>
          navigate("/blogeditor", {
            state: { title, blocks, slug, metaDescription },
          })
        }
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow"
      >
        🔙 Back to Edit
      </button>
    </div>
  );
}
