require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Product Service Running 🚀" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});

const productRoutes = require("./routes/productRoutes");
const sequelize = require("./config/db");

app.use("/api/products", productRoutes);

sequelize.sync()
  .then(() => console.log("DB connected"))
  .catch(console.error);