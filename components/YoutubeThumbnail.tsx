import Image from "next/image";

interface YoutubeThumbnailProps {
  id: string;
  title: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
  iconClassName?: string;
  loading?: "eager" | "lazy";
}

const YoutubeThumbnail = ({
  id,
  title,
  className,
  width,
  height,
  iconClassName,
  loading,
}: YoutubeThumbnailProps) => {
  return (
    <div className={`relative sm:min-h-[${height}px]`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        fill="white"
        className={`w-8 h-8 absolute top-1/2 left-[45%] ${iconClassName ?? ""}`}
      >
        <path d="M48 432L336 256 48 80l0 352zM24.5 38.1C39.7 29.6 58.2 30 73 39L361 215c14.3 8.7 23 24.2 23 41s-8.7 32.2-23 41L73 473c-14.8 9.1-33.4 9.4-48.5 .9S0 449.4 0 432V80C0 62.6 9.4 46.6 24.5 38.1z" />
      </svg>
      <Image
        src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
        alt={`${title} Youtube Thumbnail`}
        className={`rounded-xl ${className}`}
        width={width}
        height={height}
        loading={loading}
      />
    </div>
  );
};

export default YoutubeThumbnail;
