const YoutubePlayer = ({
  id,
  width,
  height,
}: {
  id: string;
  width: number | string;
  height: number | string;
  title: string;
}) => {
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;
  return (
    <div className={`aspect-video h-full sm:min-h-[${h}]`}>
      <iframe
        width="100%"
        height="100%"
        className={`rounded-xl w-full min-w-[${w}] h-full`}
        title="Youtube Video Player"
        src={`https://www.youtube.com/embed/${id}?&autoplay=1&playsinline=1&mute=1&rel=0`}
        allowFullScreen
        loading="eager"
      />
    </div>
  );
};

export default YoutubePlayer;
