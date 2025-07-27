import ShowsGrid from "./ShowsGrid";

function SearchedShows({ searchResult, search, setSearch }) {
  return (
    <div className="flex flex-col gap-[1.5rem] w-full">
      <h2 className="text-[1.25rem] xl:text-[2rem] font-light leading-[-0.31px]">
        Found {searchResult.length} for &apos;{search}&apos;
      </h2>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-[1rem] sm:gap-[1.5rem] xl:gap-[2.5rem]">
                {searchResult.map((show) => (
                  <ShowBox key={show._id} show={show} />
                ))}
              </div> */}
      <ShowsGrid shows={searchResult} setSearch={setSearch} />
    </div>
  );
}

export default SearchedShows;
