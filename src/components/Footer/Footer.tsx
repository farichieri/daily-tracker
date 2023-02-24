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
                <p>Learn</p>
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
                <p>More</p>
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
          width: 100%;
          margin-top: auto;
          background-color: var(--bg-color-secondary);
          border-top: 1px solid var(--box-shadow-light);
          padding: 2.5rem 1.5rem;
          justify-content: center;
          font-weight: 500;
          min-height: var(--footer-height);
        }
        .container {
          max-width: var(--max-width);
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
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
          width: 100%;
          max-width: 400px;
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
          gap: 1rem;
          text-align: left;
        }
        .first ul {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
        }
        span {
          transition: 0.3s;
        }
        .block ul {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .logo {
          font-size: 1.2em;
          font-weight: 600;
        }
        span.selected {
          color: var(--text-color);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
