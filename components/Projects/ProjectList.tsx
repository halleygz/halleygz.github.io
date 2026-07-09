import ProjectCard from "./ProjectCard";
import { ProjectListProps } from "@/types/ComponentProps";

const ProjectList: React.FC<ProjectListProps> = ({ projectLists }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 w-full lg:max-w-7/8 xl:max-w-4/5 2xl:max-w-3/4 md:ml-1 lg:ml-2">
      {projectLists.map((project) => (
        <ProjectCard
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          imageUrl={project.imageUrl}
          link={project.link}
          key={project.title}
        />
      ))}
    </div>
  );
};

export default ProjectList;
