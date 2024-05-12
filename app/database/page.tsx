import VideoGrid from "@/components/VideoGrid";
import Footer from "@/components/Footer";
import getVideos from "@/utils/getVideos";

export default async function Page() {
  const videos = await getVideos();
  return (
    <div className="scroll-mt-24">
      <VideoGrid videos={videos} />
      <Footer />
    </div>
  );
}
