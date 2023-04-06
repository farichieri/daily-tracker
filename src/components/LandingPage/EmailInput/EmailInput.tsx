import Image from "next/image";
import { useState } from "react";

const EmailInput = ({ textButton }: { textButton: string }) => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [added, setAdded] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email) {
      setSending(true);
      fetch("/api/mailer", {
        method: "post",
        body: JSON.stringify({ email }),
      })
        .then((response) => {
          if (response.ok) {
            setAdded(true);
          }
          setSending(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
      setEmail("");
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form
        className="flex w-full max-w-lg items-center justify-center gap-1 p-1 "
        onSubmit={handleSubmit}
      >
        <Image
          alt="envelope-icon"
          src={"/icons/email.png"}
          height={20}
          width={20}
        />
        <input
          className="w-[75%] rounded-md border border-[var(--text-color)] bg-slate-50 p-2 font-bold text-black outline-none focus:bg-slate-200"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
        />
        <button className="flex h-full w-[25%] items-center justify-center rounded-md border border-[var(--text-color)] p-2">
          {sending ? <span>{"Joining..."}</span> : <span>{textButton}</span>}
        </button>
      </form>
      {added && <div className="added">Thank you for joining us!</div>}

      <style jsx>{`
        .added {
          background: #3cda3c;
          max-width: 600px;
          margin: 0 1rem;
          padding: 0.5rem;
          border-radius: 5px;
          border: 2px solid green;
          font-weight: bold;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default EmailInput;
