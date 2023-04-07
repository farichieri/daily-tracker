import EmailInput from "@/components/LandingPage/EmailInput/EmailInput";
import MainLayout from "@/components/Layout/MainLayout";
import Pagination from "@/components/LandingPage/Pagination/Pagination";
import Posts from "@/components/Posts/Posts";
import { getSortedPostData } from "@/utils/posts";
import { useState } from "react";

export default function Home({
  posts,
}: {
  user: any;
  posts: { title: string; id: string; date: string }[];
}) {
  const [postsState, setPostsState] = useState(posts);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = postsState.length;
  const blogsFrom = (currentPage - 1) * rowsPerPage;
  const blogsTo = currentPage * rowsPerPage;
  const currentPaginationData = postsState.slice(blogsFrom, blogsTo);
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const updatePage = (event: number) => {
    setCurrentPage(Number(event));
  };

  return (
    <MainLayout withPadding={false}>
      <div className="flex h-full w-full max-w-6xl flex-col gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-4 ">
          <h1 className="text max-w-xl text-4xl font-bold">
            Increase your productivity with the best achievement tips in the
            world.
          </h1>
          <p className="">
            Receive the best information to achieve your goals weekly
          </p>
          <EmailInput textButton={"Join Free"} />
        </div>
        <div className="flex h-full min-h-full w-full flex-col justify-center gap-4 px-2 py-4">
          <Posts posts={currentPaginationData} />
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={rowsPerPage}
            onPageChange={updatePage}
            totalPages={totalPages}
          />
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
