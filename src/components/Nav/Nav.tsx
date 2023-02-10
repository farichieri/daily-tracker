import Link from 'next/link';
import DarkMode from '../DarkMode/DarkMode';

const Nav = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const pages = [
    { name: 'home', path: '/' },
    { name: 'login', path: '/login' },
    { name: 'track', path: '/track' },
  ];

  return (
    <nav>
      {pages.map((page) => (
        <Link key={`nav-${page.name}`} href={page.path}>
          {page.name}
        </Link>
      ))}
      <DarkMode theme={theme} setTheme={setTheme} />
      <style jsx>{`
        nav {
          background: #00000080;
          display: flex;
          width: 100%;
          align-items: center;
          border-bottom: 1px solid gray;
          padding: 0 1rem;
          gap: 1rem;
          text-transform: capitalize;
        }
      `}</style>
    </nav>
  );
};

export default Nav;
