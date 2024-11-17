import VideoGrid from "@/components/VideoGrid";
import Footer from "@/components/Footer";
import getVideos from "@/utils/getVideos";
import Link from "next/link";

export default async function Page() {
  const videos = await getVideos();
  return (
    <div className="scroll-mt-24">
      <div className="w-full px-4">
        <div className="max-w-4xl gap-2 text-sm mt-6 rounded-lg mx-auto p-4 bg-accent/60 flex xs:flex-row flex-col items-center justify-between">
          Interested in being apart of the database?
          <Link
            role="button"
            href="/submit-video"
            className="bg-primary text-black p-1.5 text-xs rounded-md hover:bg-neutral-300 xs:w-fit w-full text-center"
          >
            Submit video
          </Link>
        </div>
      </div>
      <VideoGrid videos={videos} />
      <Footer />
    </div>
  );
}
