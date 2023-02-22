import Link from 'next/link';
import { useRouter } from 'next/router';
import DarkMode from '../DarkMode/DarkMode';
import Logo from '../Logo/Logo';

const Nav = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const pages = [
    { name: 'Tracker', path: '/tracker' },
    { name: 'Newsletter', path: '/newsletter' },
    { name: 'Blog', path: '/blog' },
    { name: 'subscribe', path: '/subscribe' },
  ];

  const router = useRouter();
  console.log({ router });

  return (
    <nav>
      <Link href={'/'}>
        <Logo width={100} height={50} name={false} priority={false} />
      </Link>
      <span className='pages'>
        {router.route !== '/checkout' &&
          router.route !== '/subscribe' &&
          router.route !== '/checkout/[plan]' &&
          pages.map((page) => (
            <Link key={`nav-${page.name}`} href={page.path}>
              <span className={router.asPath === page.path ? 'selected' : ''}>
                {page.name}
              </span>
            </Link>
          ))}
      </span>
      <DarkMode theme={theme} setTheme={setTheme} />
      <Link href={'/user'}>
        <span className={router.asPath === '/user' ? 'selected' : ''}>
          Account
        </span>
      </Link>
      <style jsx>{`
        nav {
          display: flex;
          width: 100%;
          align-items: center;
          padding: 0 2rem;
          gap: 1rem;
          text-transform: capitalize;
          height: var(--nav-height);
          box-shadow: 0 0 10px 1px var(--box-shadow-light);
          z-index: 999;
          font-weight: bold;
          position: fixed;
          background: var(--bg-color);
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

export default Nav;
