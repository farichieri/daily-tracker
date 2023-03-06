import Link from 'next/link';
import { useRouter } from 'next/router';
import DarkMode from '../DarkMode/DarkMode';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';

const PremiumNav = () => {
  const user = useSelector(selectUser);
  const userName = user?.email
    ? user.email.slice(0, user.email.indexOf('@'))
    : '';

  const pages = [{ name: 'Tracker', path: '/tracker' }];

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
      </span>
      <div>
        <Link href={'/user'}>
          <span
            className={`user ${router.asPath === '/user' ? 'selected' : ''}`}
          >
            {userName}
          </span>
        </Link>
        <DarkMode />
      </div>
      <style jsx>{`
        nav {
          align-items: center;
          display: flex;
          gap: 1rem;
          height: var(--premium-nav-height);
          padding: 0;
          position: fixed;
          top: 0;
          width: 100%;
          backdrop-filter: blur(12px);
          justify-content: space-between;
          padding: 0 1rem;
          z-index: 1000;
        }
        .pages {
          display: flex;
          gap: 1rem;
        }
        span {
          border-radius: 999px;
          padding: 0.3rem 0;
          border: 1px solid transparent;
          display: flex;
        }
        span.selected {
          color: var(--text-color);
          font-weight: bold;
        }
        div {
          display: flex;
        }
      `}</style>
    </nav>
  );
};

export default PremiumNav;
