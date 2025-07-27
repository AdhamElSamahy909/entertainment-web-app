function ShowInfoBox({ show }) {
  return (
    <div className="flex flex-col gap-[4px] font-medium">
      <div className="flex text-[0.75rem] items-center gap-[0.5rem] h-[1rem] font-light opacity-75">
        <p className=" ">{show.year}</p>
        <span className="w-[3px] h-[3px] opacity-50 bg-white rounded-full"></span>
        <div className="flex justify-center sm:text-[0.9379rem] items-center gap-[0.375rem]">
          <img
            src={
              show.category === "Movie"
                ? "assets/icon-category-movie.svg"
                : "assets/icon-category-tv.svg"
            }
            className="w-[0.75rem] h-[0.75rem]"
            alt=""
          />
          <p>{show.category}</p>
        </div>
        <span className="w-[3px] h-[3px] opacity-50 bg-white rounded-full"></span>
        <p>{show.rating}</p>
      </div>
      <h3 className="text-[1rem] sm:text-[1.5rem]">{show.title}</h3>
    </div>
  );
}

export default ShowInfoBox;
