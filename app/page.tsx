import TypeWriter from "@/components/Animation/Typewriter";
import { getProfileContent } from "@/lib/content";

export const revalidate = 300;

export default async function Home() {
  const profile = await getProfileContent();

  return (
    <div>
      <header className="mb-10 sm:mb-12 lg:16">
        {/* <Heading content="Hey" /> */}
        <TypeWriter
          sentences={profile.heroSentences}
          className="font-mono text-4xl lg:text-8xl font-thin"
        />
      </header>

      <p className="font-mono font-extralight text-xl sm:w-full lg:w-1/2">
        {profile.intro}
      </p>
    </div>
  );
}
