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
    <footer className="mt-auto flex items-center justify-center">
      <div className="flex w-full max-w-[var(--max-width)] flex-wrap items-center justify-around border-t border-[var(--box-shadow-light)] py-8">
        <div className="flex flex-col gap-1">
          <span className="semibold text-xl">
            <Link href="/">Improve.me</Link>
          </span>
          {showPages && (
            <p className="text-xs">
              Increase your productivity learning from the best and using proven
              tools
            </p>
          )}
          <ul className="flex list-none gap-2">
            {pages.map((page) => (
              <li key={page.name}>
                {!page.external && (
                  <Link href={page.path} target={page.target} passHref>
                    <span
                      className={`text-xs ${
                        router.route === page.path
                      } ? "selected" : ""`}
                    >
                      {page.name}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        {showPages && (
          <div className="flex w-96 justify-between">
            <div className="flex flex-col">
              <ul className="flex list-none flex-col gap-1">
                <p>Learn</p>
                {learn_pages.map((page) => (
                  <li key={page.name} className="text-xs">
                    <Link href={page.path} target={page.target} passHref>
                      <span
                        className={`text-xs
                          ${router.route === page.path}
                            ? "text-[var(--text-color)]"
                            : ""`}
                      >
                        {page.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col ">
              <ul className="flex list-none flex-col gap-1">
                <p>More</p>
                {more_pages.map((page) => (
                  <li key={page.name} className="text-xs">
                    <Link href={page.path} target={page.target} passHref>
                      <span
                        className={`text-xs
                          ${router.route === page.path}
                            ? "text-[var(--text-color)]"
                            : ""`}
                      >
                        {page.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
