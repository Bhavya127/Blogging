// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">About TheLibraryBlogs</h1>

      <p className="text-lg mb-4">
        Welcome to <span className="font-semibold">TheLibraryBlogs</span> — a
        space where ideas, technology, and creativity come together. We are
        dedicated to delivering insightful blogs on technology, AI, coding,
        education, self-growth, and more. Our goal is to inspire and empower
        learners, developers, and thinkers across the globe.
      </p>

      <p className="text-lg mb-4">
        At <span className="font-semibold">TheLibraryBlogs</span>, we believe
        knowledge should be <span className="font-semibold">accessible,
        practical, and engaging</span>. We write with the intention of making
        complex topics simple, useful, and enjoyable for everyone — from curious
        beginners to advanced professionals.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Mission</h2>
      <p className="text-lg mb-4">
        To inspire continuous learning by providing high-quality, thoughtful
        content that sparks curiosity, encourages problem-solving, and equips
        readers with practical knowledge they can apply in real life.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Vision</h2>
      <p className="text-lg mb-4">
        To build a global community of learners and innovators where{" "}
        <span className="font-semibold">learning is limitless and curiosity
        knows no bounds</span>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Values</h2>
      <ul className="list-disc pl-6 text-lg mb-4">
        <li>
          <strong>Knowledge for All:</strong> Making information easy to
          understand and freely accessible.
        </li>
        <li>
          <strong>Creativity:</strong> Encouraging curiosity, imagination, and
          innovation in every topic we cover.
        </li>
        <li>
          <strong>Growth Mindset:</strong> Learning never stops — and neither do
          we.
        </li>
        <li>
          <strong>Community:</strong> Building connections with readers, learners,
          and creators worldwide.
        </li>
      </ul>

      <p className="text-lg mt-6">
        Thank you for being part of{" "}
        <span className="font-semibold">TheLibraryBlogs</span>. Together, let’s
        explore, learn, and grow — one blog at a time.
      </p>
    </div>
  );
}
