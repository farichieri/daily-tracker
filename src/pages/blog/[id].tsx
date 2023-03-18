import AD from '@/components/LandingPage/AD/AD';
import AuthorLogo from '@/components/Layout/AuthorLogo/AuthorLogo';
import AuthorName from '@/components/Layout/AuthorName/AuthorName';
import NewsLetterInvitation from '@/components/LandingPage/NewsLetterInvitation/NewsLetterInvitation';
import Posts from '@/components/Posts/Posts';
import SubscribeInvitation from '@/components/LandingPage/SubscribeInvitation/SubscribeInvitation';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/slices/authSlice';
import Date from '../../components/Layout/Date';
import MainLayout from '../../components/Layout/MainLayout';
import { getPostData, getSortedPostData } from '../../utils/posts';

const Post = ({
  postData,
  postsRecommended,
}: {
  postData: any;
  postsRecommended: any;
}) => {
  const [showContent, setShowContent] = useState(false);
  const { user } = useSelector(selectUser);

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
      return content.slice(0, 500).concat('<span>...</span>');
    }
  };

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
      <div className='post-container'>
        <div className='post-main'>
          <article>
            <div className='post-header'>
              <h1 className='title'>{postData.title}</h1>
              <div className='author'>
                <AuthorLogo author={postData.author} width={30} height={30} />
                <AuthorName author={postData.author} style={null} /> -
                Published:
                <Date dateString={postData.date} />
              </div>
            </div>
            {!user && (
              <div className='mobile_ad'>
                <AD />
              </div>
            )}
            <div
              className='post-content'
              dangerouslySetInnerHTML={{
                __html: getContent(postData.contentHtml),
              }}
            />
            {/* <div className='sidebar'>
              <div className='fixed'>{!user && <AD />}</div>
            </div> */}
          </article>
          {!user && postData.premium && <SubscribeInvitation />}
          {!user && !postData.premium && <NewsLetterInvitation />}
          {showRecommendedContent() && (
            <div className='similar-content'>
              <h3>Related content</h3>
              <Posts posts={postsRecommended} />
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .post-container {
          display: flex;
          position: relative;
          max-width: 1200px;
        }
         {
          /* margin-right: ${!user && '300px'}; */
        }
        .post-main {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .sidebar {
          position: absolute;
          right: 0;
          top: 0;
          padding: 1rem 0;
        }
        .fixed {
          padding: 0 1rem;
          position: fixed;
          max-width: 300px;
          height: 100%;
        }
        article {
          text-align: left;
          width: 100%;
          padding: 1rem 0;
          max-width: var(--max-width-content);
          position: relative;
        }
        .post-header {
          display: flex;
          flex-direction: column;
        }
        .title {
          line-height: 1.2;
          font-size: 3.5rem;
          font-weight: 800;
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
          width: 100%;
        }
        .mobile_ad {
          display: none;
        }
        .post-content {
          border-bottom: 1px solid var(--box-shadow-light);
          border-top: 1px solid var(--box-shadow-light);
        }
        @media screen and (max-width: 1000px) {
          .sidebar {
            display: none;
          }
          .post-container {
            margin-right: 0;
          }
          .mobile_ad {
            display: flex;
          }
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
    .slice(0, 3);
  return {
    props: {
      postData,
      postsRecommended,
    },
  };
};
