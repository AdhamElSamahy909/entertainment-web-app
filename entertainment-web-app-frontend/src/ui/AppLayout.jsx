import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import useSearch from "../hooks/useSearch";
import SearchedShows from "./SearchedShows";

function AppLayout() {
  const { search, searchResult, setSearch, isSearching } = useSearch();

  return (
    <div className="flex xl:flex-row xl:gap-[2rem] h-screen w-full flex-col sm:items-center xl:p-[2rem] sm:p-5">
      <NavBar />

      <div className="flex xl:w-[calc(100%-8rem)] w-full h-full flex-grow-0 flex-col p-[0.5rem] sm:p-0">
        <SearchBar search={search} setSearch={setSearch} />

        <main className="flex flex-col w-full h-full text-white">
          {isSearching ? (
            <Loader />
          ) : search.length !== 0 ? (
            <SearchedShows
              search={search}
              searchResult={searchResult}
              setSearch={setSearch}
            />
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

{
  /*
            <div className="flex flex-col gap-[1.5rem] w-full">
              <h2 className="text-[1.25rem] xl:text-[2rem] font-light leading-[-0.31px]">
                Found {searchResult.length} for &apos;{search}&apos;
              </h2>
              {/* <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-[1rem] sm:gap-[1.5rem] xl:gap-[2.5rem]">
                {searchResult.map((show) => (
                  <ShowBox key={show._id} show={show} />
                ))}
              </div> 
              <ShowsGrid shows={searchResult} />
            </div>
            */
}
