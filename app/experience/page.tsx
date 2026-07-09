import ExperienceTimeline from "@/components/Experience/ExperienceTimeline";
import Heading from "@/components/Shared/Heading";
import { getExperienceItems, getProfileContent } from "@/lib/content";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 300;

export default async function Experience() {
  const [exps, profile] = await Promise.all([
    getExperienceItems(),
    getProfileContent(),
  ]);

  return (
    <div>
      <header className="mb-10 sm:mb-12 lg:mb-16">
        <Heading content="Experience" />
      </header>
      <div>
        <ExperienceTimeline experiences={exps} />
      </div>
      {profile.resumeUrl && (
        <div>
          <Link
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 font-mono align-middle items-center underline"
          >
            <span>Resume</span>
            <span>
              <SquareArrowOutUpRight size={16} />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
