require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Auth Service Running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Connecting database
const sequelize = require("./config/db");

sequelize.sync()
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Updating ProtectedRoutes

const ProtectedRoutes = require("./routes/protectedRoutes");
app.use("/api/protected", ProtectedRoutes);
  