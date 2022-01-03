import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  FingerPrintIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Image from "next/image";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => setPlaylists(data.body.items));
    }
  }, [session, spotifyApi]);

  const handleChange = (id) => setPlaylistId(id);

  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide text-xs lg:text-sm md:min-w-[12rem] lg:min-w-[15rem] text-gray-500 hidden md:block pb-36">
      <div className="space-y-4  p-5 border-r border-gray-900">
        <Image src="/spotify.svg" alt="" width="130" height="60" />
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p className="font-bold">Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p className="font-bold">Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p className="font-bold">Your Library</p>
        </button>
      </div>

      <hr className="border-t-[0.1px] mx-5 border-gray-700" />

      <div className="space-y-4 p-5 border-r border-gray-900">
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p className="font-bold">Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p className="font-bold">Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p className="font-bold">Your Episodes</p>
        </button>
      </div>

      <hr className="border-t-[0.1px] mx-5 border-gray-700" />

      <div className="p-5 space-y-4">
        {playlists?.map((playlist, i) => (
          <div
            key={`${i}.playlist`}
            className="flex justify-between items-center"
          >
            <p
              onClick={() => handleChange(playlist.id)}
              className={`cursor-pointer hover:text-white truncate ${
                playlistId === playlist.id ? "text-white" : ""
              }`}
            >
              {playlist.name}
            </p>
            {playlist.collaborative && <UsersIcon className="w-3 h-3" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
