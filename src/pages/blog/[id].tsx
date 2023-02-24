import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Date from '../../components/Layout/Date';
import MainLayout from '../../components/Layout/MainLayout';
import { getAllPostsIds, getPostData } from '../../utils/posts';

const Post = ({ postData }: { postData: any }) => {
  return (
    <MainLayout withPadding={true}>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <div className='post-header'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
          >
            <h1>{postData.title}</h1>
          </div>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <div className='post-back'>
        <Link href={'/blog'}>{'<'} Back to all posts</Link>
      </div>
      <style jsx>{`
        article {
          text-align: left;
          width: 100%;
          min-height: 100vh;
          max-width: 900px;
        }
        .post-header {
          margin-bottom: 1rem;
        }
        .post-back {
          text-align: left;
          width: 100%;
        }
      `}</style>
    </MainLayout>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const paths = getAllPostsIds();
  console.log({ paths });
  console.log(paths[0]);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  console.log({ params });
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};
