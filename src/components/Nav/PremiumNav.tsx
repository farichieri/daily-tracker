import Link from 'next/link';
import { useRouter } from 'next/router';
import Logout from '../Auth/Logout';

const PremiumNav = () => {
  const pages = [
    { name: 'Account', path: '/user' },
    { name: 'Dashboard', path: '/user/dashboard' },
  ];

  const router = useRouter();

  return (
    <nav>
      <span className='pages'>
        {pages.map((page) => (
          <Link key={`nav-${page.name}`} href={page.path}>
            <span className={router.asPath === page.path ? 'selected' : ''}>
              {page.name}
            </span>
          </Link>
        ))}
      </span>{' '}
      <Logout />
      <style jsx>{`
        nav {
          display: flex;
          gap: 1rem;
          padding: 0.25rem 2rem;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: #252525;
          position: fixed;
        }
        .pages {
          margin: auto;
        }
        span {
          border-radius: 999px;
          padding: 0.3rem 0.5rem;
          border: 1px solid transparent;
          display: flex;
        }
        span.selected {
          border: 1px solid var(--text-color);
          color: var(--text-color);
        }
      `}</style>
    </nav>
  );
};

export default PremiumNav;
