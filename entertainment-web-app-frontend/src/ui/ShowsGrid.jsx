import ShowBox from "./ShowBox";

function ShowsGrid({ shows, setSearch }) {
  return (
    <div className="grid grid-cols-2 max-w-screen sm:grid-cols-3 xl:grid-cols-4 gap-[1rem] sm:gap-[1.5rem] xl:gap-[2.5rem]">
      {shows?.map((show) => (
        <ShowBox key={show._id} show={show} setSearch={setSearch} />
      ))}
    </div>
  );
}

export default ShowsGrid;
