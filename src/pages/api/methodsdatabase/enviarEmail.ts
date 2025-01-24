// pages/api/enviarEmail.ts

import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN, // Pode não ser necessário
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "E-mail enviado com sucesso!", info });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({
      error: "Erro ao enviar e-mail. Por favor, tente novamente mais tarde.",
    });
  }
}
