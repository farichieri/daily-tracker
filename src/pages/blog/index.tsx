import { getSortedPostData } from "@/utils/posts";
import { useState } from "react";
import Filter from "@/components/LandingPage/Filter/Filter";
import MainLayout from "@/components/Layout/MainLayout";
import Pagination from "@/components/LandingPage/Pagination/Pagination";
import Posts from "@/components/Posts/Posts";

const Blog = ({
  posts,
  user,
}: {
  posts: { title: string; id: string; date: string; topic: string }[];
  user: any;
}) => {
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
  const [optionSelected, setOptionSelected] = useState("All");
  const handleFilter = (event: Event) => {
    event.preventDefault();
    const topic = (event.target as HTMLButtonElement).value;
    const filterPosts = (topic: string) => {
      if (topic !== "All") {
        return posts.filter((post) => post.topic === topic);
      } else {
        return posts;
      }
    };
    setOptionSelected(topic);
    setPostsState(filterPosts(topic));
    setCurrentPage(1);
  };
  return (
    <MainLayout>
      <section className="flex h-full w-full max-w-6xl flex-col">
        <div className="flex items-center justify-center text-4xl font-bold">
          <h1>All our content</h1>
        </div>
        <div className="content">
          <Filter handleFilter={handleFilter} optionSelected={optionSelected} />
          <Posts posts={currentPaginationData} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={rowsPerPage}
              onPageChange={updatePage}
              totalPages={totalPages}
            />
          )}
        </div>
      </section>
      <style jsx>
        {`
          .header {
            height: 10rem;
            align-items: center;
            display: flex;
            justify-content: center;
          }
          .content {
            max-width: var(--max-width);
            margin: auto;
            width: 100%;
            padding: 2rem 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
        `}
      </style>
    </MainLayout>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const allPostData = getSortedPostData();

  return {
    props: { posts: allPostData },
  };
};
