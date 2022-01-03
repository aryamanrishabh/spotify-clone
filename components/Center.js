import { ChevronDownIcon, ClockIcon, UserIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import { calculateDuration, rng } from "../lib/helper";
import SongHeader from "./SongHeader";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-emerald-500",
  "from-rose-500",
  "from-pink-500",
  "from-violet-500",
  "from-sky-500",
  "fromcyan-500",
  "from-teal-500",
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState("");
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const durations = playlist?.tracks.items.map(
    (item) => item.track.duration_ms
  );

  const totalTime = durations?.reduce((a, b) => a + b, 0);

  useEffect(() => {
    setColor(colors[rng(colors.length)]);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => setPlaylist(data.body))
      .catch((err) => console.log("Something went wrong", err));
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className="text-white flex-grow overflow-y-scroll h-screen scrollbar-hide">
      <header className="absolute top-5 right-5">
        <div
          onClick={signOut}
          className="flex items-center bg-black text-white space-x-2 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
        >
          {session?.user.image ? (
            <img
              className="rounded-full w-5 h-5"
              src={session?.user.image}
              alt="User Image"
            />
          ) : (
            <UserIcon className="rounded-full bg-gray-600 text-white w-6 h-6" />
          )}
          <h2 className="font-bold">{session?.user.name}</h2>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 text-white p-8`}
      >
        <img
          className="w-52 h-52 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt="Playlist Icon"
        />
        <div className="space-y-2 md:space-y-4 lg:space-y-6">
          <div>
            <p className="font-bold text-xs">
              {playlist?.collaborative && "COLLABORATIVE "}PLAYLIST
            </p>
            <h1 className="text-4xl md:text-6xl xl:text-8xl font-bold">
              {playlist?.name}
            </h1>
          </div>
          <div className="flex space-x-2 items-center text-sm">
            <span className="font-bold ">{playlist?.owner?.display_name}</span>
            <div className="text-gray-500 hidden md:block lg:block space-x-1">
              {playlist?.followers?.total > 0 && (
                <>
                  <span>•</span>
                  <span>{`${playlist?.followers?.total} ${
                    playlist?.followers?.total > 1 ? "likes" : "like"
                  }`}</span>
                </>
              )}
              <span>•</span>
              <span>{`${playlist?.tracks?.total} songs, `}</span>
              <span>{calculateDuration(totalTime, "playlist")}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="font-bold text-sm px-8">
        <SongHeader />
        <Songs />
      </section>
    </div>
  );
};

export default Center;
