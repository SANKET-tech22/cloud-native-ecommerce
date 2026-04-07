const sqs = require("../config/sqs");

exports.createOrder = async (req, res) => {
  const order = req.body;

  const params = {
    QueueUrl: process.env.SQS_URL,
    MessageBody: JSON.stringify(order),
  };

  await sqs.sendMessage(params).promise();

  res.json({ message: "Order placed and event sent" });
};