import Link from 'next/link';

const Post = ({ post }: { post: any }) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <div>
        <h1>{post.title}</h1>
      </div>
      <style jsx>{`
        div {
          box-shadow: 0 0 10px 1px var(--box-shadow-light);
          height: 20rem;
          width: 20rem;
          border-radius: 0.35rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem 0.25rem;
        }
        h1 {
          font-size: 1rem;
        }
      `}</style>
    </Link>
  );
};

const Posts = ({ posts }: { posts: any[] }) => {
  return (
    <div className='posts-container'>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <style jsx>{`
        .posts-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Posts;
