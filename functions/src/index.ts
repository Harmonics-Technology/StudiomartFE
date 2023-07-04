/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("YOUR_SENDGRID_API_KEY");

exports.sendEmailOnChat = functions.firestore
  .document("chat/{chatId}/messages/{messageId}")
  .onCreate(async (snapshot: any, context: any) => {
    const chatMessage = snapshot.data();
    const {recipientEmail, message} = chatMessage;

    const emailContent = {
      to: recipientEmail,
      from: "hello@studiomart.io",
      subject: "New Chat Message Received",
      text: `You have received a new chat message: ${message}`,
    };

    try {
      await sgMail.send(emailContent);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }

    return null;
  });
