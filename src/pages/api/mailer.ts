import { db } from '@/utils/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const mailer = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = JSON.parse(req.body);
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
    await setDoc(doc(db, 'newsletter', email), {
      date: new Date().toLocaleDateString(),
    });
    await transporter.sendMail({
      from: `${process.env.NEXT_PUBLIC_EMAIL_DEV}`,
      to: email,
      subject: `Welcome to Daily Tracker!`,
      html: `
      <div>
        <p>Welcome!</p><br>
        <p>My name is Fabricio, founder of <b>Daily Tracker</b>. I just wanted to give you a warm welcome and thank you for joining our newsletter. It really means a lot.</p><br>
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
