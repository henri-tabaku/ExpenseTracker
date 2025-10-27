// emailService.js
import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend("re_R8surxZh_JS1UVDhPncvwMgWuSeCR95Ar");

/**
 * Send an email using Resend
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject line
 * @param {string} html - HTML content of the email
 */
export async function sendEmail(to, subject, html) {
  try {
    const data = await resend.emails.send({
      from: "Expense Tracker <Email_API_Key@resend.dev>", // You can change this to your verified sender
      to,
      subject,
      html,
    });

    console.log(" Email sent:", data);
    return data;
  } catch (error) {
    console.error(" Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
