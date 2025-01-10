import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to another service if needed
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

/**
 * Function to send an email.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @returns {Promise<void>}
 */
export const sendMail = async (to, subject,  htmlContent) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL, // Sender's email address
      to,
      subject,
      html: htmlContent,
    });
    //(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw new Error('Error sending email');
  }
};
