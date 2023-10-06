import MainLayout from "@/components/Layout/MainLayout";
import Image from "next/image";
import Link from "next/link";

const index = () => {
  const socialMedia = [
    {
      name: "twitter",
      url: "http://twitter.com",
    },
    {
      name: "email",
      url: "http://email.com",
    },
    {
      name: "linkedin",
      url: "http://linkedin.com",
    },
    {
      name: "facebook",
      url: "http://facebook.com",
    },
  ];
  return (
    <MainLayout>
      <div className="about">
        <h1 className="title">About</h1>
        <h2>What is this page?</h2>
        <p>
          We share the best self-improvement material to the world. How to build
          good habits and how tho remove the bad ones. How to achieve your goals
          faster and how to increase your productivity
        </p>
        <p>
          We give you the information you are looking for straight to the point
          and in an easy way.
        </p>
        <div>
          <h2>Who runs this website?</h2>
          <p>
            The person who runs this website is{" "}
            <Link href={"/author/fabricio-richieri"}>Fabricio Richieri</Link>
          </p>
        </div>
        <h2>Advertise with us!</h2>
        <p>
          If you want to advertise with us, please contact us{" "}
          <Link href={"mailto:frichieri.dev@gmail.com"}>here</Link>
        </p>
        <h2>Questions about this website?</h2>
        <p>
          Check out our frequently asked questions{" "}
          <Link href={"/FAQ"}>here</Link>
        </p>
        <h2>Find us on social media:</h2>
        <ul>
          {socialMedia.map((social, index) => (
            <li key={index}>
              🢝
              <Image
                alt={social.name}
                src={`/icons/${social.name}.png`}
                width={22}
                height={22}
              />
              <Link href={social.url}>{social.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .about {
          text-align: left;
          max-width: var(--max-width-content);
          padding: 1rem 0;
        }
        .title {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        ul {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        li {
          gap: 0.25rem;
          display: flex;
          text-transform: capitalize;
          align-items: center;
        }
      `}</style>
    </MainLayout>
  );
};

export default index;
