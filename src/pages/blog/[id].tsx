import AuthorLogo from '@/components/Layout/AuthorLogo/AuthorLogo';
import AuthorName from '@/components/Layout/AuthorName/AuthorName';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Date from '../../components/Layout/Date';
import MainLayout from '../../components/Layout/MainLayout';
import { getPostData } from '../../utils/posts';

const Post = ({ postData, user }: { postData: any; user: any }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (postData.premium) {
      if (user) {
        setShow(true);
      } else {
        setShow(false);
      }
    } else {
      setShow(true);
    }
  }, [postData, user]);

  const getContent = (content: any) => {
    if (show) {
      return content;
    } else {
      return content.slice(0, 10);
    }
  };

  return (
    <MainLayout withPadding={true}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <div className='post-header'>
          <div className='title'>
            <h1>{postData.title}</h1>
          </div>
          <div className='author'>
            <AuthorLogo author={postData.author} width={30} height={30} />
            <AuthorName author={postData.author} style={null} />
          </div>
          <Date dateString={postData.date} />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: getContent(postData.contentHtml) }}
        />
      </article>
      <style jsx>{`
        article {
          text-align: left;
          width: 100%;
          min-height: 100vh;
          max-width: var(--max-width-content);
        }
        .post-header {
          display: flex;
          gap: 1rem;
          flex-direction: column;
        }
        .title {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }
        .author {
          display: flex;
          gap: 0.5rem;
          align-items: center;
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

// export const getStaticPaths = async () => {
//   const paths = getAllPostsIds();
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async ({ params }: { params: any }) => {
//   const postData = await getPostData(params.id);
//   return {
//     props: {
//       postData,
//     },
//   };
// };

export const getServerSideProps = async ({ params }: { params: any }) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};
