import { promises as fs } from "node:fs";
import path from "node:path";

import type { ArchiveIndex, DailyIssue, Project } from "@/lib/types";

const dataRoot = path.join(process.cwd(), "data", "generated");

async function readJsonFile<T>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

export async function getLatestIssue(): Promise<DailyIssue> {
  return readJsonFile<DailyIssue>(path.join(dataRoot, "latest.json"));
}

export async function getArchiveIndex(): Promise<ArchiveIndex> {
  return readJsonFile<ArchiveIndex>(path.join(dataRoot, "archives.json"));
}

export async function getIssueByDate(date: string): Promise<DailyIssue | null> {
  try {
    return await readJsonFile<DailyIssue>(path.join(dataRoot, "daily", `${date}.json`));
  } catch {
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await readJsonFile<Project>(path.join(dataRoot, "projects", `${slug}.json`));
  } catch {
    return null;
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projectDir = path.join(dataRoot, "projects");
  const items = await fs.readdir(projectDir);
  return items
    .filter((item) => item.endsWith(".json"))
    .map((item) => item.replace(/\.json$/, ""));
}

export async function getAllIssueDates(): Promise<string[]> {
  const dailyDir = path.join(dataRoot, "daily");
  const items = await fs.readdir(dailyDir);
  return items
    .filter((item) => item.endsWith(".json"))
    .map((item) => item.replace(/\.json$/, ""));
}
