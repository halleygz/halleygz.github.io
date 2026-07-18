"use client";
import { SkillCardProps } from "@/types/ComponentProps";
import React from "react";
import Button from "../Shared/Button";
import { useTheme } from "next-themes";

const SkillsCard: React.FC<SkillCardProps> = ({ setName, set }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`border ${
        theme === "light" ? "border-gray-800" : "border-gray-400"
      } overflow-hidden font-mono w-full p-4`}
    >
      <h2 className="font-semibold text-xl lg:text-2xl mb-4">{setName}</h2>
      <div className="flex gap-2 flex-wrap">
        {set.map((skill) => (
          <Button key={skill}>{skill}</Button>
        ))}
      </div>
    </div>
  );
};

export default SkillsCard;
