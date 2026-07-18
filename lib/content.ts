"use server";

import { asc, desc, eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

import {
  experiences,
  profileContent,
  projects,
  skills,
  type ContentStage,
  type ExperienceRecord,
  type ProfileContentRecord,
  type ProjectRecord,
  type SkillRecord,
} from "@/db/schema";
import { db } from "@/lib/db";
import {
  type ExperienceItemsProps,
  type ProjectCardProps,
  type SkillCardProps,
} from "@/types/ComponentProps";

const CONTENT_CACHE_SECONDS = 300;

const defaultProfile = {
  heroSentences: [],
  intro: "",
  resumeUrl: "",
  footerHeading: "",
  footerSubtext: "",
  email: "",
  linkedinUrl: "",
  telegramUrl: "",
  githubUrl: "",
  copyrightName: "",
};

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      return trimmed.split(",").map((item) => item.trim()).filter(Boolean);
    }

    return [trimmed];
  }

  return [];
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function bool(value: unknown) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return ["true", "t", "1", "yes"].includes(value.toLowerCase());
  }

  return Boolean(value);
}

function mapProfile(profile: ProfileContentRecord | undefined) {
  return profile
    ? {
        heroSentences: toStringArray(profile.heroSentences),
        intro: text(profile.intro),
        resumeUrl: text(profile.resumeUrl),
        footerHeading: text(profile.footerHeading),
        footerSubtext: text(profile.footerSubtext),
        email: text(profile.email),
        linkedinUrl: text(profile.linkedinUrl),
        telegramUrl: text(profile.telegramUrl),
        githubUrl: text(profile.githubUrl),
        copyrightName: text(profile.copyrightName),
      }
    : defaultProfile;
}

function mapProject(project: ProjectRecord): ProjectCardProps {
  return {
    title: text(project.title, "Untitled project"),
    description: text(project.description),
    imageUrl: text(project.imageUrl),
    technologies: toStringArray(project.technologies),
    link: toStringArray(project.links),
  };
}

function mapSkill(skill: SkillRecord): SkillCardProps {
  return {
    setName: text(skill.setName, "Skills"),
    set: toStringArray(skill.items),
  };
}

function mapExperience(experience: ExperienceRecord): ExperienceItemsProps {
  return {
    title: text(experience.title, "Experience"),
    description: text(experience.description),
    duration: text(experience.duration),
    isCurrent: bool(experience.isCurrent),
    isLatest: bool(experience.isLatest),
  };
}

const getCachedProfileContent = cache(async (stage: ContentStage) => {
  const [profile] = await db
    .select()
    .from(profileContent)
    .where(eq(profileContent.stage, stage))
    .orderBy(desc(profileContent.updatedAt))
    .limit(1);

  return mapProfile(profile);
}, ["profile-content"], {
  revalidate: CONTENT_CACHE_SECONDS,
  tags: ["profile-content"],
});

const getCachedProjects = cache(async (stage: ContentStage) => {
  const records = await db
    .select()
    .from(projects)
    .where(eq(projects.stage, stage))
    .orderBy(asc(projects.sortOrder));

  return records.map(mapProject);
}, ["projects"], {
  revalidate: CONTENT_CACHE_SECONDS,
  tags: ["projects"],
});

const getCachedSkills = cache(async (stage: ContentStage) => {
  const records = await db
    .select()
    .from(skills)
    .where(eq(skills.stage, stage))
    .orderBy(asc(skills.sortOrder));

  return records.map(mapSkill);
}, ["skills"], {
  revalidate: CONTENT_CACHE_SECONDS,
  tags: ["skills"],
});

const getCachedExperienceItems = cache(async (stage: ContentStage) => {
  const records = await db
    .select()
    .from(experiences)
    .where(eq(experiences.stage, stage))
    .orderBy(asc(experiences.sortOrder));

  return records.map(mapExperience);
}, ["experience-items"], {
  revalidate: CONTENT_CACHE_SECONDS,
  tags: ["experience-items"],
});

function logContentError(source: string, error: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`Failed to read ${source} from the database.`, error);
  }
}

export async function getProfileContent(stage: ContentStage = "published") {
  try {
    return await getCachedProfileContent(stage);
  } catch (error) {
    logContentError("profile content", error);
    return defaultProfile;
  }
}

export async function getProjects(stage: ContentStage = "published") {
  try {
    return await getCachedProjects(stage);
  } catch (error) {
    logContentError("projects", error);
    return [];
  }
}

export async function getSkills(stage: ContentStage = "published") {
  try {
    return await getCachedSkills(stage);
  } catch (error) {
    logContentError("skills", error);
    return [];
  }
}

export async function getExperienceItems(stage: ContentStage = "published") {
  try {
    return await getCachedExperienceItems(stage);
  } catch (error) {
    logContentError("experience items", error);
    return [];
  }
}