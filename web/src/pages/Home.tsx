import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, setLimit, setOffset } from "../store/bookSlice";
import { RootState, AppDispatch } from "../store";
import { Loading as Spinner } from "../components/Loading";
import Search from "../components/Search";
import Chatbot from "../components/Chatbot";
import Book from "../components/Book";
import Error from "../components/Error";
import Pagination from "../components/Pagination";
import LogInSignUp from "../components/LogInSignUp";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const { books, loading, error, limit, offset } = useSelector(
    (state: RootState) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks({ title, limit, offset }));
  }, [dispatch, title, limit, offset]);

  const handleNextPage = () => dispatch(setOffset(offset + limit));
  const handlePreviousPage = () => dispatch(setOffset(Math.max(offset - limit, 0)));

  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;

  return (
    <div className="h-screen flex flex-col bg-primary px-6 pt-6">
      <div className="flex justify-between items-center">
        <Chatbot />
        <LogInSignUp /> {/* DropdownWithIcon component */}
      </div>
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
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </div>
  );
};

export default Home;
