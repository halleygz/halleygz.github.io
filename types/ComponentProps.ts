import React from "react";

interface HeadingProps {
  content: string;
};


interface TypewriterProps {
  sentences: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface ExperienceItemsProps {
  title: string;
  description: string;
  isCurrent?: boolean;
  duration: string;
  isLatest?: boolean;
}

interface ExperienceProps {
  experiences: ExperienceItemsProps[];
}

interface TimelineDotProps {
  isCurrent?: boolean;
  size?: number;
  isLatest?: boolean;
  className?: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string[];
  technologies: string[];
}

interface ProjectListProps {
  projectLists: ProjectCardProps[];
}

interface SkillCardProps {
  setName: string;
  set: string[];
}

interface SkillListProps {
  skills: SkillCardProps[];
}

export type {
  HeadingProps,
  TypewriterProps,
  BtnProps,
  ExperienceItemsProps,
  ExperienceProps,
  TimelineDotProps,
  ProjectCardProps,
  ProjectListProps,
  SkillCardProps,
  SkillListProps
}
