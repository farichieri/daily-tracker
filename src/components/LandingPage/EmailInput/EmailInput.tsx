import { useState } from "react";
import Image from "next/image";

const EmailInput = ({ textButton }: { textButton: string }) => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError(false);
    setAdded(false);
    if (email) {
      setSending(true);
      fetch("/api/mailer", {
        method: "POST",
        body: JSON.stringify({ email }),
      }).then((response) => {
        console.log(response);
        if (response.ok) {
          setAdded(true);
        } else {
          setError(true);
        }
        setSending(false);
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
      {added && (
        <div className="rounded-lg border-2 border-green-900 bg-green-500 p-2 font-bold text-black">
          Thank you for joining us!
        </div>
      )}
      {error && (
        <div className="rounded-lg border-2 border-red-900 bg-red-500/50 p-2 font-bold text-black">
          We could not add you to the newsletter, please try again later!
        </div>
      )}
    </div>
  );
};

export default EmailInput;
