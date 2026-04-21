const getYoutubeId = (link: string) => {
  const regex =
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/m;
  return regex.exec(link)![3];
};

export default getYoutubeId;