import Form from "./form";
import { Metadata } from "next";
import sharedOGImage from "../../lib/sharedOg";

const title = "Project Gen Z Writes - Submit Video";
const description =
  "Did you like the database? Are you a published author? Well, you are welcome to send us a video on any topic regarding craft, skill building, publishing or literary ancestors.";

export const metadata: Metadata = {
  title,
  description,
  category: title,
  openGraph: {
    title,
    url: "https://www.projectgenzwrites.com/submit-video",
    siteName: "Project Gen Z Writes",
    description,
    ...sharedOGImage,
  },
  twitter: {
    card: "summary",
    title,
    description,
    ...sharedOGImage,
  },
};

export default function Page() {
  return (
    <>
      <div className="p-4 py-12  space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold">Submit Video</h1>
        <div className="text-muted-foreground space-y-4">
          <p>
            Did you like the database? Are you a published author? Well, you are
            welcome to send us a video on any topic regarding craft, skill
            building, publishing or literary ancestors.{" "}
          </p>
          <p>
            We prefer the videos to be at least 5 minutes long and portrait mode
            but we are flexible. We like raw real honesty, but also
            inspirational content, we want to empower youth with the best
            creative writing education that we can possibly provide.{" "}
          </p>
        </div>
        <Form />
      </div>
    </>
  );
}
