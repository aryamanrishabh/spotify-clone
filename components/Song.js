import React from "react";
import useSpotify from "../hooks/useSpotify";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();

  return (
    <div className="grid grid-cols-4 w-screen">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-4">
          <p>{order + 1}</p>
          <img
            className="h-10 w-10"
            src={track?.track.album.images[0].url}
            alt="Song cover"
          />
          <div>
            <p>{track?.track.name}</p>
            <p>{track?.track.artists[0].name}</p>
          </div>
        </div>
        <div>{track?.track.album.name}</div>
        <div>Added at</div>
        <div>Duration</div>
      </div>
    </div>
  );
};

export default Song;
