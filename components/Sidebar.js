import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  FingerPrintIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

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
    <div className="overflow-y-scroll scrollbar-hide h-screen text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] text-gray-500 hidden md:block">
      <div className="space-y-4  p-5 border-r border-gray-900">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <FingerPrintIcon className="h-5 w-5" />
          <p>Log Out</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
      </div>

      <hr className="border-t-[0.1px] mx-5 border-gray-700" />

      <div className="space-y-4 p-5 border-r border-gray-900">
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
      </div>

      <hr className="border-t-[0.1px] mx-5 border-gray-700" />

      {/* Playlists */}
      <div className="p-5 space-y-4">
        {playlists?.map((playlist, i) => (
          <p
            onClick={() => handleChange(playlist.id)}
            key={`${i}.playlist`}
            className={`cursor-pointer hover:text-white ${
              playlistId === playlist.id ? "text-white" : ""
            }`}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
