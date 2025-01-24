import nodemailer from "nodemailer";

export interface SendEmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  userAccessToken: string;
}

export async function sendEmail({
  from,
  to,
  subject,
  text,
  userAccessToken,
}: SendEmailOptions) {
  try {
    // Crie um transporte Nodemailer configurado com OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: from,
        clientId: process.env.GMAIL_CLIENT_ID!,
        clientSecret: process.env.GMAIL_CLIENT_SECRET!,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN!,
        accessToken: userAccessToken,
      },
    });

    // Envie o e-mail
    const info = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
