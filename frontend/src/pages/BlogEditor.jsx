import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState([{ paragraph: "", images: [""] }]);
  const [metaDescription, setMetaDescription] = useState(""); // new field
  const [slug, setSlug] = useState(""); // new field for slug
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (location.state) {
      const { title, blocks, metaDescription, slug } = location.state;
      setTitle(title);
      setBlocks(blocks);
      setMetaDescription(metaDescription || "");
      setSlug(slug || "");
    } else {
      const draft = localStorage.getItem("blogDraft");
      if (draft) {
        const { title, blocks, metaDescription, slug } = JSON.parse(draft);
        setTitle(title);
        setBlocks(blocks);
        setMetaDescription(metaDescription || "");
        setSlug(slug || "");
      }
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem(
      "blogDraft",
      JSON.stringify({ title, blocks, metaDescription, slug })
    );
  }, [title, blocks, metaDescription, slug]);

  const handleBlockChange = (blockIdx, field, value, imgIdx = null) => {
    const newBlocks = [...blocks];
    if (field === "paragraph") newBlocks[blockIdx].paragraph = value;
    else if (field === "image" && imgIdx !== null) newBlocks[blockIdx].images[imgIdx] = value;
    setBlocks(newBlocks);
  };

  const addBlock = () => setBlocks([...blocks, { paragraph: "", images: [""] }]);
  const removeBlock = (idx) => setBlocks(blocks.filter((_, i) => i !== idx));
  const addImage = (blockIdx) => {
    const newBlocks = [...blocks];
    newBlocks[blockIdx].images.push("");
    setBlocks(newBlocks);
  };
  const removeImage = (blockIdx, imgIdx) => {
    const newBlocks = [...blocks];
    newBlocks[blockIdx].images = newBlocks[blockIdx].images.filter((_, i) => i !== imgIdx);
    setBlocks(newBlocks);
  };

  const handleImageUpload = async (blockIdx, imgIdx, file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.url) handleBlockChange(blockIdx, "image", data.url, imgIdx);
      else alert("❌ Failed to upload image: " + (data.error || "Unknown error"));
    } catch (err) {
      console.error(err);
      alert("⚠️ Error uploading image");
    }
  };

  const handlePreview = () =>
    navigate("/blog-preview", { state: { title, blocks, metaDescription, slug } });

  const handleUpload = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, blocks, metaDescription, slug }), // <-- sending both
    });
    const data = await res.json();
    if (res.ok) {
      alert("✅ Blog uploaded successfully!");
      setTitle("");
      setBlocks([{ paragraph: "", images: [""] }]);
      setMetaDescription("");
      setSlug("");
      localStorage.removeItem("blogDraft");
    } else alert("❌ Upload failed: " + (data.error || "Unknown error"));
  } catch (err) {
    console.error(err);
    alert("⚠️ Error uploading blog");
  }
};


  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
          Create a Blog
        </h2>

        {/* Blog Title */}
        <input
          type="text"
          placeholder="Enter blog title"
          className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Slug */}
        <input
          type="text"
          placeholder="Slug (e.g., top-ai-tools-2025)"
          className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        {/* Meta Description */}
        <input
          type="text"
          placeholder="Meta description (max 160 chars)"
          className="w-full border border-gray-300 rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
          value={metaDescription}
          maxLength={160}
          onChange={(e) => setMetaDescription(e.target.value)}
        />

        {/* Blocks */}
        {blocks.map((block, idx) => (
          <div
            key={idx}
            className="mb-6 border border-gray-200 rounded-xl p-5 bg-gray-50 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-lg">Block {idx + 1}</h4>
              <button
                onClick={() => removeBlock(idx)}
                className="text-red-500 font-bold hover:text-red-700 transition-colors"
              >
                ❌ Remove Block
              </button>
            </div>

            {block.images.map((img, imgIdx) => (
              <div key={imgIdx} className="mb-3 relative">
                <input
                  type="text"
                  placeholder={`Image URL ${imgIdx + 1}`}
                  className="w-full border border-gray-300 rounded-xl p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  value={img}
                  onChange={(e) => handleBlockChange(idx, "image", e.target.value, imgIdx)}
                />
                <input
                  type="file"
                  className="w-full mb-2"
                  onChange={(e) => handleImageUpload(idx, imgIdx, e.target.files[0])}
                />
                <button
                  onClick={() => removeImage(idx, imgIdx)}
                  className="absolute right-0 top-0 mt-2 mr-2 text-red-500 hover:text-red-700 font-bold"
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              onClick={() => addImage(idx)}
              className="mb-4 w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-2 rounded-xl transition-colors"
            >
              ➕ Add Image
            </button>

            <textarea
              placeholder="Paragraph"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
              rows="4"
              value={block.paragraph}
              onChange={(e) => handleBlockChange(idx, "paragraph", e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={addBlock}
          className="w-full bg-indigo-200 hover:bg-indigo-300 text-indigo-800 font-bold py-3 rounded-xl mb-6 transition-colors"
        >
          ➕ Add Block
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handlePreview}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            👀 Preview
          </button>
          <button
            onClick={handleUpload}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            ⬆️ Upload
          </button>
        </div>
      </div>
    </div>
  );
}
