// src/pages/Contact.jsx
import React from "react";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg mb-6">
        We’d love to hear from you! Whether you have a question, feedback,
        partnership opportunity, or just want to say hello, we’re always happy
        to connect.  
      </p>

      <p className="text-lg mb-6">
        The best way to reach us is via email. Drop us a message and our team
        will get back to you as soon as possible. We usually respond within{" "}
        <span className="font-semibold">24–48 hours</span>.
      </p>

      <div className="bg-gray-100 p-6 rounded-xl shadow-md">
        <p className="text-xl font-semibold mb-2">📧 Email Us</p>
        <a
          href="mailto:contact@boundlessminds.com"
          className="text-blue-600 hover:underline text-lg"
        >
          contact@thelibraryblogs.com
        </a>
      </div>

      <p className="text-lg mt-8">
        Thank you for visiting our website. We look forward to hearing from you
        and will do our best to assist you with any queries.
      </p>
    </div>
  );
}
