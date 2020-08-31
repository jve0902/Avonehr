import React from "react";
import ReactPlayer from "react-player/youtube";

const Video = ({ height, width, url }) => {
  return (
    <ReactPlayer
      url={url || "https://www.youtube.com/watch?v=ysz5S6PUM-U"}
      height={height || "390px"}
      width={width || "640px"}
    />
  );
};

export default Video;
