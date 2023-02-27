import AuthorLogo from '@/components/Layout/AuthorLogo/AuthorLogo';
import AuthorName from '@/components/Layout/AuthorName/AuthorName';
import NewsLetterInvitation from '@/components/NewsLetterInvitation/NewsLetterInvitation';
import Posts from '@/components/Posts/Posts';
import SubscribeInvitation from '@/components/SubscribeInvitation/SubscribeInvitation';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Date from '../../components/Layout/Date';
import MainLayout from '../../components/Layout/MainLayout';
import { getPostData, getSortedPostData } from '../../utils/posts';

const Post = ({
  postData,
  user,
  postsRecommended,
}: {
  postData: any;
  user: any;
  postsRecommended: any;
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (postData.premium) {
      if (user) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }
    } else {
      setShowContent(true);
    }
  }, [postData, user]);

  const getContent = (content: any) => {
    if (showContent) {
      return content;
    } else {
      return content.slice(0, 500);
    }
  };

  console.log(!user);
  console.log(!postData.premium);

  const showRecommendedContent = () => {
    if (postsRecommended.length > 0 && !postData.premium) {
      return true;
    } else if (postsRecommended.length > 0 && user) {
      return true;
    } else {
      return false;
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
            <AuthorName author={postData.author} style={null} /> - Published:
            <Date dateString={postData.date} />
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: getContent(postData.contentHtml) }}
        />
      </article>
      {!user && postData.premium && <SubscribeInvitation />}
      {!user && !postData.premium && <NewsLetterInvitation />}
      {showRecommendedContent() && (
        <div className='similar-content'>
          <h3>You might also like</h3>
          <Posts posts={postsRecommended} />
        </div>
      )}
      <style jsx>{`
        article {
          text-align: left;
          width: 100%;
          padding: 1rem 0;
          max-width: var(--max-width-content);
        }
        .post-header {
          display: flex;
          flex-direction: column;
        }
        .title {
          display: flex;
          align-items: center;
          font-size: 3rem;
        }
        .author {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin: 1rem 0;
        }
        .post-back {
          text-align: left;
          width: 100%;
        }
        .similar-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
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
  const allPostData = getSortedPostData();
  const sameTopicPosts = allPostData.filter(
    (post: any) => post.topic === postData.topic && post.id !== postData.id
  );
  const postsRecommended = [...sameTopicPosts]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  return {
    props: {
      postData,
      postsRecommended,
    },
  };
};
