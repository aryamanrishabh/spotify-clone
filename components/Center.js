import { ChevronDownIcon, UserIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { rng } from "../lib/helper";

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

  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(colors[rng(colors.length)]);
  }, []);

  return (
    <div className="text-white flex-grow">
      <header className="absolute top-5 right-5">
        <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          {session?.user.image ? (
            <img
              className="rounded-full w-10 h-10"
              src={session?.user.image}
              alt=""
            />
          ) : (
            <UserIcon className="rounded-full bg-white text-black w-10 h-10" />
          )}
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 text-white p-8`}
      >
        <h1>Hello</h1>
      </section>
    </div>
  );
};

export default Center;
