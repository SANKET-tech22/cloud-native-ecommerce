const redis = require("../config/redis");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const key = `cart:${userId}`;

  await redis.hset(key, productId, quantity);

  res.json({ message: "Added to cart" });
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  const cart = await redis.hgetall(`cart:${userId}`);

  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  await redis.hdel(`cart:${userId}`, productId);

  res.json({ message: "Removed from cart" });
};