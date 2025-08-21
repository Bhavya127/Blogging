// src/pages/BlogPreview.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BlogPreview() {
  const navigate = useNavigate();
  const location = useLocation();

  // fallback to empty values if no state is passed
  const { title = "", blocks = [] } = location.state || {};

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {blocks.map((block, idx) => (
        <div key={idx} className="mb-6">
          {block.images
            .filter((img) => img) // only render non-empty image URLs
            .map((img, imgIdx) => (
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

      <button
        onClick={() =>
          navigate("/blogeditor", { state: { title, blocks } })
        }
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        🔙 Back to Edit
      </button>
    </div>
  );
}
