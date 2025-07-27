import toast from "react-hot-toast";
import { useUpdateMoviesTVSeriesMutation } from "../services/api/moviesTVSeriesApiSlice";

function BookmarkButton({ show }) {
  const [updateMoviesTVSeries] = useUpdateMoviesTVSeriesMutation();

  async function handleBookmark(show) {
    try {
      await updateMoviesTVSeries({
        id: show._id,
        body: { isBookmarked: !show.isBookmarked },
      }).unwrap();
      show.isBookmarked === true
        ? toast.success("Removed from boomkarked")
        : toast.success("Added to bookmarked");
    } catch (error) {
      console.log(error);
      show.isBookmarked === true
        ? toast.error("Failed to remove from bookmarked")
        : toast.error("Failed to add to bookmark");
    }
  }

  return (
    <div
      onClick={() => handleBookmark(show)}
      className="absolute cursor-pointer flex justify-center items-center top-[0.5rem] right-[0.5rem] sm:top-[1rem] sm:right-[1rem] bg-accent bg-opacity-50 w-[2rem] h-[2rem] rounded-full"
    >
      <img
        src={
          show.isBookmarked === true
            ? "/assets/icon-bookmark-full.svg"
            : "/assets/icon-bookmark-empty.svg"
        }
        alt="Bookmark image"
      />
    </div>
  );
}

export default BookmarkButton;
