"use client";

import React from "react";
import { skills, getSkillLevel } from "@/data/skills";
import { motion } from "framer-motion";
import {
  FaReact,
  FaVuejs,
  FaAngular,
  FaJs,
  FaPython,
  FaDocker,
  FaAws,
  FaGit,
  FaJava,
  FaNode,
  FaDatabase,
  FaHtml5,
  FaCss3,
  FaPhp,
  FaRust,
  FaLinux,
  FaFlask,
} from "react-icons/fa";
import {
  SiDjango,
  SiExpress,
  SiTypescript,
  SiNextdotjs,
  SiLangchain,
  SiOpenai,
  SiClaude,
  SiPytorch,
  SiFastapi,
  SiDotnet,
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiGooglecloud,
  SiKubernetes,
  SiGithub,
  SiGitlab,
  SiJira,
  SiPostman,
  SiFigma,
  SiSlack,
  SiGithubactions,
  SiHuggingface,
  SiTensorflow,
  SiGo,
  SiTailwindcss,
  SiSvelte,
  SiNestjs,
  SiGraphql,
  SiPrisma,
  SiElasticsearch,
  SiSqlite,
  SiAmazondynamodb,
  SiNginx,
  SiTerraform,
  SiVercel,
  SiNotion,
  SiLinear,
  SiScikitlearn,
} from "react-icons/si";
import { PiFileCSharp, PiGraph, PiChatCircleDotsBold } from "react-icons/pi";
import { GiArtificialIntelligence } from "react-icons/gi";
import { TbBrandAzure, TbVectorBezier, TbBrain, TbApi } from "react-icons/tb";
import { HiSparkles } from "react-icons/hi2";
import { VscVscode } from "react-icons/vsc";
import { LuBookOpen } from "react-icons/lu";
import FiveStar from "./Five-star";

type SkillIcon = (typeof skills)[number]["icon"];

const iconClass = "h-full w-full";

const skillIcons: Record<SkillIcon, React.ReactNode> = {
  // AI/LLM
  rag: <TbBrain className={iconClass} color="#A78BFA" />,
  langchain: <SiLangchain className={iconClass} color="#1CFFCE" />,
  langgraph: <PiGraph className={iconClass} color="#22C55E" />,
  openai: <SiOpenai className={iconClass} color="#10A37F" />,
  pytorch: <SiPytorch className={iconClass} color="#EE4C2C" />,
  claude: <SiClaude className={iconClass} color="#D97757" />,
  embeddings: <TbVectorBezier className={iconClass} color="#8B5CF6" />,
  vectorsearch: <GiArtificialIntelligence className={iconClass} color="#38BDF8" />,
  prompt: <PiChatCircleDotsBold className={iconClass} color="#FBBF24" />,
  huggingface: <SiHuggingface className={iconClass} color="#FFD21E" />,
  tensorflow: <SiTensorflow className={iconClass} color="#FF6F00" />,
  llamaindex: <LuBookOpen className={iconClass} color="#4F46E5" />,
  sklearn: <SiScikitlearn className={iconClass} color="#F7931E" />,

  // Language
  python: <FaPython className={iconClass} color="#3776AB" />,
  javascript: <FaJs className={iconClass} color="#F7DF1E" />,
  typescript: <SiTypescript className={iconClass} color="#3178C6" />,
  csharp: <PiFileCSharp className={iconClass} color="#512BD4" />,
  java: <FaJava className={iconClass} color="#007396" />,
  go: <SiGo className={iconClass} color="#00ADD8" />,
  php: <FaPhp className={iconClass} color="#777BB4" />,
  rust: <FaRust className={iconClass} color="#DEA584" />,

  // Frontend
  react: <FaReact className={iconClass} color="#61DAFB" />,
  nextjs: <SiNextdotjs className={iconClass} color="#ffffff" />,
  vuejs: <FaVuejs className={iconClass} color="#42b883" />,
  angular: <FaAngular className={iconClass} color="#DD0031" />,
  tailwindcss: <SiTailwindcss className={iconClass} color="#38B2AC" />,
  html: <FaHtml5 className={iconClass} color="#E34F26" />,
  css: <FaCss3 className={iconClass} color="#1572B6" />,
  reactnative: <FaReact className={iconClass} color="#61DAFB" />,
  svelte: <SiSvelte className={iconClass} color="#FF3E00" />,

  // Backend
  nodejs: <FaNode className={iconClass} color="#339933" />,
  express: <SiExpress className={iconClass} color="#ffffff" />,
  django: <SiDjango className={iconClass} color="#092E20" />,
  fastapi: <SiFastapi className={iconClass} color="#009688" />,
  nestjs: <SiNestjs className={iconClass} color="#E0234E" />,
  dotnet: <SiDotnet className={iconClass} color="#512BD4" />,
  springboot: <SiSpringboot className={iconClass} color="#6DB33F" />,
  graphql: <SiGraphql className={iconClass} color="#E10098" />,
  flask: <FaFlask className={iconClass} color="#ffffff" />,
  restapi: <TbApi className={iconClass} color="#22D3EE" />,

  // Database
  postgresql: <SiPostgresql className={iconClass} color="#4169E1" />,
  sql: <FaDatabase className={iconClass} color="#E8B931" />,
  mysql: <SiMysql className={iconClass} color="#4479A1" />,
  mongodb: <SiMongodb className={iconClass} color="#47A248" />,
  redis: <SiRedis className={iconClass} color="#DC382D" />,
  prisma: <SiPrisma className={iconClass} color="#ffffff" />,
  elasticsearch: <SiElasticsearch className={iconClass} color="#005571" />,
  sqlite: <SiSqlite className={iconClass} color="#003B57" />,
  dynamodb: <SiAmazondynamodb className={iconClass} color="#4053D6" />,

  // Cloud/DevOps
  aws: <FaAws className={iconClass} color="#FF9900" />,
  azure: <TbBrandAzure className={iconClass} color="#0078D4" />,
  gcp: <SiGooglecloud className={iconClass} color="#4285F4" />,
  docker: <FaDocker className={iconClass} color="#2496ED" />,
  cicd: <SiGithubactions className={iconClass} color="#2088FF" />,
  kubernetes: <SiKubernetes className={iconClass} color="#326CE5" />,
  linux: <FaLinux className={iconClass} color="#FCC624" />,
  nginx: <SiNginx className={iconClass} color="#009639" />,
  terraform: <SiTerraform className={iconClass} color="#7B42BC" />,
  vercel: <SiVercel className={iconClass} color="#ffffff" />,

  // Tools
  cursor: <HiSparkles className={iconClass} color="#A78BFA" />,
  chatgpt: <SiOpenai className={iconClass} color="#10A37F" />,
  git: <FaGit className={iconClass} color="#F05032" />,
  github: <SiGithub className={iconClass} color="#ffffff" />,
  gitlab: <SiGitlab className={iconClass} color="#FC6D26" />,
  jira: <SiJira className={iconClass} color="#0052CC" />,
  postman: <SiPostman className={iconClass} color="#FF6C37" />,
  figma: <SiFigma className={iconClass} color="#F24E1E" />,
  slack: <SiSlack className={iconClass} color="#4A154B" />,
  vscode: <VscVscode className={iconClass} color="#007ACC" />,
  notion: <SiNotion className={iconClass} color="#ffffff" />,
  linear: <SiLinear className={iconClass} color="#5E6AD2" />,
};

const Skills = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 bg-black">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-5">
        {skills.map((skill, index) => (
          <motion.li
            key={skill.icon + index}
            className="bg-[#1d1d1d85] shadow-lg rounded-xl p-3 sm:p-4 border border-[#374151] cursor-pointer relative flex flex-col items-center justify-between gap-2 sm:gap-3 min-h-[9.5rem] sm:min-h-[11rem] touch-manipulation"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <p className="w-full text-center text-xs sm:text-sm font-medium text-neutral-200 leading-tight line-clamp-2 min-h-[2rem] sm:min-h-[2.25rem] flex items-center justify-center px-0.5">
              {skill.name}
            </p>

            <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center shrink-0">
              {skillIcons[skill.icon]}
            </div>

            <div className="flex w-full flex-col items-center gap-1 sm:gap-1.5">
              <span className="text-[10px] sm:text-xs font-medium text-neutral-300">
                {getSkillLevel(skill.range)}
              </span>
              {skill.range != null && <FiveStar range={skill.range} />}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
