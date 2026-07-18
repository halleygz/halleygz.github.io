import React from "react";
import ExperienceItem from "./ExperienceItem";
import { ExperienceProps } from "@/types/ComponentProps";

const ExperienceTimeline: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <div className="pl-8">
      <div className="flex flex-col relative">
       
          <div
            className={`absolute top-2 bottom-4 -left-4 w-px bg-gray-500`}
          />
        {experiences.map((exp) => (
          <ExperienceItem
            title={exp.title}
            description={exp.description}
            duration={exp.duration}
            isCurrent={exp.isCurrent}
            isLatest={exp.isLatest}
            key={exp.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
