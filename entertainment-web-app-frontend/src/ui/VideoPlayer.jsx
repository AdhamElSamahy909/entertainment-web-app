import { useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetMovieTVSeriesQuery } from "../services/api/moviesTVSeriesApiSlice";
import { CiVolumeMute, CiVolumeHigh, CiPlay1, CiPause1 } from "react-icons/ci";
import { IconContext } from "react-icons/lib";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js"; // Adjust the path as needed

const fullConfig = resolveConfig(tailwindConfig);

const intitialVideoState = {
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isHovering: false,
  hoverPosition: 0,
  thumbnailTime: 0,
  isVolumeSliderVisible: false,
};

function videoReducer(state, action) {
  switch (action.type) {
    case "PLAY":
      return { ...state, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_VOLUME": {
      // const newVolume = Math.max(0, Math.min(1, action.payload));
      // console.log("New volume: ", action.payload);
      console.log(
        "New volume after rounding: ",
        Math.round(action.payload * 10) / 10
      );
      const newVolume =
        action.payload * 10 < 1 ? 0 : Math.round(action.payload * 10) / 10;
      // console.log(
      //   "New volume after flooring: ",
      //   Math.floor(Math.round(action.payload * 100) / 10)
      // );
      // const newVolume = action.payload;
      // const newVolume = Math.round(action.payload);
      return { ...state, volume: newVolume, isMuted: newVolume === 0 };
    }
    case "TOGGLE_MUTE": {
      const newMuted = !state.isMuted;
      const newVolume = !newMuted && state.volume === 0 ? 1 : state.volume;
      return { ...state, isMuted: newMuted, volume: newVolume };
    }
    case "START_HOVERING":
      return { ...state, isHovering: true };
    case "STOP_HOVERING":
      return { ...state, isHovering: false };
    case "UPDATE_HOVER_POSITION":
      return {
        ...state,
        hoverPosition: action.payload,
      };
    case "UPDATE_THUMBNAIL_TIME":
      return { ...state, thumbnailTime: action.payload };
    case "SHOW_VOLUME_SLIDER":
      return { ...state, isVolumeSliderVisible: true };
    case "HIDE_VOLUME_SLIDER":
      return { ...state, isVolumeSliderVisible: false };

    default:
      return state;
  }
}

function calculateClickHoverPositionAndTime({ e, progressBarRef, duration }) {
  const bar = progressBarRef.current;
  if (!bar) return;
  const rect = bar.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const barWidth = bar.clientWidth;
  const hoverClickTime = (offsetX / barWidth) * duration;

  return { offsetX, hoverClickTime };
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function VideoPlayer() {
  const { videoID } = useParams();

  console.log("Current Video ID: ", videoID);

  const [state, dispatch] = useReducer(videoReducer, intitialVideoState);
  const {
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    isHovering,
    hoverPosition,
    thumbnailTime,
    isVolumeSliderVisible,
  } = state;

  const { data, isLoading, isError } = useGetMovieTVSeriesQuery(videoID);
  const video = data?.data?.data;
  console.log("Video To Be Played: ", video);

  const showNameKebabCase = video?.title
    .replace(":", "")
    .toLowerCase()
    .split(" ")
    .join("-");

  const videoPath = `/assets/videos/${showNameKebabCase}/${showNameKebabCase}.mp4`;
  const spriteSheetPath = `/assets/videos/${showNameKebabCase}/thumbnails.jpg`;

  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const hideVolumeBarTimer = useRef(null);

  function handlePlayPauseVideo() {
    if (isPlaying) {
      videoRef.current.pause();
      dispatch({ type: "PAUSE" });
    } else {
      videoRef.current.play();
      dispatch({ type: "PLAY" });
    }
  }

  function handlePlayVideo() {
    videoRef.current.play();
    dispatch({ type: "PLAY" });
  }

  function handlePauseVideo() {
    videoRef.current.pause();
    dispatch({ type: "PAUSE" });
  }

  function handleTimeUpdate() {
    dispatch({ type: "SET_PROGRESS", payload: videoRef.current.currentTime });
  }

  function handleLoadedMetadata() {
    dispatch({ type: "SET_DURATION", payload: videoRef.current.duration });
  }

  function toggleMute() {
    // const isCurrentlyMuted = !isMuted;
    // videoRef.current.muted = isCurrentlyMuted;
    dispatch({ type: "TOGGLE_MUTE" });
  }

  function handleMouseOverBar(e) {
    const { offsetX, hoverClickTime } = calculateClickHoverPositionAndTime({
      e,
      progressBarRef,
      duration,
    });

    dispatch({ type: "UPDATE_HOVER_POSITION", payload: offsetX });
    dispatch({ type: "UPDATE_THUMBNAIL_TIME", payload: hoverClickTime });
  }

  function handleProgressBarClicked(e) {
    const { hoverClickTime } = calculateClickHoverPositionAndTime({
      e,
      progressBarRef,
      duration,
    });

    videoRef.current.currentTime = hoverClickTime;
    dispatch({ type: "SET_PROGRESS", payload: hoverClickTime });
  }

  function handleMouseEnterProgressBar() {
    dispatch({ type: "START_HOVERING" });
  }

  function handleMouseLeaveProgressBar() {
    dispatch({ type: "STOP_HOVERING" });
  }

  function handleVolumeAreaEnter() {
    clearTimeout(hideVolumeBarTimer.current);
    dispatch({ type: "SHOW_VOLUME_SLIDER" });
  }

  function handleVolumeAreaLeave() {
    hideVolumeBarTimer.current = setTimeout(
      () => dispatch({ type: "HIDE_VOLUME_SLIDER" }),
      500
    );
  }

  function handleVolumeChange(newVolume) {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    dispatch({ type: "SET_VOLUME", payload: clampedVolume });

    videoRef.current.muted = clampedVolume === 0 ? true : false;
  }

  function handleVolumeBarClick(e) {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const barHeight = bar.clientHeight;

    const newVolume = 1 - offsetY / barHeight;
    handleVolumeChange(newVolume);
  }

  useEffect(
    function () {
      function handleKeyPress(event) {
        if (document.activeElement.tagName === "INPUT") return;

        event.preventDefault();

        switch (event.key.toLowerCase()) {
          case "k":
          case " ":
            handlePlayPauseVideo();
            break;

          case "m":
            toggleMute();
            break;

          default:
            break;
        }
      }

      window.addEventListener("keydown", handleKeyPress);

      return function () {
        window.removeEventListener("keydown", handleKeyPress);
      };
    },
    [handlePlayPauseVideo]
  );

  const THUMBNAIL_WIDTH = 160;
  const THUMBNAIL_HEIGHT = 90;
  const THUMBNAILS_PER_ROW = 2;
  const THUMBNAIL_INTERVAL = 2;
  const thumbnailSpriteSheet = {
    backgroundImage: `url('${spriteSheetPath}')`,
    backgroundSize: `${THUMBNAIL_WIDTH * THUMBNAILS_PER_ROW}px auto`,
    width: `${THUMBNAIL_WIDTH}px`,
    height: `${THUMBNAIL_HEIGHT}px`,
    backgroundPositionX: `-${(Math.floor(thumbnailTime / THUMBNAIL_INTERVAL) % THUMBNAILS_PER_ROW) * THUMBNAIL_WIDTH}px`,
    backgroundPositionY: `-${Math.floor(thumbnailTime / (THUMBNAIL_INTERVAL * THUMBNAILS_PER_ROW)) * THUMBNAIL_HEIGHT}px`,
    position: "absolute",
    bottom: "100%",
    left: `${hoverPosition}px`,
    transform: "translateX(-50%)",
    marginBottom: "10px",
    border: `2px solid ${fullConfig.theme.colors.white}`,
    borderRadius: "4px",
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;
  const volumePercentage = isMuted ? 0 : volume * 100;

  return isLoading ? (
    <h4>Loading Video...</h4>
  ) : isError ? (
    <h4>Cannot Find Video</h4>
  ) : (
    <IconContext.Provider value={{ className: "text-secondary" }}>
      <div className="w-full max-w-5xl mr-auto">
        <h2 className="text-[1rem] sm:text-[1.5rem] mb-5">{video.title}</h2>
        <video
          ref={videoRef}
          className="w-full rounded-t-lg"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={handlePlayVideo}
          onPause={handlePauseVideo}
        >
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls */}
        <div className="bg-white p-4 rounded-b-lg">
          <div className="relative flex items-center gap-4">
            <button
              onClick={handlePlayPauseVideo}
              className="text-white text-2xl"
            >
              {isPlaying ? <CiPause1 /> : <CiPlay1 />}
            </button>
            <span className="text-secondary text-sm">
              {formatTime(progress)}
            </span>
            <div
              ref={progressBarRef}
              onClick={handleProgressBarClicked}
              onMouseEnter={handleMouseEnterProgressBar}
              onMouseLeave={handleMouseLeaveProgressBar}
              onMouseMove={handleMouseOverBar}
              className="relative w-full h-2 bg-gray-600 rounded-lg cursor-pointer"
            >
              {isHovering && duration > 0 && (
                <div style={thumbnailSpriteSheet}>
                  <div className="absolute bottom-1 w-full text-center text-white text-xs bg-black bg-opacity-50">
                    {formatTime(thumbnailTime)}
                  </div>
                </div>
              )}
              <div
                className="h-full bg-accent rounded-lg"
                style={{ width: `${progressPercentage}%` }}
              ></div>
              <div
                className="absolute top-1/2 w-4 h-4 bg-accent rounded-full"
                style={{
                  left: `${progressPercentage}%`,
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            </div>
            <span className="text-secondary text-sm">
              {formatTime(duration)}
            </span>
            <div
              className="relative"
              onMouseEnter={handleVolumeAreaEnter}
              onMouseLeave={handleVolumeAreaLeave}
            >
              <button onClick={toggleMute} className="text-white text-2xl">
                {isMuted || volume === 0 ? <CiVolumeMute /> : <CiVolumeHigh />}
              </button>
              {isVolumeSliderVisible && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-4 mb-7 bg-white rounded-lg">
                  {/* New Custom Volume Slider */}
                  <div
                    onClick={handleVolumeBarClick}
                    className="relative w-2 h-24 bg-accent rounded-full cursor-pointer"
                  >
                    {/* Fill portion */}
                    <div
                      className="absolute bottom-0 left-0 w-full bg-secondary rounded-full"
                      style={{ height: `${volumePercentage}%` }}
                    ></div>
                    {/* Thumb */}
                    <div
                      className="absolute left-1/2 w-4 h-4 bg-secondary rounded-full"
                      style={{
                        bottom: `${volumePercentage}%`,
                        transform: "translate(-50%, 50%)",
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}

export default VideoPlayer;
