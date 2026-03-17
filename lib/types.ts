export type ProjectTag =
  | "Agent"
  | "RAG"
  | "Coding"
  | "Vision"
  | "Audio"
  | "Video"
  | "Image"
  | "Infra"
  | "Model"
  | "Research";

export interface Project {
  slug: string;
  featuredDate: string;
  fullName: string;
  name: string;
  owner: string;
  repoUrl: string;
  homepage: string | null;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  topics: string[];
  summaryZh: string;
  whyItMatters: string;
  fitFor: string;
  tags: ProjectTag[];
  qualityScore: number;
  trendScore: number;
  relevanceScore: number;
  totalScore: number;
  source: "github" | "fallback";
}

export interface DailyIssue {
  date: string;
  headline: string;
  summary: string;
  generatedAt: string;
  projectCount: number;
  projects: Project[];
}

export interface ArchiveEntry {
  date: string;
  headline: string;
  summary: string;
  projectCount: number;
}

export interface ArchiveIndex {
  latestIssueDate: string;
  generatedAt: string;
  days: ArchiveEntry[];
}
