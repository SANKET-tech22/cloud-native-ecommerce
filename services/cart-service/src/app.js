require("dotenv").config();
const express = require("express");
const cors = require("cors");

const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cart", cartRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Cart Service Running 🚀" });
});

app.listen(5002, () => {
  console.log("Cart service running on port 5002");
});