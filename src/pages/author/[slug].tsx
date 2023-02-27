import AuthorLogo from '@/components/Layout/AuthorLogo/AuthorLogo';
import PostsAuthor from '@/components/Posts/PostsAuthor';
import { authors } from '@/utils/authors';
import { getSortedPostData } from '@/utils/posts';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../components/Layout/MainLayout';

const Author = ({
  author,
  posts,
}: {
  author: any;
  posts: { title: string; id: string; date: string; author: string }[];
}) => {
  const socialMedia = ['twitter', 'email', 'linkedin'];
  return (
    <MainLayout withPadding={true}>
      <section className='author'>
        <div className='header-container'>
          <AuthorLogo author={author.slug} width={125} height={125} />
          <div className='header-container-text'>
            <h1>{author.name}</h1>
            <p>{author.description}</p>
            <div className='header-container-social'>
              {socialMedia.map(
                (s, index) =>
                  author[s] && (
                    <Link href={author[s]} target='_blank' key={index}>
                      <Image
                        src={`/icons/${s}.png`}
                        alt=''
                        width={22}
                        height={22}
                      />
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: author.about }} />
        <div className='content-more'>
          <h4>More from {author.name.slice(0, author.name.indexOf(' '))}</h4>
          <PostsAuthor posts={posts} author={author} />
        </div>
      </section>
      <style jsx>{`
        .author {
          text-align: left;
          max-width: var(--max-width-content);
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-direction: column;
          padding: 1rem 0;
        }
        .header-container {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .header-container-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .header-container-text h1 {
          font-size: 1.5rem;
        }
        .header-container-social {
          display: flex;
          gap: 0.25rem;
        }
        .content-more {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
          width: 100%;
        }
      `}</style>
    </MainLayout>
  );
};

export default Author;

export const getStaticPaths = async () => {
  const paths = authors.map((author) => {
    return {
      params: {
        slug: author.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const author = authors.find((author) => author.slug === params.slug);
  const posts = getSortedPostData().filter(
    (post: any) => post.author === params.slug
  );
  return {
    props: {
      author,
      posts,
    },
  };
};
