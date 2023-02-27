import MainLayout from '@/components/Layout/MainLayout';
import Posts from '@/components/Posts/Posts';
import { getSortedPostData } from '@/utils/posts';

const Blog = ({
  posts,
  user,
}: {
  posts: { title: string; id: string; date: string }[];
  user: any;
}) => {
  return (
    <MainLayout withPadding={false}>
      <section>
        <div className='header'>
          <h1>All our content</h1>
        </div>
        <Posts posts={posts} />
      </section>
      <style jsx>
        {`
          section {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }
          .header {
            background: var(--bg-color-secondary);
            width: 100%;
            height: 10rem;
            align-items: center;
            display: flex;
            justify-content: center;
          }
          h1 {
            font-size: 2rem;
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
