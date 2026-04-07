require("dotenv").config();
const sqs = require("./config/sqs");

const queueUrl = process.env.SQS_URL;

const pollMessages = async () => {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 10,
  };

  const data = await sqs.receiveMessage(params).promise();

  if (data.Messages) {
    for (const message of data.Messages) {
      const order = JSON.parse(message.Body);

      console.log("Processing payment for:", order);

      // Simulate payment processing
      await new Promise((res) => setTimeout(res, 2000));

      console.log("Payment successful for:", order);

      // Delete message
      await sqs.deleteMessage({
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle,
      }).promise();
    }
  }

  pollMessages();
};

pollMessages();