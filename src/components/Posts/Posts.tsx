import Image from "next/image";
import Link from "next/link";
import AuthorLogo from "../Layout/AuthorLogo/AuthorLogo";

const Post = ({ post }: { post: any }) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <div className="m-auto flex h-64 w-64 flex-col overflow-auto rounded-2xl text-[var(--text-color)] shadow-md shadow-[var(--box-shadow-light)] hover:shadow-lg hover:shadow-[var(--box-shadow-light)] hover:duration-300 sm:m-0 ">
        <div className="image">
          <Image alt={post.title} src={`/posts/${post.id}.jpg`} fill />
        </div>
        <div className="content">
          <h1 className="title">{post.title}</h1>
          <div className="author">
            <AuthorLogo author={post.author} width={22} height={22} />
            <p>{post.authorName}</p>
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
        .content {
          z-index: 2;
          display: flex;
          flex-direction: column;
          padding: 0.5rem 1rem;
          justify-content: space-between;
          height: 70%;
          text-align: left;
          width: 100%;
          text-decoration: none;
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
        p {
          font-size: 14px;
          margin: 0;
        }
      `}</style>
    </Link>
  );
};

const Posts = ({ posts }: { posts: any[] }) => {
  return (
    <div className="posts-container">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <style jsx>{`
        .posts-container {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fill, minmax(15rem, 15rem));
        }
        @media screen and (max-width: 540px) {
          .posts-container {
            grid-template-columns: repeat(auto-fill, minmax(15rem, 90%));
          }
        }
      `}</style>
    </div>
  );
};

export default Posts;
