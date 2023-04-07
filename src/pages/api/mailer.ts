import { db } from "@/utils/firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const mailer = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = JSON.parse(req.body);
    console.log(email);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
      },
    });
    await setDoc(doc(db, "newsletter", email), {
      timestamp: serverTimestamp(),
    });

    await transporter.sendMail({
      from: `${process.env.NEXT_PUBLIC_EMAIL_DEV}`,
      to: `${email}`,
      subject: `Welcome to Improve.me!`,
      html: `
      <div>
        <p>Welcome!</p><br>
        <p>My name is Fabricio, founder of <b>Improve.me</b>. I just wanted to give you a warm welcome and thank you for joining our newsletter. It really means a lot.</p><br>
      </div>
      `,
    });
    return res.status(200).json({ error: "" });
  } catch (error) {
    console.log({ error });
    error instanceof Error
      ? res.status(500).json({ error: error.message || error.toString() })
      : res.json({ msg: "unexpected error" });
  }
};

export default mailer;
