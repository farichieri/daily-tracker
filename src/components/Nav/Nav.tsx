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
    { name: 'home', path: '/' },
    { name: 'dashboard', path: '/dashboard' },
    { name: 'about', path: '/about' },
  ];

  const router = useRouter();

  return (
    <nav>
      <Link href={'/'}>
        <Logo width={100} height={50} name={false} priority={false} />
      </Link>
      {pages.map((page) => (
        <Link key={`nav-${page.name}`} href={page.path}>
          <span className={router.asPath === page.path ? 'selected' : ''}>
            {page.name}
          </span>
        </Link>
      ))}
      <DarkMode theme={theme} setTheme={setTheme} />
      <style jsx>{`
        nav {
          display: flex;
          width: 100%;
          align-items: center;
          border-bottom: 1px solid gray;
          padding: 0 1rem;
          gap: 1rem;
          text-transform: capitalize;
          height: var(--nav-height);
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
