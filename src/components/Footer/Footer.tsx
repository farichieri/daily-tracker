import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { learn_pages, more_pages, pages } from '../../utils/pages';

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: JSX.Element;
}) => (
  <a target='_blank' rel='noopener noreferrer' href={href}>
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
    router.route !== '/checkout' && router.route !== '/checkout/[plan]';

  return (
    <footer>
      <div className='container'>
        <div className='first'>
          <span className='logo'>
            <Link href='/'>DailyTracker</Link>
          </span>
          {showPages && (
            <p>
              Increase your productivity learning from the best and using proven
              tools
            </p>
          )}
          <ul>
            {pages.map((page) => (
              <li key={page.name}>
                {!page.external && (
                  <Link href={page.path} target={page.target} passHref>
                    <span
                      className={router.route === page.path ? 'selected' : ''}
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
          <div className='links'>
            <div className='block'>
              <ul>
                <h3>Learn</h3>
                {learn_pages.map((page) => (
                  <li key={page.name}>
                    <Link href={page.path} target={page.target} passHref>
                      <span
                        className={router.route === page.path ? 'selected' : ''}
                      >
                        {page.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='block'>
              <ul>
                <h3>More</h3>
                {more_pages.map((page) => (
                  <li key={page.name}>
                    <Link href={page.path} target={page.target} passHref>
                      <span
                        className={router.route === page.path ? 'selected' : ''}
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
      <style jsx>{`
        footer {
          display: flex;
          font-weight: 500;
          justify-content: center;
          align-items: center;
          margin-top: auto;
          min-height: var(--footer-height);
          padding: 1rem 1.5rem;
          width: 100%;
          font-size: 90%;
        }
        .container {
          max-width: var(--max-width);
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
        }
        .first {
          flex-direction: ${showPages ? 'column' : 'row'};
          text-align: left;
          max-width: ${showPages ? '400px' : '100%'};
          align-items: ${showPages ? 'start' : 'center'};
          justify-content: space-between;
          width: 100%;
        }
        .links {
          width: 400px;
          justify-content: space-between;
        }
        .block {
          flex-direction: column;
        }
        .block p {
          font-weight: bold;
        }
        div {
          display: flex;
          text-align: left;
        }
        .first ul {
          display: flex;
          gap: 1rem;
          font-size: 80%;
          margin: 0.25rem 0;
        }
        span {
          transition: 0.3s;
          font-size: 12px;
        }
        li {
          line-height: 1;
        }
        .block ul {
          display: flex;
          flex-direction: column;
        }
        p {
          margin: 0.2rem 0;
          font-size: 90%;
        }
        .logo {
          font-size: 1.2em;
          font-weight: 600;
        }
        span.selected {
          color: var(--text-color);
        }
        ul,
        ol {
          list-style: none;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
