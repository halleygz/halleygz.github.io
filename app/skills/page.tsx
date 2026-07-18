import Heading from "@/components/Shared/Heading";
import SkillsList from "@/components/Skills/SkillsList";
import { getSkills } from "@/lib/content";

export const revalidate = 300;

export default async function Skills() {
  const skills = await getSkills();

  return (
    <div>
      <header className="mb-4 sm:mb-6 lg:mb-8">
        <Heading content="Skills"/>
      </header>
      <SkillsList skills={skills}/>
    </div>
  );
}
