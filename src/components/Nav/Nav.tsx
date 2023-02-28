import { nav_pages } from '@/utils/pages';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DarkMode from '../DarkMode/DarkMode';
import Logo from '../Logo/Logo';

const Nav = ({
  theme,
  setTheme,
  user,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  user: any;
}) => {
  const router = useRouter();
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [userName, setUserName] = useState('Account');

  const handleMenu = () => {
    setHamburgerActive(!hamburgerActive);
  };

  const showPages =
    router.route !== '/checkout' &&
    router.route !== '/subscribe' &&
    router.route !== '/checkout/[plan]';

  useEffect(() => {
    if (user) {
      setUserName(user.email.slice(0, user.email.indexOf('@')));
    } else {
      setUserName('Account');
    }
  }, [user]);

  return (
    <nav>
      <div className='nav-content'>
        <div style={{ gap: '.5rem' }}>
          {showPages && (
            <div
              onClick={handleMenu}
              className={`hamburger ${hamburgerActive ? 'active' : ''}`}
            >
              <div className='bar'></div>
            </div>
          )}
          <Link href={'/'}>
            <Logo width={100} height={50} name={false} priority={false} />
          </Link>
        </div>
        <div className={`pages ${hamburgerActive ? 'active' : ''}`}>
          {showPages &&
            nav_pages.map((page) => (
              <Link
                key={`nav-${page.name}`}
                href={page.path}
                onClick={handleMenu}
              >
                <span
                  className={`${page.name} ${
                    router.asPath === page.path ? 'selected' : ''
                  }`}
                >
                  {page.name}
                </span>
              </Link>
            ))}
        </div>
        <div>
          <Link href={'/user'} onClick={handleMenu}>
            <span className={router.asPath === '/user' ? 'selected' : ''}>
              {userName}
            </span>
          </Link>
          <DarkMode theme={theme} setTheme={setTheme} />
        </div>
      </div>
      <style jsx>{`
        nav {
          align-items: center;
          display: flex;
          position: fixed;
          height: var(--nav-height);
          justify-content: space-between;
          width: 100%;
          backdrop-filter: blur(12px);
          font-weight: 600;
          z-index: 9999;
        }
        div {
          z-index: 999;
          display: flex;
          align-items: center;
        }
        .nav-content {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: var(--max-width);
          margin: auto;
          padding: 0 1rem;
        }

        .logo,
        .logo:hover {
          color: inherit;
        }

        .pages {
          display: flex;
          gap: 1rem;
          text-transform: capitalize;
        }

        a:hover {
          color: white;
          filter: brightness(2);
        }
        span.selected {
          color: var(--text-color);
          font-weight: bold;
        }
        .pages li {
          display: inline-block;
          border-radius: 8px;
          text-transform: capitalize;
          margin: 0 0.2rem;
          background: red;
          padding: 0.4rem;
        }

        .hamburger {
          height: 60px;
          display: inline-block;
          border-radius: 50%;
          position: relative;
          align-items: center;
          justify-content: center;
          z-index: 100;
          cursor: pointer;
          transform: scale(0.8);
          animation-duration: 2s;
          animation-name: appear;
          z-index: 3;
          display: none;
        }

        .hamburger::after {
          position: absolute;
          content: '';
          height: 100%;
          width: 100%;
        }

        .hamburger .bar {
          height: 2px;
          width: 30px;
          position: relative;
          background-color: var(--link-color);
          z-index: 4;
        }

        .hamburger .bar::after,
        .hamburger .bar::before {
          content: '';
          position: absolute;
          height: 100%;
          width: 100%;
          left: 0;
          background-color: var(--link-color);
          transition: 0.3s linear;
          transition-property: top, bottom;
        }

        .hamburger .bar::after {
          top: 8px;
        }

        .hamburger .bar::before {
          bottom: 8px;
        }

        .hamburger.active .bar::before {
          bottom: 0;
        }

        .hamburger.active .bar::after {
          top: 0;
        }

        h1 {
          filter: brightness(2);
          font-size: 2rem;
          min-width: fit-content;
          font-weight: 400;
        }

        .Home {
          display: none;
        }
        @media only screen and (max-width: 768px) {
          .Home {
            display: flex;
          }
          .hamburger {
            display: flex;
          }

          h1 {
            font-size: 2vh;
          }
          .pages {
            position: fixed;
            list-style: none;
            background-color: var(--nav-background-color);
            opacity: 0.95;
            width: 100vw;
            height: 100vh;
            right: 100%;
            top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 2;
            overflow-x: hidden;
            transition: 0.3s linear right;
            min-width: 100vw;
            font-size: 1.5rem;
          }
          .pages.active {
            left: 0;
            margin: 0;
            padding: 0;
            min-width: 100vw;
          }
        }
        @media only screen and (max-width: 400px) {
          nav {
            padding: 0 0.5rem;
          }
          h1 {
            font-size: 1.6vh;
          }
        }
        @keyframes appear {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  );
};

export default Nav;
