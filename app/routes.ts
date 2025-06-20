import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("./common/pages/home.tsx"),

  // 주요 기능 페이지들 (레이아웃 없음)
  route("weekly-ai", "./features/ai-news/pages/weekly-ai.tsx"),
  route("community", "./features/community/pages/community.tsx"),
  route("ai-prompts", "./features/ai-prompts/pages/ai-prompts.tsx"),
  // route("ai-prompts-2", "./features/ai-prompts/pages/ai-prompts-2.tsx"),
  route("ai-tools", "./features/ai-tools/pages/ai-tools.tsx"),
  route("portfolios", "./features/portfolios/pages/portfolios.tsx"),
  route("suggestions", "./features/suggestions/pages/suggestions.tsx"),
  route("ai-news-archive", "./features/ai-news-archives/pages/ai-news-archive.tsx"),
  // route("reflections", "./features/reflections/pages/reflections.tsx"),

  // 2) 인증 전용 레이아웃 (Navbar, Footer 없음)
  layout("./features/auth/layout/auth-layout.tsx", [
    route("login", "./features/auth/pages/login.tsx"),
    route("join", "./features/auth/pages/join.tsx"),
    route("logout", "./features/auth/pages/logout.tsx"),
  ]),
] satisfies RouteConfig;