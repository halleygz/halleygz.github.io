import ProjectList from "@/components/Projects/ProjectList";
import Heading from "@/components/Shared/Heading";
import { getProjects } from "@/lib/content";

export const revalidate = 300;

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div>
      <header className="mb-6 sm:mb-8 lg:mb-12">
        <Heading content="Projects" />
      </header>
      <ProjectList projectLists={projects} />
    </div>
  );
}
