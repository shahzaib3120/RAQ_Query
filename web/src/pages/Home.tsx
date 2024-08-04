import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, setLimit, setOffset } from "../store/bookSlice";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { UnknownAction } from "@reduxjs/toolkit";
import { Loading as Spinner } from "../components/Loading";
import Search from "../components/Search";
import Chatbot from "../components/Chatbot";
import Book from "../components/Book";
import Error from "../components/Error";
import Pagination from "../components/Pagination";


const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const { books, loading, error, limit, offset } = useSelector(
    (state: RootState) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks({ title, limit, offset }) as unknown as UnknownAction);
  }, [dispatch, limit, offset]);

  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;

  return (
    <div className="h-screen flex flex-col bg-primary px-6 pt-6">
      <Chatbot />
      <Search title={title} setTitle={setTitle} />
      <div className="flex-grow overflow-y-auto pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
        <Pagination
          offset={offset}
          limit={limit}
          booksLength={books.length}
          handleNextPage={() => dispatch(setOffset(offset + limit))}
          handlePreviousPage={() => dispatch(setOffset(Math.max(offset - limit, 0)))}
        />
      </div>
    </div>
  );
};

export default Home;

