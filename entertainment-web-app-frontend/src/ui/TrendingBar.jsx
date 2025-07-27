import useScreenWidth from "../hooks/useScreenWidth";
import BookmarkButton from "./BookmarkButton";
import PlayButton from "./PlayButton";
import ShowInfoBox from "./ShowInfoBox";

function TrendingBar({ trending }) {
  const { screenWidth } = useScreenWidth();
  const sizeOfImage =
    screenWidth < 640 ? "small" : screenWidth < "768" ? "medium" : "large";

  return (
    <div className="mb-[1.5rem] w-screen xl:w-[calc(100%)] scrollbar-hide">
      <h2 className="mb-[1rem] text-[1.25rem] sm:mb-[1.5rem] sm:text-[2rem] font-light">
        Trending
      </h2>

      <div className="flex gap-[1rem] w-[calc(100%)] scrollbar-hide">
        {trending?.map((show) => (
          <div key={show._id}>
            <div
              className={`bg-cover group cursor-pointer relative w-[15rem] sm:w-[30rem] sm:h-[16rem] rounded-[0.5rem] h-[8.75rem]`}
              style={{
                backgroundImage: `url(${show?.thumbnail?.trending?.[sizeOfImage]})`,
              }}
            >
              <BookmarkButton show={show} />

              <PlayButton />

              <div className="pt-[5rem] pl-[1rem] sm:pl-[1.5rem] sm:pt-[11.5rem]">
                <ShowInfoBox show={show} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingBar;
