import React, { useState } from "react";
import { Book as BookType } from "../api/interfaces";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import StarRating from "./StarRating";

interface BookProps {
  book: BookType;
}

const Book: React.FC<BookProps> = ({ book }) => {
  const [isHeartActive, setIsHeartActive] = useState(false);

  const handleHeartClick = async () => {
    try {
      const method = isHeartActive ? "DELETE" : "POST";
      const response = await fetch(`/favorites/${book.id}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      setIsHeartActive(!isHeartActive);
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <Link
      to={`/book/${book.id}`}
      className="relative rounded-lg overflow-hidden shadow-lg bg-primary hover:bg-blue-950 border border-opacity-10 border-slate-100 flex flex-col"
    >
      <div
        className="absolute top-2 right-2"
        onClick={(e) => {
          e.preventDefault();
          handleHeartClick();
        }}
      >
        <HeartIcon isActive={isHeartActive} onClick={handleHeartClick} />
      </div>

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
          <StarRating rating={book.average_rating} />
          <p className="ml-2">{book.average_rating}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-white line-clamp-3">{book.description}</p>
      </div>
    </Link>
  );
};

export default Book;
