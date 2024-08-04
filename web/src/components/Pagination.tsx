import React from "react";

interface PaginationProps {
  offset: number;
  limit: number;
  booksLength: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  offset,
  limit,
  booksLength,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <div className="flex justify-start mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={offset === 0}
        className="px-4 py-2 bg-blue-900 text-white rounded disabled:opacity-50">
        Previous Page
      </button>
      <button
        onClick={handleNextPage}
        disabled={booksLength < limit}
        className="px-4 py-2 bg-blue-900 text-white rounded disabled:opacity-50 ml-6">
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
