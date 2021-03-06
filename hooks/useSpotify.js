import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import spotifyApi from "../lib/spotify";

const useSpotify = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // if refresh access token attempt fails redirect to login
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
