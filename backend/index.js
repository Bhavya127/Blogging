const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blog.js");
const adminAuthRoutes = require("./routes/auth.js");
require("dotenv").config();

const app = express();

// ✅ Prerender middleware
const prerender = require("prerender-node");
prerender.set("prerenderToken", process.env.PRERENDER_TOKEN); // free account token
app.use(prerender);

app.use(cors());
app.use(express.json());

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
