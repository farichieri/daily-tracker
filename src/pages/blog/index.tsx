import MainLayout from '@/components/Layout/MainLayout';
import Posts from '@/components/Posts/Posts';
import { getSortedPostData } from '@/utils/posts';
import Link from 'next/link';

const Blog = ({
  posts,
  user,
}: {
  posts: { title: string; id: string; date: string }[];
  user: any;
}) => {
  return (
    <MainLayout withPadding={true}>
      <section>
        <h1 style={{ width: '100%', textAlign: 'left' }}>Blog</h1>
        <Posts posts={posts} />
      </section>
      <style jsx>
        {`
          section {
            max-width: var(--max-width);
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
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
