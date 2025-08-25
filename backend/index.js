const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blog.js");
const adminAuthRoutes = require("./routes/auth.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Prerender middleware (only for frontend routes, not API)
const prerender = require("prerender-node");
prerender.set("prerenderToken", process.env.PRERENDER_TOKEN);

// Apply prerender ONLY to non-API routes
app.use((req, res, next) => {
  if (req.url.startsWith("/api")) {
    return next(); // Skip prerender for API calls
  }
  prerender(req, res, next);
});

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", blogRoutes);
app.use("/api/admin", adminAuthRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
