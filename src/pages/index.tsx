import EmailInput from '@/components/EmailInput/EmailInput';
import MainLayout from '@/components/Layout/MainLayout';
import Pagination from '@/components/Pagination/Pagination';
import Posts from '@/components/Posts/Posts';
import { getSortedPostData } from '@/utils/posts';
import { useState } from 'react';

export default function Home({
  posts,
}: {
  posts: { title: string; id: string; date: string }[];
}) {
  const [postsState, setPostsState] = useState(posts);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = postsState.length;
  const blogsFrom = (currentPage - 1) * rowsPerPage;
  const blogsTo = currentPage * rowsPerPage;
  const currentPaginationData = postsState.slice(blogsFrom, blogsTo);
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const updatePage = (event: number) => {
    setCurrentPage(Number(event));
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
          <Posts posts={currentPaginationData} />
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={rowsPerPage}
            onPageChange={updatePage}
            totalPages={totalPages}
          />
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
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            padding: 1rem 1rem 2rem 1rem;
          }
          .header h1 {
            font-size: 2.5rem;
            font-weight: bold;
            line-height: 1.2;
            max-width: 600px;
          }
          .content {
            padding: 2rem 1rem;
            text-align: left;
            max-width: var(--max-width);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
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
