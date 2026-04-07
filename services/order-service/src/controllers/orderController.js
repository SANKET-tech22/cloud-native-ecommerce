const sqs = require("../config/sqs");

exports.createOrder = async (req, res) => {
  try {
    console.log("Request received:", req.body);

    const order = req.body;

    const params = {
      QueueUrl: process.env.SQS_URL,
      MessageBody: JSON.stringify(order),
    };

    const result = await sqs.sendMessage(params).promise();

    console.log("Message sent to SQS:", result);

    res.json({ message: "Order placed and event sent" });

  } catch (error) {
    console.error("Error sending to SQS:", error);

    res.status(500).json({
      message: "Failed to send order",
      error: error.message,
    });
  }
};