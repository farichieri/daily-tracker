import AD from "@/components/LandingPage/AD/AD";
import AuthorLogo from "@/components/Layout/AuthorLogo/AuthorLogo";
import AuthorName from "@/components/Layout/AuthorName/AuthorName";
import NewsLetterInvitation from "@/components/LandingPage/NewsLetterInvitation/NewsLetterInvitation";
import Posts from "@/components/Posts/Posts";
import SubscribeInvitation from "@/components/LandingPage/SubscribeInvitation/SubscribeInvitation";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "store/slices/authSlice";
import Date from "../../components/Layout/Date";
import MainLayout from "../../components/Layout/MainLayout";
import {
  getAllPostsIds,
  getPostData,
  getSortedPostData,
} from "../../utils/posts";

const Post = ({
  postData,
  postsRecommended,
}: {
  postData: any;
  postsRecommended: any;
}) => {
  const [showContent, setShowContent] = useState(true);
  // const { user } = useSelector(selectUser);

  // useEffect(() => {
  //   if (postData.premium) {
  //     if (user) {
  //       setShowContent(true);
  //     } else {
  //       setShowContent(false);
  //     }
  //   } else {
  //     setShowContent(true);
  //   }
  // }, [postData, user]);

  const getContent = (content: any) => {
    if (showContent) {
      return content;
    } else {
      return content.slice(0, 500).concat("<span>...</span>");
    }
  };

  // const showRecommendedContent = () => {
  //   if (postsRecommended.length > 0 && !postData.premium) {
  //     return true;
  //   } else if (postsRecommended.length > 0 && user) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <MainLayout withPadding={true}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className="relative flex max-w-4xl">
        <div className="flex flex-col items-center">
          <article className="relative">
            <div className="post-header">
              <h1 className="text-5xl font-bold">{postData.title}</h1>
              <div className="my-4 flex items-center gap-2">
                <AuthorLogo author={postData.author} width={30} height={30} />
                <AuthorName author={postData.author} style={null} /> -
                Published:
                <Date dateString={postData.date} />
              </div>
            </div>
            {/* {!user && ( */}
            <div className="mobile_ad">
              <AD />
            </div>
            {/* )} */}
            <div
              className="flex flex-col gap-4 border-t border-[var(--box-shadow)] px-8 py-10"
              dangerouslySetInnerHTML={{
                __html: getContent(postData.contentHtml),
              }}
            />
            {/* <div className='sidebar'>
              <div className='fixed'>{!user && <AD />}</div>
            </div> */}
          </article>
          {/* {!user && postData.premium && <SubscribeInvitation />}
          {!user && !postData.premium && <NewsLetterInvitation />} */}
          {/* {showRecommendedContent() && ( */}
          {postsRecommended.length > 0 && (
            <div className="similar-content">
              <h3>Related content</h3>
              <Posts posts={postsRecommended} />
            </div>
          )}
          {/* )} */}
        </div>
      </div>
      <style jsx>{`
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
        .post-header {
          display: flex;
          flex-direction: column;
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
        @media screen and (max-width: 1000px) {
          .sidebar {
            display: none;
          }
          .post-container {
            margin-right: 0;
          }
        }
      `}</style>
    </MainLayout>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
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

// export const getServerSideProps = async ({ params }: { params: any }) => {
//   const postData = await getPostData(params.id);
//   const allPostData = getSortedPostData();
//   const sameTopicPosts = allPostData.filter(
//     (post: any) => post.topic === postData.topic && post.id !== postData.id
//   );
//   const postsRecommended = [...sameTopicPosts]
//     .sort(() => 0.5 - Math.random())
//     .slice(0, 3);
//   return {
//     props: {
//       postData,
//       postsRecommended,
//     },
//   };
// };
