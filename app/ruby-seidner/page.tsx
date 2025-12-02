import TopHeader from "@/components/author/TopHeader";
import ShareButton from "@/components/global/ShareButton";
import author from "@/sanity/schemas/author";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InstagramIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Ruby Seidner",
  description:
    "Ruby Seidner is a poet, advocate, and activist. She's been published thirty-four times in various literary journals, won the Running Start Political Simulation in 2023, and participated in a Jubilee Media video that garnered over one million views. She's been a finalist for Sonoma County Youth Poet Laureate in 2024, a special awardee for the Bay Area Creative Youth Awards in 2025, and a finalist for the Sonoma County Office of Education's Five Minute Film Festival in 2023. She has graduated from online creative writing programs at the Kenyon Review and the Iowa Writers Workshop. She is the co-founder of the creative writing education database ProjectGenZWrites.",
  openGraph: {
    title: "Ruby Seidner",
    description:
      "Ruby Seidner is a poet, advocate, and activist. She's been published thirty-four times in various literary journals, won the Running Start Political Simulation in 2023, and participated in a Jubilee Media video that garnered over one million views. She's been a finalist for Sonoma County Youth Poet Laureate in 2024, a special awardee for the Bay Area Creative Youth Awards in 2025, and a finalist for the Sonoma County Office of Education's Five Minute Film Festival in 2023. She has graduated from online creative writing programs at the Kenyon Review and the Iowa Writers Workshop. She is the co-founder of the creative writing education database ProjectGenZWrites.",
    url: "https://projectgenzwrites.com/ruby-seidner",
    siteName: "Project Gen Z Writes",
    images: [
      {
        url: "https://projectgenzwrites.com/ruby.jpeg",
        width: 1200,
        height: 630,
        alt: "Ruby Seidner",
      },
    ],
  },
};

export default function Page() {
  const name = "Ruby Seidner";
  const description = "Ruby Seidner co-founder of ProjectGenZWrites";
  const slug = "/ruby-seidner";

  return (
    <>
      <div />
      <TopHeader
        src="/ruby.jpeg"
        name={name}
        description={description}
        slug={slug}
      />
      <div className="mb-10">
        <section className="sm:mt-36 mt-20 max-w-4xl mx-auto">
          <div className="px-4">
            <div className="space-y-4">
              <div className="xs:w-[120px] xs:h-[120px] w-[80px] h-[80px] relative">
                <Image
                  src="/ruby.jpeg"
                  alt="Ruby Seidner"
                  fill
                  sizes="(min-width: 475px) 120px, 80px"
                  className="object-cover absolute rounded-[50%]"
                />
              </div>
              <div className="flex justify-between items-center gap-6 flex-wrap">
                <h1 className="sm:text-4xl xs:text-3xl text-2xl font-semibold">
                  Ruby Seidner
                </h1>{" "}
                <div className="flex items-center gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link
                          href="https://www.instagram.com/projectgenzwrites/"
                          target="_blank"
                        >
                          <div className="flex flex-col items-center">
                            <InstagramIcon className="hover:bg-neutral-600/30 p-1 xs:h-8 xs:w-8 h-6 w-6 flex items-center justify-center rounded-md" />
                            <span className="text-xs">Instagram</span>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Ruby Seidner Instagram</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <ShareButton
                          title={name}
                          slug={slug}
                          text={description}
                        />
                      </TooltipTrigger>
                      <TooltipContent>Share</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            <section className="mt-16">
              <h2 className="sm:text-[28px] xs:text-2xl text-xl mb-2 font-medium">
                About
              </h2>
              <div className="space-y-4 leading-10 text-muted-foreground">
                <p>
                  Ruby Seidner is a poet, advocate, and activist. She&apos;s
                  been published thirty-four times in various literary journals,
                  won the Running Start Political Simulation in 2023, and
                  participated in a Jubilee Media video that garnered over one
                  million views. She&apos;s been a finalist for Sonoma County
                  Youth Poet Laureate in 2024, a special awardee for the Bay
                  Area Creative Youth Awards in 2025, and a finalist for the
                  Sonoma County Office of Education&apos;s Five Minute Film
                  Festival in 2023. She has graduated from online creative
                  writing programs at the Kenyon Review and the Iowa Writers
                  Workshop. She is the co-founder of the creative writing
                  education database ProjectGenZWrites.
                </p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
