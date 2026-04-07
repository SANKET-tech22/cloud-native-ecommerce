
// require("dotenv").config();
require("dotenv").config({ path: "./.env" });
console.log("ENV VALUE:", process.env.NOTIFICATION_QUEUE_URL);
const sqs = require("./config/sqs");

const queueUrl = process.env.NOTIFICATION_QUEUE_URL;

const pollMessages = async () => {
  const data = await sqs.receiveMessage({
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 10,
  }).promise();

  if (data.Messages) {
    for (const message of data.Messages) {
      const event = JSON.parse(message.Body);

      console.log("Sending notification:", event);

      // Simulate email/SMS
      await new Promise((res) => setTimeout(res, 1000));

      console.log("Notification sent");

      await sqs.deleteMessage({
        QueueUrl: queueUrl,
        ReceiptHandle: message.ReceiptHandle,
      }).promise();
    }
  }

  pollMessages();
};

pollMessages();