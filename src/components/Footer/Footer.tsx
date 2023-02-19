import Link from 'next/link';
import { pages } from '../../utils/pages';

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: JSX.Element;
}) => (
  <a target='_blank' rel='noopener noreferrer' href={href}>
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer>
      <div>
        <ul>
          {pages.map((page) => (
            <li key={page.name}>
              {page.external ? (
                <ExternalLink href={page.path}>
                  <span>{page.name}</span>
                </ExternalLink>
              ) : (
                <Link href={page.path} target={page.target} passHref>
                  <span>{page.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        <span className='copyright'>
          <Link href={'https://github.com/farichieri'} target={'_blank'}>
            © 2023 DailyTracker, Inc.
          </Link>
        </span>
      </div>
      <style jsx>{`
        footer {
          display: flex;
          width: 100%;
          margin-top: auto;
          padding: 2rem;
          flex-direction: column;
          gap: 2rem;
          background-color: var(--bg-color-secondary);
        }
        div {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          max-width: 600px;
          margin: auto;
          gap: 1rem;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          text-align: left;
        }
        li {
          width: 25%;
          padding: 0.25rem 1rem;
        }
        span {
          transition: 0.3s;
        }
        span:hover {
          color: var(--textColor);
        }
        .copyright {
          margin-right: auto;
          font-size: 80%;
          padding: 0 1rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
