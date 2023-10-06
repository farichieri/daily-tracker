import { learn_pages, more_pages, pages } from "../../../utils/pages";
import { useRouter } from "next/router";
import Link from "next/link";

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: JSX.Element;
}) => (
  <a target="_blank" rel="noopener noreferrer" href={href}>
    {children}
    <style jsx>
      {`
        a {
          display: flex;
        }
        a:hover {
          transform: scale(1.1);
        }
      `}
    </style>
  </a>
);

const Footer = () => {
  const router = useRouter();
  const showPages =
    router.route !== "/checkout" && router.route !== "/checkout/[plan]";

  return (
    <footer className="mx-auto mt-auto flex w-full max-w-5xl items-center justify-center border-t border-gray-500/20 py-8">
      <span className="text-sm opacity-70">2023 © Improve.me</span>
    </footer>
  );
};

export default Footer;
