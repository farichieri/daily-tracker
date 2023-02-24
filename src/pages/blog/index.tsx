import MainLayout from '@/components/Layout/MainLayout';
import { getSortedPostData } from '@/utils/posts';
import Link from 'next/link';

const Blog = ({
  posts,
}: {
  posts: { title: string; id: string; date: string }[];
}) => {
  return (
    <MainLayout withPadding={true}>
      <section>
        <h1 style={{ width: '100%', textAlign: 'left' }}>Blog</h1>
        {posts.map((post) => (
          <div>
            <Link href={`/blog/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
          </div>
        ))}
      </section>
      <style jsx>
        {`
          section {
            max-width: var(--max-width);
            width: 100%;
          }
        `}
      </style>
    </MainLayout>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const allPostData = getSortedPostData();

  return {
    props: { posts: allPostData },
  };
};
