// src/pages/Privacy.jsx
import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-lg mb-4">
        At <span className="font-semibold">TheLibraryBlogs</span>, we respect and
        value your privacy. This Privacy Policy explains how we collect, use, and
        safeguard your information when you visit or interact with our website.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="text-lg mb-2">
        We may collect personal information such as your name and email address
        if you subscribe to our newsletter, leave comments, or contact us directly.
        We also collect non-personal data like browser type, device information,
        and website usage statistics.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="text-lg mb-2">
        The information we collect is used to:
      </p>
      <ul className="list-disc pl-6 text-lg mb-4">
        <li>Provide you with blog updates, newsletters, and notifications.</li>
        <li>Respond to your questions, comments, or feedback.</li>
        <li>Improve our website content, design, and user experience.</li>
        <li>Monitor website performance and audience engagement.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Cookies & Analytics</h2>
      <p className="text-lg mb-2">
        We use cookies and analytics tools to understand visitor preferences,
        track performance, and enhance user experience. You can disable cookies
        in your browser settings, though some features of our website may not
        function properly without them.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Sharing of Information</h2>
      <p className="text-lg mb-2">
        We do not sell, rent, or trade your personal information to third parties.
        In limited cases, we may share data with trusted service providers who
        assist us in operating our website, provided they agree to keep your
        information secure and confidential.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Data Security</h2>
      <p className="text-lg mb-2">
        We take reasonable measures to protect your personal information from
        unauthorized access, disclosure, alteration, or destruction. However,
        please note that no method of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="text-lg mb-2">
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or legal requirements. Any updates will be posted on
        this page with a revised "Last Updated" date.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p className="text-lg">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at:{" "}
        <a
          href="mailto:contact@thelibraryblogs.com"
          className="text-blue-600 hover:underline"
        >
          contact@thelibraryblogs.com
        </a>
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Last Updated: August 22, 2025
      </p>
    </div>
  );
}
