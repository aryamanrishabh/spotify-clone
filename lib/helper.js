// Export file for helper functions

export const rng = (length) => {
  return Math.floor(Math.random() * length);
};

export const calculateDuration = (time, type) => {
  time = time / 1000;

  const hh = Math.floor(time / 3600);
  const mm = Math.floor((time % 3600) / 60);
  const ss = Math.floor((time % 3600) % 60);

  if (type === "playlist")
    return `${hh > 0 ? `${hh} hr` : ""} ${mm} min ${
      hh === 0 ? `${ss} sec` : ""
    }`;
  else if (type === "song")
    return `${hh > 0 ? `${hh}:` : ""}${mm}:${
      hh === 0 ? `${ss < 10 ? `0${ss}` : ss}` : ""
    }`;
};
