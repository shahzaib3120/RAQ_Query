// src/components/Book.tsx
import React from "react";
import { Book as book } from "../api/interfaces";
import { Link } from "react-router-dom";

interface BookProps {
  book: book;
}

const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <Link
      to={`/book/${book.id}`}
      className="rounded-lg overflow-hidden shadow-lg py-2 px-0 bg-primary flex flex-col align-middle hover:bg-blue-950 border-2 border-slate-100 border-opacity-10">
      <div className="px-6 flex flex-col mb-4">
        <p className="text-white text-l font-bold truncate ">{book.title}</p>
        <div className="flex flex-row justify-between">
          <p className="text-white text-xs truncate">
            {book.authors.join(", ")}
          </p>
          <p className="text-white text-xs">{book.published_year}</p>
        </div>
      </div>
      <div className="align-middle mx-auto w-full px-8 rounded-lg overflow-clip">
        <img
          className="align-middle mx-auto w-full rounded-lg  overflow-clip h-72"
          src={book.thumbnail}
          alt={`${book.title} cover`}
        />
      </div>
      <div className="flex flex-row justify-between items-center text-white text-sm px-6 mt-2">
        <p className="text-white text-xs">{book.genre}</p>
        <div className="flex flex-row items-center">
          <svg
            fill="#000000"
            viewBox="0 0 24 24"
            id="star"
            data-name="Flat Color"
            xmlns="http://www.w3.org/2000/svg"
            className="icon flat-color w-5 h-5 ">
            <path
              id="primary"
              d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z"
              className="fill-yellow-400"></path>
          </svg>
          <p className="text-white text-xs ml-2">{book.average_rating}</p>
        </div>
      </div>
      <div className="px-6 py-2 mb-4">
        <p className="text-white text-xs line-clamp-3">{book.description}</p>
      </div>
    </Link>
  );
};

export default Book;
