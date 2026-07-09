import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type ContentStage = "draft" | "published";

export const profileContent = pgTable("profile_content", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  stage: text("stage", { enum: ["draft", "published"] }).$type<ContentStage>().notNull().default("draft"),
  heroSentences: text("hero_sentences").array().notNull().default([]),
  intro: text("intro").notNull(),
  resumeUrl: text("resume_url").notNull(),
  footerHeading: text("footer_heading").notNull(),
  footerSubtext: text("footer_subtext").notNull(),
  email: text("email").notNull(),
  linkedinUrl: text("linkedin_url").notNull(),
  telegramUrl: text("telegram_url").notNull(),
  githubUrl: text("github_url").notNull(),
  copyrightName: text("copyright_name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  stage: text("stage", { enum: ["draft", "published"] }).$type<ContentStage>().notNull().default("draft"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  links: text("links").array().notNull().default([]),
  technologies: text("technologies").array().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const skills = pgTable("skills", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  stage: text("stage", { enum: ["draft", "published"] }).$type<ContentStage>().notNull().default("draft"),
  setName: text("set_name").notNull(),
  items: text("items").array().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const experiences = pgTable("experiences", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  stage: text("stage", { enum: ["draft", "published"] }).$type<ContentStage>().notNull().default("draft"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  isCurrent: boolean("is_current").notNull().default(false),
  isLatest: boolean("is_latest").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const schema = {
  profileContent,
  projects,
  skills,
  experiences,
};

export type ProjectRecord = typeof projects.$inferSelect;
export type SkillRecord = typeof skills.$inferSelect;
export type ExperienceRecord = typeof experiences.$inferSelect;
export type ProfileContentRecord = typeof profileContent.$inferSelect;