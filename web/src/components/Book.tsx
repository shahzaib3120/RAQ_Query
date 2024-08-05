import React from "react";
import { Book as BookType } from "../api/interfaces";
import { Link } from "react-router-dom";

interface BookProps {
  book: BookType;
}

const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <Link
      to={`/book/${book.id}`}
      className="rounded-lg overflow-hidden shadow-lg bg-primary hover:bg-blue-950 border border-opacity-10 border-slate-100 flex flex-col">
      <div className="p-4 flex flex-col">
        <p className="text-white font-bold truncate">{book.title}</p>
        <div className="flex justify-between text-xs text-white">
          <p className="truncate">{book.authors.join(", ")}</p>
          <p>{book.published_year}</p>
        </div>
      </div>
      <div className="px-4">
        <img
          className="w-full h-72 rounded-lg"
          src={book.thumbnail}
          alt={`${book.title} cover`}
        />
      </div>
      <div className="p-4 text-sm text-white flex justify-between items-center">
        <p className="text-xs">{book.genre}</p>
        <div className="flex items-center">
          <svg
            fill="#000000"
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-yellow-400"
          >
            <path d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z" />
          </svg>
          <p className="ml-2">{book.average_rating.toFixed(2)}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-white line-clamp-3">{book.description}</p>
      </div>
    </Link>
  );
};

export default Book;
