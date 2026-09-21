type Skill = {
  name: string;
  icon: string;
  category: string;
  range: number;
};

/** Level label by score — used instead of a flat "Proficiency" word */
export function getSkillLevel(range: number): string {
  if (range >= 90) return "Expert";
  if (range >= 80) return "Advanced";
  if (range >= 70) return "Proficient";
  if (range >= 60) return "Intermediate";
  return "Familiar";
}

/** Star count tied to level (not raw percentage) */
export function getSkillStars(range: number): number {
  const level = getSkillLevel(range);
  switch (level) {
    case "Expert":
      return 5;
    case "Advanced":
      return 4;
    case "Proficient":
      return 3;
    case "Intermediate":
      return 2;
    default:
      return 1;
  }
}

export const skills: Skill[] = [
  // ——— AI/LLM (top first, then other levels) ———
  { name: "OpenAI API", icon: "openai", category: "AI/LLM", range: 96 },
  { name: "RAG", icon: "rag", category: "AI/LLM", range: 95 },
  { name: "LangChain", icon: "langchain", category: "AI/LLM", range: 94 },
  { name: "Claude", icon: "claude", category: "AI/LLM", range: 94 },
  { name: "Embeddings", icon: "embeddings", category: "AI/LLM", range: 93 },
  { name: "LangGraph", icon: "langgraph", category: "AI/LLM", range: 92 },
  { name: "Vector Search", icon: "vectorsearch", category: "AI/LLM", range: 92 },
  { name: "PyTorch", icon: "pytorch", category: "AI/LLM", range: 90 },
  { name: "Prompt Engineering", icon: "prompt", category: "AI/LLM", range: 88 },
  { name: "Hugging Face", icon: "huggingface", category: "AI/LLM", range: 82 },
  { name: "TensorFlow", icon: "tensorflow", category: "AI/LLM", range: 78 },
  { name: "LlamaIndex", icon: "llamaindex", category: "AI/LLM", range: 72 },
  { name: "Scikit-learn", icon: "sklearn", category: "AI/LLM", range: 68 },

  // ——— Language ———
  { name: "JavaScript", icon: "javascript", category: "Language", range: 96 },
  { name: "Python", icon: "python", category: "Language", range: 95 },
  { name: "TypeScript", icon: "typescript", category: "Language", range: 95 },
  { name: "C#", icon: "csharp", category: "Language", range: 82 },
  { name: "Java", icon: "java", category: "Language", range: 80 },
  { name: "Go", icon: "go", category: "Language", range: 72 },
  { name: "PHP", icon: "php", category: "Language", range: 65 },
  { name: "Rust", icon: "rust", category: "Language", range: 60 },

  // ——— Frontend ———
  { name: "React", icon: "react", category: "Frontend", range: 98 },
  { name: "Next.js", icon: "nextjs", category: "Frontend", range: 97 },
  { name: "Tailwind CSS", icon: "tailwindcss", category: "Frontend", range: 92 },
  { name: "HTML", icon: "html", category: "Frontend", range: 95 },
  { name: "CSS", icon: "css", category: "Frontend", range: 90 },
  { name: "Vue.js", icon: "vuejs", category: "Frontend", range: 78 },
  { name: "Angular", icon: "angular", category: "Frontend", range: 75 },
  { name: "React Native", icon: "reactnative", category: "Frontend", range: 85 },
  { name: "Svelte", icon: "svelte", category: "Frontend", range: 62 },

  // ——— Backend ———
  { name: "Node.js", icon: "nodejs", category: "Backend", range: 96 },
  { name: "Express.js", icon: "express", category: "Backend", range: 92 },
  { name: "FastAPI", icon: "fastapi", category: "Backend", range: 90 },
  { name: "NestJS", icon: "nestjs", category: "Backend", range: 88 },
  { name: "Django", icon: "django", category: "Backend", range: 88 },
  { name: ".NET", icon: "dotnet", category: "Backend", range: 82 },
  { name: "Spring Boot", icon: "springboot", category: "Backend", range: 80 },
  { name: "GraphQL", icon: "graphql", category: "Backend", range: 78 },
  { name: "Flask", icon: "flask", category: "Backend", range: 72 },
  { name: "REST APIs", icon: "restapi", category: "Backend", range: 94 },

  // ——— Database ———
  { name: "SQL", icon: "sql", category: "Database", range: 93 },
  { name: "PostgreSQL", icon: "postgresql", category: "Database", range: 92 },
  { name: "MongoDB", icon: "mongodb", category: "Database", range: 90 },
  { name: "MySQL", icon: "mysql", category: "Database", range: 88 },
  { name: "Redis", icon: "redis", category: "Database", range: 88 },
  { name: "Prisma", icon: "prisma", category: "Database", range: 86 },
  { name: "Elasticsearch", icon: "elasticsearch", category: "Database", range: 74 },
  { name: "SQLite", icon: "sqlite", category: "Database", range: 80 },
  { name: "DynamoDB", icon: "dynamodb", category: "Database", range: 68 },

  // ——— Cloud/DevOps ———
  { name: "Docker", icon: "docker", category: "Cloud/DevOps", range: 90 },
  { name: "AWS", icon: "aws", category: "Cloud/DevOps", range: 88 },
  { name: "CI/CD", icon: "cicd", category: "Cloud/DevOps", range: 88 },
  { name: "Kubernetes", icon: "kubernetes", category: "Cloud/DevOps", range: 85 },
  { name: "Azure", icon: "azure", category: "Cloud/DevOps", range: 82 },
  { name: "Linux", icon: "linux", category: "Cloud/DevOps", range: 86 },
  { name: "GCP", icon: "gcp", category: "Cloud/DevOps", range: 80 },
  { name: "Nginx", icon: "nginx", category: "Cloud/DevOps", range: 78 },
  { name: "Terraform", icon: "terraform", category: "Cloud/DevOps", range: 70 },
  { name: "Vercel", icon: "vercel", category: "Cloud/DevOps", range: 88 },

  // ——— AI & Development Tools ———
  { name: "Cursor", icon: "cursor", category: "AI & Development Tools", range: 95 },
  { name: "Git", icon: "git", category: "AI & Development Tools", range: 95 },
  { name: "ChatGPT", icon: "chatgpt", category: "AI & Development Tools", range: 94 },
  { name: "GitHub", icon: "github", category: "AI & Development Tools", range: 94 },
  { name: "Postman", icon: "postman", category: "AI & Development Tools", range: 90 },
  { name: "Slack", icon: "slack", category: "AI & Development Tools", range: 90 },
  { name: "GitLab", icon: "gitlab", category: "AI & Development Tools", range: 88 },
  { name: "Jira", icon: "jira", category: "AI & Development Tools", range: 85 },
  { name: "Figma", icon: "figma", category: "AI & Development Tools", range: 82 },
  { name: "VS Code", icon: "vscode", category: "AI & Development Tools", range: 94 },
  { name: "Notion", icon: "notion", category: "AI & Development Tools", range: 78 },
  { name: "Linear", icon: "linear", category: "AI & Development Tools", range: 72 },
];
