import EmailInput from '@/components/EmailInput/EmailInput';
import Button from '@/components/Layout/Button/Button';
import MainLayout from '@/components/Layout/MainLayout';
import Posts from '@/components/Posts/Posts';
import { getSortedPostData } from '@/utils/posts';
import { useRouter } from 'next/router';

export default function Home({
  posts,
}: {
  posts: { title: string; id: string; date: string }[];
}) {
  const router = useRouter();
  const handleStart = (e: any) => {
    e.preventDefault();
    router.push('/subscribe');
  };
  return (
    <MainLayout withPadding={false}>
      <div className='home'>
        <div className='header'>
          <h1>
            Increase your productivity with the best achievement tips in the
            world.
          </h1>
          <p>Receive the best information to achieve your goals weekly</p>
          <EmailInput textButton={'Join Free'} />
        </div>
        <div className='content'>
          <h1>Featured posts</h1>
          <Posts posts={posts} />
        </div>
      </div>
      <style jsx>
        {`
          .home {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 1rem 0;
          }
          .header {
            width: 100%;
            border-bottom: 1px solid var(--box-shadow-light);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            padding: 1rem 0 2rem 0;
          }
          .header h1 {
            font-size: 2.5rem;
            font-weight: bold;
            line-height: 1.2;
            max-width: 600px;
          }
          .content {
            margin: 2rem 0;
            text-align: left;
            max-width: var(--max-width);
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
        `}
      </style>
    </MainLayout>
  );
}

export const getStaticProps = async () => {
  const allPostData = getSortedPostData();

  return {
    props: { posts: allPostData },
  };
};
