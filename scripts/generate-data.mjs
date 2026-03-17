import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const TODAY = new Date().toISOString().slice(0, 10);
const OUT_DIR = path.join(process.cwd(), "data", "generated");
const DAILY_DIR = path.join(OUT_DIR, "daily");
const PROJECTS_DIR = path.join(OUT_DIR, "projects");
const ARCHIVE_FILE = path.join(OUT_DIR, "archives.json");
const LATEST_FILE = path.join(OUT_DIR, "latest.json");

const SEARCH_TERMS = [
  "topic:agent",
  "topic:rag",
  "topic:llm",
  "topic:inference",
  "topic:multimodal",
  "\"ai coding\"",
];

const POSITIVE_KEYWORDS = [
  "agent",
  "ai",
  "assistant",
  "audio",
  "coding",
  "deployment",
  "embedding",
  "inference",
  "llm",
  "model",
  "multimodal",
  "rag",
  "retrieval",
  "serving",
  "speech",
  "vision",
  "workflow",
];

const NEGATIVE_KEYWORDS = [
  "awesome",
  "benchmark-list",
  "cheatsheet",
  "course",
  "curated",
  "dataset-list",
  "handbook",
  "paper-list",
  "prompt-library",
  "prompts",
  "recommend",
  "resource-list",
  "skill",
  "template",
  "warcraft",
  "notification",
  "terminal bell",
];

const TAG_MAP = [
  { tag: "Agent", keywords: ["agent", "assistant", "workflow", "autonomous"] },
  { tag: "RAG", keywords: ["rag", "retrieval", "knowledge", "embedding"] },
  { tag: "Coding", keywords: ["code", "coding", "developer", "software-engineering"] },
  { tag: "Vision", keywords: ["vision", "multimodal", "vlm"] },
  { tag: "Audio", keywords: ["audio", "speech", "voice", "tts"] },
  { tag: "Video", keywords: ["video"] },
  { tag: "Image", keywords: ["image", "diffusion", "generation"] },
  { tag: "Infra", keywords: ["inference", "serving", "deployment", "runtime", "infra"] },
  { tag: "Model", keywords: ["model", "llm"] },
  { tag: "Research", keywords: ["research", "paper"] },
];

const FALLBACK_PROJECTS = [
  {
    full_name: "langchain-ai/langgraph",
    html_url: "https://github.com/langchain-ai/langgraph",
    homepage: "https://www.langchain.com/langgraph",
    description: "Build resilient language agents as graphs.",
    language: "Python",
    stargazers_count: 11300,
    forks_count: 1030,
    open_issues_count: 178,
    created_at: "2024-01-17T00:00:00Z",
    updated_at: "2026-03-17T01:00:00Z",
    pushed_at: "2026-03-16T23:30:00Z",
    topics: ["agent", "workflow", "llm", "orchestration"],
  },
  {
    full_name: "microsoft/autogen",
    html_url: "https://github.com/microsoft/autogen",
    homepage: "https://microsoft.github.io/autogen",
    description: "A framework for building multi-agent AI applications.",
    language: "Python",
    stargazers_count: 42300,
    forks_count: 6100,
    open_issues_count: 509,
    created_at: "2023-06-01T00:00:00Z",
    updated_at: "2026-03-16T08:20:00Z",
    pushed_at: "2026-03-16T07:55:00Z",
    topics: ["agent", "multi-agent", "llm", "framework"],
  },
  {
    full_name: "crewAIInc/crewAI",
    html_url: "https://github.com/crewAIInc/crewAI",
    homepage: "https://crewai.com",
    description: "Framework for orchestrating role-playing autonomous AI agents.",
    language: "Python",
    stargazers_count: 31700,
    forks_count: 4200,
    open_issues_count: 361,
    created_at: "2023-11-21T00:00:00Z",
    updated_at: "2026-03-15T19:10:00Z",
    pushed_at: "2026-03-15T18:00:00Z",
    topics: ["agent", "automation", "llm"],
  },
  {
    full_name: "vllm-project/vllm",
    html_url: "https://github.com/vllm-project/vllm",
    homepage: "https://vllm.ai",
    description: "Easy, fast, and cheap LLM serving for everyone.",
    language: "Python",
    stargazers_count: 39200,
    forks_count: 6200,
    open_issues_count: 1940,
    created_at: "2023-06-20T00:00:00Z",
    updated_at: "2026-03-16T18:40:00Z",
    pushed_at: "2026-03-16T18:20:00Z",
    topics: ["llm", "inference", "serving", "infra"],
  },
  {
    full_name: "All-Hands-AI/OpenHands",
    html_url: "https://github.com/All-Hands-AI/OpenHands",
    homepage: "https://www.all-hands.dev",
    description: "An AI software engineer that writes code, runs commands, and fixes bugs.",
    language: "Python",
    stargazers_count: 61200,
    forks_count: 7200,
    open_issues_count: 580,
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2026-03-17T02:40:00Z",
    pushed_at: "2026-03-17T02:20:00Z",
    topics: ["agent", "coding", "software-engineering"],
  },
  {
    full_name: "run-llama/llama_index",
    html_url: "https://github.com/run-llama/llama_index",
    homepage: "https://www.llamaindex.ai",
    description: "Data framework for LLM applications to ingest, structure, and access private data.",
    language: "Python",
    stargazers_count: 38900,
    forks_count: 5800,
    open_issues_count: 211,
    created_at: "2022-11-01T00:00:00Z",
    updated_at: "2026-03-16T12:45:00Z",
    pushed_at: "2026-03-16T12:00:00Z",
    topics: ["rag", "retrieval", "llm", "data"],
  },
  {
    full_name: "OpenInterpreter/open-interpreter",
    html_url: "https://github.com/OpenInterpreter/open-interpreter",
    homepage: "https://openinterpreter.com",
    description: "A natural language interface for computers.",
    language: "Python",
    stargazers_count: 56800,
    forks_count: 4700,
    open_issues_count: 721,
    created_at: "2023-05-01T00:00:00Z",
    updated_at: "2026-03-14T17:00:00Z",
    pushed_at: "2026-03-14T16:20:00Z",
    topics: ["agent", "desktop", "automation", "llm"],
  },
  {
    full_name: "comfyanonymous/ComfyUI",
    html_url: "https://github.com/comfyanonymous/ComfyUI",
    homepage: "https://www.comfy.org",
    description: "The most powerful and modular diffusion model GUI and backend.",
    language: "Python",
    stargazers_count: 71600,
    forks_count: 8400,
    open_issues_count: 840,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2026-03-16T11:00:00Z",
    pushed_at: "2026-03-16T09:30:00Z",
    topics: ["image", "diffusion", "workflow", "gui"],
  },
];

function slugify(input) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function clampScore(score) {
  return Math.max(50, Math.min(98, Math.round(score)));
}

function getDaysAgo(dateString) {
  return Math.max(0, Math.round((Date.now() - new Date(dateString).getTime()) / 86400000));
}

function getHaystack(item) {
  return `${item.full_name} ${item.description ?? ""} ${(item.topics ?? []).join(" ")}`.toLowerCase();
}

function inferTags(item) {
  const haystack = getHaystack(item);
  const tags = TAG_MAP.filter(({ keywords }) => keywords.some((keyword) => haystack.includes(keyword))).map(
    ({ tag }) => tag,
  );

  if (tags.length === 0) {
    tags.push("Model");
  }

  return tags.slice(0, 3);
}

function inferSummary(item, tags) {
  const primaryTag = tags[0];
  const focusMap = {
    Agent: "这类项目更偏执行与编排，适合搭自动化工作流或多代理系统。",
    RAG: "它更偏数据接入和知识增强，适合做企业检索、问答和私有数据助手。",
    Coding: "它主要面向代码场景，适合做 AI 编程助手、代码生成或自动修复。",
    Vision: "这是偏视觉和多模态方向的项目，适合关注图像理解与感知交互。",
    Audio: "这是偏语音和音频方向的项目，适合做语音助手和实时交互场景。",
    Video: "这是偏视频理解或生成方向的项目，适合跟踪多模态内容处理能力。",
    Image: "这是偏图像生成或图形工作流的项目，适合关注创作和视觉生产力。",
    Infra: "它更偏底层推理和服务基础设施，适合关注性能、成本和部署效率。",
    Model: "这是偏模型能力或模型封装的项目，适合作为能力底座持续观察。",
    Research: "这是偏研究导向的项目，适合关注新范式和实验方向。",
  };

  return `${item.description ?? item.full_name} ${focusMap[primaryTag] ?? ""}`.trim();
}

function inferWhy(item, tags, scores) {
  const reasons = [];

  if (scores.trendScore >= 80) reasons.push("最近仍在高频更新");
  if (scores.qualityScore >= 78) reasons.push("仓库成熟度和社区基础都不错");
  if (tags.includes("Infra")) reasons.push("它在基础设施层，往往更接近真实生产需求");
  if (tags.includes("Agent")) reasons.push("Agent 方向仍在快速演化，很容易承接上层产品需求");
  if (tags.includes("RAG")) reasons.push("RAG 依然是企业场景最容易落地的一条线");
  if (tags.includes("Coding")) reasons.push("代码场景是 AI 提效和商业化最直接的战场之一");
  if (reasons.length === 0) reasons.push("它在定位和应用场景上都比较清晰");

  return `${reasons.slice(0, 2).join("，")}。`;
}

function inferFitFor(tags) {
  if (tags.includes("Infra")) return "适合做推理服务、模型部署、性能优化的工程团队。";
  if (tags.includes("Agent")) return "适合想做自动化助手、多 Agent 编排和企业工作流的团队。";
  if (tags.includes("RAG")) return "适合做知识库问答、企业搜索和私有数据助手的产品团队。";
  if (tags.includes("Coding")) return "适合做 AI Coding、代码审核、开发提效产品的团队。";
  if (tags.includes("Image") || tags.includes("Vision")) return "适合做多模态体验、视觉应用和创作工具的团队。";
  return "适合在持续跟踪 AI 开源趋势时作为重点观察对象。";
}

function scoreProject(item, tags) {
  const daysSincePush = getDaysAgo(item.pushed_at);
  const daysSinceCreate = getDaysAgo(item.created_at);
  const stars = item.stargazers_count ?? 0;

  const trendScore = clampScore(92 - Math.min(daysSincePush * 4, 36) + (daysSinceCreate < 180 ? 6 : 0));
  const qualityScore = clampScore(50 + Math.log10(Math.max(stars, 30)) * 13 + (item.homepage ? 3 : 0));
  const relevanceBase = tags.reduce((score, tag) => {
    if (tag === "Agent" || tag === "RAG" || tag === "Infra") return score + 11;
    return score + 7;
  }, 44);
  const relevanceScore = clampScore(relevanceBase);
  const totalScore = clampScore(trendScore * 0.42 + qualityScore * 0.36 + relevanceScore * 0.22);

  return { trendScore, qualityScore, relevanceScore, totalScore };
}

function isLikelyAiProject(item) {
  const haystack = getHaystack(item);
  const positiveHits = POSITIVE_KEYWORDS.filter((keyword) => haystack.includes(keyword)).length;
  const negativeHits = NEGATIVE_KEYWORDS.some((keyword) => haystack.includes(keyword));
  const language = String(item.language ?? "");
  const stars = item.stargazers_count ?? 0;

  if (negativeHits) return false;
  if (stars < 300) return false;
  if (getDaysAgo(item.pushed_at) > 45) return false;
  if (!(item.description || "").trim()) return false;
  if (String(item.homepage ?? "").includes("youtu")) return false;
  if (positiveHits < 2) return false;
  if (language === "Shell" && stars < 10000) return false;

  return true;
}

function toProject(item, source) {
  const tags = inferTags(item);
  const scores = scoreProject(item, tags);
  const [owner, name] = item.full_name.split("/");

  return {
    slug: slugify(item.full_name),
    featuredDate: TODAY,
    fullName: item.full_name,
    name,
    owner,
    repoUrl: item.html_url,
    homepage: item.homepage || null,
    description: item.description ?? "",
    language: item.language ?? null,
    stars: item.stargazers_count ?? 0,
    forks: item.forks_count ?? 0,
    openIssues: item.open_issues_count ?? 0,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    pushedAt: item.pushed_at,
    topics: item.topics ?? [],
    summaryZh: inferSummary(item, tags),
    whyItMatters: inferWhy(item, tags, scores),
    fitFor: inferFitFor(tags),
    tags,
    source,
    ...scores,
  };
}

async function fetchGitHubProjects() {
  const headers = {
    "User-Agent": "ai-radar-local-generator",
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const all = [];

  for (const term of SEARCH_TERMS) {
    const q = encodeURIComponent(`${term} stars:>100 fork:false archived:false`);
    const url = `https://api.github.com/search/repositories?q=${q}&sort=updated&order=desc&per_page=10`;

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`GitHub API failed: ${response.status}`);
      }

      const json = await response.json();
      all.push(...(json.items ?? []));
    } catch (error) {
      console.warn(`[ai-radar] GitHub fetch failed for "${term}":`, error.message);
    }
  }

  const deduped = new Map();

  for (const item of all) {
    if (!item?.full_name) continue;
    if (item.fork || item.archived) continue;
    if (!isLikelyAiProject(item)) continue;
    deduped.set(item.full_name, item);
  }

  return [...deduped.values()];
}

function selectFeaturedProjects(projects) {
  const sorted = [...projects].sort((a, b) => b.totalScore - a.totalScore);
  const picked = [];
  const tagCount = new Map();

  for (const project of sorted) {
    const primaryTag = project.tags[0] ?? "Model";
    const count = tagCount.get(primaryTag) ?? 0;
    if (count >= 2) continue;
    picked.push(project);
    tagCount.set(primaryTag, count + 1);
    if (picked.length === 8) break;
  }

  return picked;
}

function buildIssue(projects) {
  const selected = selectFeaturedProjects(projects);

  return {
    date: TODAY,
    headline: "把 GitHub 上分散的 AI 开源信号整理成一份适合每天快速浏览的精选清单。",
    summary:
      "系统会优先选择最近仍在活跃推进、定位清晰、不是资源集合类噪音仓库的 AI 开源项目，并提供中文摘要、标签和推荐理由。",
    generatedAt: new Date().toISOString(),
    projectCount: selected.length,
    projects: selected,
  };
}

async function ensureDirs() {
  await mkdir(DAILY_DIR, { recursive: true });
  await mkdir(PROJECTS_DIR, { recursive: true });
}

async function writeJson(filePath, data) {
  await writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

async function readJson(filePath, fallback) {
  try {
    const content = await readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

async function readExistingProjectSlugs() {
  try {
    const items = await readdir(PROJECTS_DIR);
    return new Set(items.filter((item) => item.endsWith(".json")).map((item) => item.replace(/\.json$/, "")));
  } catch {
    return new Set();
  }
}

async function main() {
  await ensureDirs();

  const githubProjects = await fetchGitHubProjects();
  const source = githubProjects.length > 0 ? "github" : "fallback";
  const rawProjects = githubProjects.length > 0 ? githubProjects : FALLBACK_PROJECTS;
  const projects = rawProjects.map((item) => toProject(item, source));
  const issue = buildIssue(projects);

  const existingArchives = await readJson(ARCHIVE_FILE, {
    latestIssueDate: issue.date,
    generatedAt: issue.generatedAt,
    days: [],
  });

  const days = [issue, ...(existingArchives.days ?? [])]
    .map((entry) => ({
      date: entry.date,
      headline: entry.headline,
      summary: entry.summary,
      projectCount: entry.projectCount,
    }))
    .filter((entry, index, arr) => arr.findIndex((candidate) => candidate.date === entry.date) === index)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const archives = {
    latestIssueDate: issue.date,
    generatedAt: issue.generatedAt,
    days,
  };

  await writeJson(LATEST_FILE, issue);
  await writeJson(ARCHIVE_FILE, archives);
  await writeJson(path.join(DAILY_DIR, `${TODAY}.json`), issue);

  const existingSlugs = await readExistingProjectSlugs();
  for (const project of projects) {
    existingSlugs.add(project.slug);
    await writeJson(path.join(PROJECTS_DIR, `${project.slug}.json`), project);
  }

  console.log(`[ai-radar] generated ${projects.length} candidates, featured ${issue.projectCount}, source=${source}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
