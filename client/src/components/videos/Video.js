import React from "react";

import PropTypes from "prop-types";
import ReactPlayer from "react-player/youtube";

//https://www.youtube.com/watch?v=ysz5S6PUM-U

const Video = ({ height, width, url }) => {
  return (
    <ReactPlayer
      url={url}
      height={height || "390px"}
      width={width || "640px"}
    />
  );
};

Video.propTypes = {
  url: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string
};

export default Video;
