require("dotenv").config();
const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Order Service Running 🚀" });
});

app.listen(5003, () => {
  console.log("Order service running on port 5003");
});