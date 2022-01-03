import { ClockIcon } from "@heroicons/react/outline";
import React from "react";

const SongHeader = () => {
  return (
    <div className="mb-4 bg-black hidden md:block lg:block">
      <div className="grid grid-cols-12 items-center text-gray-500 p-3">
        <div className="flex items-center space-x-4 col-span-5">
          <p>#</p>
          <p>TITLE</p>
        </div>
        <div className="col-span-3 ml-4">ALBUM</div>
        <div className="col-span-2 ml-4">DATE ADDED</div>
        <div className="col-span-2 flex justify-end pr-8">
          <ClockIcon className="h-4 w-4" />
        </div>
      </div>
      <hr className="border-t-[0.1px] mx-3 border-gray-700" />
    </div>
  );
};

export default SongHeader;
