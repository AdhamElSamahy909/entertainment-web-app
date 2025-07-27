// ffmpeg -i mission-saturn.mp4 -vf "fps=1/2,scale=160:-1,tile=2x2" thumbnails.jpg

import { useState, useRef } from "react";

const VideoTest2 = ({
  videoPath = "/assets/videos/mission-saturn/mission-saturn.mp4",
}) => {
  const videoRef = useRef(null);

  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);

  const [isMuted, setIsMuted] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  const [hoverPosition, setHoverPosition] = useState(0);

  const [thumbnailTime, setThumbnailTime] = useState(0);

  // New state to control volume slider visibility

  const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);

  // --- (All existing handlers remain the same) ---

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setProgress(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;

    videoRef.current.volume = newVolume;

    setVolume(newVolume);

    if (newVolume > 0) {
      setIsMuted(false);

      videoRef.current.muted = false;
    }
  };

  const toggleMute = () => {
    const currentlyMuted = !isMuted;

    videoRef.current.muted = currentlyMuted;

    setIsMuted(currentlyMuted);

    if (!currentlyMuted && volume === 0) {
      setVolume(1);

      videoRef.current.volume = 1;
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);

    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleMouseMoveOnBar = (e) => {
    const bar = progressBarRef.current;

    if (!bar) return;

    const rect = bar.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;

    const barWidth = bar.clientWidth;

    const hoverTime = (offsetX / barWidth) * duration;

    setHoverPosition(offsetX);

    setThumbnailTime(hoverTime);
  };

  const handleProgressBarClick = (e) => {
    const bar = progressBarRef.current;

    if (!bar) return;

    const rect = bar.getBoundingClientRect();

    const offsetX = e.clientX - rect.left;

    const barWidth = bar.clientWidth;

    const seekTime = (offsetX / barWidth) * duration;

    videoRef.current.currentTime = seekTime;

    setProgress(seekTime);
  };

  // --- (Thumbnail constants and style object remain the same) ---

  const THUMBNAIL_WIDTH = 160;

  const THUMBNAIL_HEIGHT = 90;

  const THUMBNAILS_PER_ROW = 2;

  const THUMBNAIL_INTERVAL = 2;

  const thumbnailSpriteStyle = {
    backgroundImage: `url('/assets/videos/mission-saturn/thumbnails.jpg')`,

    backgroundSize: `${THUMBNAIL_WIDTH * THUMBNAILS_PER_ROW}px auto`,

    width: `${THUMBNAIL_WIDTH}px`,

    height: `${THUMBNAIL_HEIGHT}px`,

    backgroundPositionX: `-${(Math.floor(thumbnailTime / THUMBNAIL_INTERVAL) % THUMBNAILS_PER_ROW) * THUMBNAIL_WIDTH}px`,

    backgroundPositionY: `-${Math.floor(thumbnailTime / (THUMBNAIL_INTERVAL * THUMBNAILS_PER_ROW)) * THUMBNAIL_HEIGHT}px`,

    position: "absolute",

    bottom: "100%",

    left: `${hoverPosition}px`,
    marginBottom: "10px",

    border: "2px solid white",

    borderRadius: "4px",
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <video
        ref={videoRef}
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Controls */}

      <div className="bg-gray-800 p-4 rounded-b-lg">
        <div className="relative flex items-center gap-4">
          {isHovering && duration > 0 && (
            <div style={thumbnailSpriteStyle}>
              <div className="absolute bottom-1 w-full text-center text-white text-xs bg-black bg-opacity-50">
                {formatTime(thumbnailTime)}
              </div>
            </div>
          )}

          <button onClick={handlePlayPause} className="text-white text-2xl">
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <span className="text-white text-sm">{formatTime(progress)}</span>

          <div
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMoveOnBar}
            className="relative w-full h-2 bg-gray-600 rounded-lg cursor-pointer"
          >
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg"
              style={{ width: `${progressPercentage}%` }}
            ></div>

            <div
              className="absolute top-1/2 w-4 h-4 bg-blue-500 rounded-full"
              style={{
                left: `${progressPercentage}%`,

                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>

          <span className="text-white text-sm">{formatTime(duration)}</span>

          {/* --- New Volume Control Section --- */}

          <div
            className="relative"
            onMouseEnter={() => setIsVolumeSliderVisible(true)}
            onMouseLeave={() => setIsVolumeSliderVisible(false)}
          >
            <button onClick={toggleMute} className="text-white text-2xl">
              {isMuted || volume === 0 ? "🔇" : "🔊"}
            </button>

            {isVolumeSliderVisible && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-700 rounded-lg">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="h-24 appearance-none cursor-pointer"
                  style={{ writingMode: "vertical-lr", direction: "rtl" }}
                />
              </div>
            )}
          </div>

          {/* --- End of New Volume Control Section --- */}
        </div>
      </div>
    </div>
  );
};

export default VideoTest2;
