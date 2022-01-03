import React from "react";
import moment from "moment";
import useSpotify from "../hooks/useSpotify";
import { calculateDuration } from "../lib/helper";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track?.track.id);
    setIsPlaying(true);
    // spotifyApi.play({
    //   uris: [track.track.uri],
    // });
  };

  return (
    <div className="hover:backdrop-contrast-50 hover:rounded p-3">
      <div
        onClick={playSong}
        className="grid grid-cols-12 items-center space-x-4"
      >
        <div className="flex items-center space-x-4 col-span-5">
          <p>{order + 1}</p>
          <img
            className="h-10 w-10"
            src={track?.track.album.images[0].url}
            alt="Song cover"
          />
          <div>
            <p className="text-white">{track?.track.name}</p>
            <p>{track?.track.artists[0].name}</p>
          </div>
        </div>
        <div className="hidden md:block lg:block col-span-3 truncate">
          {track?.track.album.name}
        </div>
        <div className="hidden md:block lg:block col-span-2">
          {moment(track?.added_at).format("MMM DD, YYYY")}
        </div>
        <div className="hidden md:block lg:block col-span-2 text-right pr-8">
          {calculateDuration(track?.track.duration_ms, "song")}
        </div>
      </div>
    </div>
  );
};

export default Song;
