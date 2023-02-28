import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const mailer = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message } = JSON.parse(req.body);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
    },
  });
  try {
    await transporter.sendMail({
      from: email,
      to: `${process.env.NEXT_PUBLIC_EMAIL_DEV}`,
      subject: `[Advertisement Form] - ${name}`,
      html: `
      <div>
        <p><strong>Name: </strong> ${name}</p>
        <p><strong>Email: </strong> ${email}</p>
        <p><strong>Message: </strong> ${message}</p>
      </div>
      `,
    });
  } catch (error) {
    error instanceof Error
      ? res.status(500).json({ error: error.message || error.toString() })
      : res.json({ msg: 'unexpected error' });
  }
  return res.status(200).json({ error: '' });
};

export default mailer;
