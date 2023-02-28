import Image from 'next/image';
import Link from 'next/link';
import AuthorLogo from '../Layout/AuthorLogo/AuthorLogo';

const Post = ({ post, author }: { post: any; author: any }) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <div className='post'>
        <div className='image'>
          <Image alt={post.title} src={`/posts/${post.id}.jpg`} fill />
        </div>
        <div className='content'>
          <h1 className='title'>{post.title}</h1>
          <div className='author'>
            <AuthorLogo author={author.slug} width={22} height={22} />
            <p>{author.name}</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .post {
          box-shadow: 0 0 10px 1px var(--box-shadow-light);
          height: 15rem;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: auto;
          color: var(--text-color);
          transition: 0.3s;
        }
        .post:hover {
          transform: scale(1.01);
        }
        .content {
          z-index: 2;
          display: flex;
          flex-direction: column;
          padding: 0.5rem 1rem;
          justify-content: space-between;
          height: 70%;
          text-align: left;
          width: 100%;
        }
        .image {
          position: relative;
          height: 100%;
          width: 100%;
        }
        .author,
        .title {
          border-radius: 1rem;
        }
        .author {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        h1 {
          font-size: 1rem;
        }
      `}</style>
    </Link>
  );
};

const PostsAuthor = ({ posts, author }: { posts: any[]; author: any }) => {
  return (
    <div className='posts-container'>
      {posts.map((post) => (
        <Post post={post} key={post.id} author={author} />
      ))}
      <style jsx>{`
        .posts-container {
          display: grid;
          gap: 1rem;
          justify-content: center;
          grid-template-columns: repeat(auto-fill, minmax(15rem, 15rem));
        }
      `}</style>
    </div>
  );
};

export default PostsAuthor;
