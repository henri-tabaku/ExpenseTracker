import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject line
 * @param {string} html - HTML content of the email
 */
export async function sendEmail(to, subject, html) {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "ildabiba6@gmail.com",  //Because I can only send testing emails to my own email address (ildabiba6@gmail.com) without a verified domain
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
