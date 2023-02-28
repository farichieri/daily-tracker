import React from 'react';
import usePagination, { DOTS } from '../../hooks/usePagination';

const Pagination = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  totalPages,
}: {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: any;
  totalPages: number;
}) => {
  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    totalPages,
    pageSize,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul className='wrapper' aria-label='Blog post pagination list'>
      <li className='paginationItem'>
        <button
          type='button'
          className='arrowButton left'
          aria-label='Goto previous page'
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          {`<`}
        </button>
      </li>

      {paginationRange.map((pageNumber: any, index: number) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className='dots'>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className='paginationItem'
            aria-current={pageNumber === currentPage && 'page'}
          >
            <button
              type='button'
              aria-label={`Goto page ${pageNumber}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className='paginationItem'>
        <button
          type='button'
          className='arrowButton right'
          aria-label='Goto next page'
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          {`>`}
        </button>
      </li>

      <style jsx>{`
        .wrapper {
          display: flex;
          gap: 0.25rem;
          align-items: center;
          list-style-type: none;
          margin-bottom: 20px;
          color: var(--textColor);
          margin: auto;
        }
        .paginationItem {
          display: flex;
        }

        button {
          border: 1px solid var(--box-shadow-light);
          background: transparent;
          height: 34px;
          width: 34px;
          border-radius: 50%;
          overflow: hidden;
          color: var(--textColor);
        }

        button:hover {
          background-color: rgba(159, 159, 159, 0.295);
          cursor: pointer;
        }

        button:disabled {
          pointer-events: none;
          opacity: 0.5;
        }

        [aria-current='page'] button {
          background-color: rgba(159, 159, 159, 0.295);
          font-weight: 700;
          text-decoration: underline;
        }

        .arrowButton {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1.5px;
        }

        svg {
          width: 1em;
          height: 1em;
        }

        .dots {
          line-height: 34px;
          margin: 5px 10px;
        }

        .paginationSelector {
          background-color: var(--bgColor);
          color: var(--textColor);
          border: none;
          outline: none;
          margin-left: 10px;
          padding: 0.2rem;
          border: 1px solid var(--box-shadow-light);
          border-radius: 4px;
        }

        @media screen and (max-width: 400px) {
          .wrapper {
            gap: 0.1rem;
          }
          button {
            height: 22px;
            width: 22px;
          }
        }
      `}</style>
    </ul>
  );
};

export default Pagination;
