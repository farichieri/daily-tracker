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
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0;
          align-items: center;
          width: 100px;
          height: 100%;
          min-height: 100vh;
          border-right: 1px solid var(--box-shadow-light);
        }
        .pages {
          display: flex;
          flex-direction: column;
        }
        span {
          border-radius: 999px;
          padding: 0.3rem 0;
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
