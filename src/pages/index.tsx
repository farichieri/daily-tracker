import { getSortedPostData } from "@/utils/posts";
import MainLayout from "@/components/Layout/MainLayout";
import Posts from "@/components/Posts/Posts";
import Login from "@/components/Auth/Login";

export default function Home({
  posts,
}: {
  user: any;
  posts: { title: string; id: string; date: string }[];
}) {
  return (
    <MainLayout>
      <div className="flex h-full w-full flex-col gap-20 py-10">
        <div className="flex w-full flex-col items-center justify-center gap-10 ">
          <h1 className="text text-center text-5xl font-bold lg:text-7xl">
            Plan your days and track your tasks easily.
          </h1>
          <Login />
        </div>
        <div className="flex h-full min-h-full w-full flex-col justify-center gap-4 px-2 py-4">
          <Posts posts={posts} />
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticProps = async () => {
  const allPostData = getSortedPostData();

  return {
    props: { posts: allPostData },
  };
};
