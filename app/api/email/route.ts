import { NextResponse, NextRequest } from 'next/server';

import nodemailer from 'nodemailer';

export async function GET(req: Request) {
  try {
    const to = 'mdasikuzzaman.en@gmail.com';
    const subject = 'Next js + Node mailer';
    const message = 'Hi, from node mailer...';

    const generateEmailHtml = (message: string, subject: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
  </head>
  <body style="background: purple; padding: 10px; border-radius: 5px;">
    <h1 style="text-align: center; color: white; font-size: 18px;">${subject}</h1>
    <h1 style="text-align: center; color: white; font-size: 22px; margin-top: 10px;">${message}</h1>
  </body>
  </html>
`;

    const html = generateEmailHtml(message, subject);

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'email@gmail.com',
        pass: process.env.APP_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'email@gmail.com',
      to,
      subject,
      html,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ message: 'Email sent successfully!!!' });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Email not sent.' });
    }
  } catch (error) {
    return NextResponse.json({ Error: 'Something went wrong' });
  }
}
