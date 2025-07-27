import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useSearch from "../hooks/useSearch";

function PlayButton({ show, setSearch }) {
  const navigate = useNavigate();

  function handlePlayVideo() {
    console.log("Show To Be Played: ", show);

    setSearch("");
    const { _id: id } = show;
    navigate(`/videos/${id}`);
  }

  return (
    <button
      onClick={handlePlayVideo}
      className="absolute w-max p-3 rounded-[1.78rem] transition-opacity cursor-pointer opacity-0 group-hover:opacity-[1] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-white bg-opacity-25 flex justify-center items-center gap-[2rem]"
    >
      <img
        src="/assets/icon-play.svg"
        alt="play icon"
        className="w-[1.875rem] h-[1.875rem]"
      />
      <p className="text-[1.125rem]">Play</p>
    </button>
  );
}

export default PlayButton;
