const YoutubePlayer = ({
  id,
  width,
  height,
}: {
  id: string;
  width: string;
  height: string;
  title: string;
}) => {
  return (
    <div className={`aspect-video h-full sm:min-h-[${height}px]`}>
      <iframe
        width="100%"
        height="100%"
        className={`rounded-xl w-full min-w-[${width}px] h-full`}
        title="Youtube Video Player"
        src={`https://www.youtube.com/embed/${id}?&autoplay=1&playsinline=1&mute=1&rel=0`}
        allowFullScreen
        loading="eager"
      />
    </div>
  );
};

export default YoutubePlayer;
