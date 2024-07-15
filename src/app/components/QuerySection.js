"use client";
import { useState } from "react";

// const url =
//   "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=react&gsrlimit=10&prop=extracts&exchars=100&exintro=1&explaintext=1&exlimit=max&format=json&origin=*";

export default function QuerySection() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    setIsSubmit(true);
    setIsLoad(false);
    setError(null);

    if (/^\s*$/.test(query)) {
      setData([]);
      setIsLoad(true);
      return;
    }

    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrlimit=10&prop=extracts&exchars=100&exintro=1&explaintext=1&exlimit=max&format=json&origin=*`
      );
      const data = await response.json();
      if (!data.query?.pages) throw new Error("No data found");
      const arrayPages = Object.values(data.query.pages);
      setData(arrayPages);
      setIsLoad(true);
    } catch (error) {
      setError(error.message);
      setIsLoad(true);
    }
  };

  const resetForm = () => {
    setIsSubmit(false);
    setIsLoad(false);
    setData([]);
    setError(null);
  };
  return (
    <>
      <form
        onSubmit={submitForm}
        className="mt-10 max-w-[500px] mx-auto p-2 border border-zinc-600 rounded-md"
      >
        <div>
          <label htmlFor="query" className="font-bold block mb-2">
            Search Input:{" "}
          </label>
          <input
            className="block w-full border border-gray-900 rounded-md p-2"
            type="text"
            name="query"
            id="query"
            placeholder="Add your query"
          />
        </div>
        <div className="mt-5 flex justify-center gap-5 ">
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            type="submit"
            title="Search on Wikipedia"
          >
            Search
          </button>
          <button
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            type="reset"
            onClick={resetForm}
            title="Reset the form"
          >
            Reset
          </button>
        </div>
      </form>
      {isSubmit &&
        (isLoad ? (
          error ? (
            <div className="text-center mt-5 text-red-600">
              Error: <span className="font-bold">{error}</span>
            </div>
          ) : (
            <div className="mt-5">
              <p className="text-center font-bold mb-3">Results:</p>
              {data.length === 0 ? (
                <p className="text-center">No results found</p>
              ) : (
                <ul className="w-[80%] mx-auto">
                  {data.map((page) => (
                    <li
                      key={page.pageid}
                      className="mb-5 border border-gray-950 bg-white p-1"
                    >
                      <p className="mb-2 text-center">
                        <span className="font-bold">Title: </span>
                        <a
                          className="text-blue-800 cursor-pointer font-bold"
                          href={`https://en.wikipedia.org/?curid=${page.pageid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {page.title}
                        </a>
                      </p>
                      <p className="font-bold">Extract: </p>
                      <p>{page.extract}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        ) : (
          <div className="flex justify-center flex-col items-center py-5 ">
            <p className="text-blue-500 text-center font-bold mb-2">
              Loading...
            </p>
            <div className="loader"></div>
          </div>
        ))}
    </>
  );
}
