const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const blogRoutes = require("./routes/blog.js");
const adminAuthRoutes = require("./routes/auth.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Prerender middleware (only for frontend routes, not API)
const prerender = require("prerender-node");
prerender.set("prerenderToken", process.env.PRERENDER_TOKEN);

// Only run prerender for non-API, non-static routes
app.use((req, res, next) => {
  if (req.url.startsWith("/api") || req.url.startsWith("/static")) {
    return next();
  }
  prerender(req, res, next);
});

// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ API routes
app.use("/api", blogRoutes);
app.use("/api/admin", adminAuthRoutes);

// ✅ Serve React frontend (build folder)
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});


// ✅ Start server
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
