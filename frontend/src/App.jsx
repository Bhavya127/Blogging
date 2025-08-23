import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import BlogList from "./pages/BlogList";
import BlogEditor from "./pages/BlogEditor";
import BlogPreview from "./pages/BlogPreview";
import Login from "./components/Login";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />

          {/* Protected routes */}
         <Route
  path="/blogeditor"
  element={
    <AdminRoute>
      <BlogEditor />
    </AdminRoute>
  }
/>
<Route
  path="/blog-preview"
  element={
    <AdminRoute>
      <BlogPreview />
    </AdminRoute>
  }
/>


          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
