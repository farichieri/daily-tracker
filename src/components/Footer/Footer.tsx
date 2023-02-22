import Image from 'next/image';
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
  return (
    <footer>
      <div className='container'>
        <div className='first'>
          <span>
            <Link href='/'>DailyTracker</Link>
          </span>
          <p>Increase your productivity</p>
          <ul>
            {pages.map((page) => (
              <li key={page.name}>
                {!page.external ? (
                  <Link href={page.path} target={page.target} passHref>
                    <span>{page.name}</span>
                  </Link>
                ) : (
                  <ExternalLink href={page.path}>
                    <Image
                      src={`/icons/${page.name}.png`}
                      alt={page.name}
                      width={22}
                      height={22}
                    />
                  </ExternalLink>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className='second'>
          <p>Tracker</p>
          <p>Demo</p>
        </div>
      </div>
      <style jsx>{`
        footer {
          display: flex;
          width: 100%;
          margin-top: auto;
          padding: 4rem 2rem;
          gap: 2rem;
          background-color: var(--bg-color-secondary);
          border-top: 1px solid var(--box-shadow-light);
          padding: 2rem 3rem;
        }
        .container {
          max-width: var(--max-width);
        }
        .first {
          flex-direction: column;
        }
        .second {
          flex-direction: column;
        }
        div {
          height: 100%;
          width: 100%;
          display: flex;
          margin: auto;
          gap: 1rem;
          text-align: left;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          text-align: left;
          max-width: 400px;
          gap: 1rem;
          align-items: center;
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
