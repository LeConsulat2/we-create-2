import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("../pages/home.tsx"),
  route("weekly-ai", "../pages/weekly-ai.tsx"),
  route("community", "../pages/community.tsx"),
  route("ai-prompts", "../pages/ai-prompts.tsx"),
  route("ai-prompts-2", "../pages/ai-prompts-2.tsx"),
  route("portfolios", "../pages/portfolios.tsx"),
  route("reflections", "../pages/reflections.tsx"),
] satisfies RouteConfig;
