import { useState } from "react";
import useScreenWidth from "../hooks/useScreenWidth";
import BookmarkButton from "./BookmarkButton";
import PlayButton from "./PlayButton";
import ShowInfoBox from "./ShowInfoBox";
import Video from "./VideoPlayer";

function ShowBox({ show, setSearch }) {
  const { screenWidth } = useScreenWidth();
  const sizeOfImage =
    screenWidth < 640 ? "small" : screenWidth < "768" ? "medium" : "large";

  // function handlePlayVideo() {
  //   console.log("Playing trailer ", show);
  //   // setPlayVideo(true);
  //   // setVideoPath();
  // }

  return (
    <>
      <div className="flex flex-col gap-[1rem]">
        <div className="w-full h-auto relative group cursor-pointer">
          <img
            src={show.thumbnail.regular[sizeOfImage].replace(".", "")}
            className="rounded-[0.5rem] object-cover"
            alt="thumbnail"
          />
          <BookmarkButton show={show} />

          <PlayButton show={show} setSearch={setSearch} />
        </div>
        <ShowInfoBox show={show} />
      </div>

      {/* {playVideo && <Video isPlaying={playVideo} setIsPlaying={setPlayVideo} />} */}
    </>
  );
}

export default ShowBox;
