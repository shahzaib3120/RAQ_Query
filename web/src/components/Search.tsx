import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setLimit } from "../store/bookSlice";
import { RootState, AppDispatch } from "../store"; 

interface SearchProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ title, setTitle }) => {
  const dispatch = useDispatch<AppDispatch>();
  const limit = useSelector((state: RootState) => state.books.limit);

  // Handle limit change when the user selects a different option
  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(event.target.value);
    dispatch(setLimit(newLimit));
    // Fetch books with the new limit
    dispatch(fetchBooks({ title, limit: newLimit, offset: 0 }));
  };

  // Handle search action
  const handleSearch = () => {
    dispatch(fetchBooks({ title, limit, offset: 0 }));
  };

  return (
    <header className="flex flex-row justify-between items-center mb-4 border-b-2 pb-4 border-opacity-15 border-slate-400">
      <h1 className="text-2xl font-bold text-white">Library</h1>
      <div className="flex flex-row flex-auto align-middle justify-center px-40">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search by title"
          className="px-5 py-1 bg-blue-900 text-white rounded mr-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-900 text-white rounded"
        >
          Search
        </button>
      </div>
      <div>
        <label htmlFor="perPage" className="text-white mr-2">
          Results Per Page:
        </label>
        <select
          id="perPage"
          onChange={handlePerPageChange}
          value={limit} // Reflect the current limit value in the select
          className="px-2 py-1 bg-blue-900 text-white rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>
    </header>
  );
};

export default Search;
