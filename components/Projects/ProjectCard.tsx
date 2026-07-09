"use client";
import { ProjectCardProps } from "@/types/ComponentProps";
import Button from "../Shared/Button";
import Link from "next/link";
import { FaGithub, FaGlobe } from "react-icons/fa6";
import { useTheme } from "next-themes";

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  link,
}) => {
  const { theme } = useTheme();
  const [githubUrl, liveUrl] = Array.isArray(link) ? link.filter(Boolean) : [];

  return (
    <div
      className={`flex flex-col gap-4 justify-between border  ${
        theme === "light" ? "border-gray-800" : "border-gray-400"
      } overflow-hidden hover:translate-x-1 hover:-translate-y-1 transition-all font-mono`}
    >
      <h3 className="font-semibold text-lg p-4">{title}</h3>{" "}
      <div className="p-4">
        <p className="">{description}</p>
        <div className="flex gap-2 flex-wrap my-2">
          {technologies.map((tech, key) => (
            <Button key={key}>{tech}</Button>
          ))}
        </div>
        {(githubUrl || liveUrl) && (
          <div className="flex gap-2">
            {githubUrl && (
              <Link href={githubUrl} target="_blank" rel="noreferrer">
                <Button className="flex justify-center align-middle cursor-pointer">
                  <FaGithub size={20} style={{ verticalAlign: "middle" }} />
                </Button>
              </Link>
            )}
            {liveUrl && (
              <Link href={liveUrl} target="_blank" rel="noreferrer">
              <Button className="flex justify-center align-middle cursor-pointer">
                <FaGlobe size={20} style={{ verticalAlign: "middle" }} />
              </Button>
            </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
