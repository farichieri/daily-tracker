import { authors } from '@/utils/authors';
import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/Layout/MainLayout';
import { getAllPostsIds, getPostData } from '../../utils/posts';

const Author = ({ author }: { author: any }) => {
  return (
    <MainLayout withPadding={true}>
      <div>{author.name}</div>
      <div>{author.description}</div>
      <style jsx>{``}</style>
    </MainLayout>
  );
};

export default Author;

export const getStaticPaths = async () => {
  const paths = authors.map((author) => {
    return {
      params: {
        name: author.slug,
      },
    };
  });
  console.log({ paths });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  console.log({ params });
  const author = authors.find((author) => author.slug === params.name);
  console.log({ author });
  return {
    props: {
      author,
    },
  };
};
