import { authors } from '@/utils/authors';
import Link from 'next/link';

const AuthorName = ({ author, style }: { author: string; style: any }) => {
  const authorName = authors.find((auth) => auth.slug == author)?.name;
  return (
    <Link href={`/author/${author}`}>
      <span style={style}>{authorName}</span>
      <style jsx>
        {`
          span {
          }
        `}
      </style>
    </Link>
  );
};

export default AuthorName;
