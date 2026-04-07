const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.AWS_REGION,
});

const sqs = new AWS.SQS();

module.exports = sqs;