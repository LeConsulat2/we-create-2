import { useState } from "react";
import {
  Calendar,
  Clock,
  ExternalLink,
  ArrowRight,
  Bookmark,
  Share2,
  MessageSquare,
  ThumbsUp,
  Search,
  FileText,
  Link,
  Eye,
  Lock,
  UserPlus,
} from "lucide-react";

// Mock data - replace with your actual data
const aiArticles = [
  {
    id: 1,
    title: "Revolutionary AI Model Achieves Human-Level Performance in Complex Reasoning Tasks",
    summary: "Researchers at Stanford unveil GPT-5 with unprecedented capabilities in mathematical reasoning, code generation, and scientific analysis. The model demonstrates remarkable improvements in accuracy and efficiency across multiple domains.",
    author: "Dr. Sarah Chen",
    date: "2024-06-20",
    readTime: "5 min read",
    tags: ["GPT-5", "Machine Learning", "Research"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    isPremium: false
  },
  {
    id: 2,
    title: "OpenAI Announces Major Breakthrough in Multimodal AI Understanding",
    summary: "The latest update to ChatGPT now includes advanced visual processing capabilities, allowing users to analyze complex images, diagrams, and even video content with unprecedented accuracy. This represents a significant leap forward in AI-human interaction.",
    author: "Tech Weekly",
    date: "2024-06-19",
    readTime: "8 min read",
    tags: ["OpenAI", "Multimodal", "ChatGPT"],
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=200&fit=crop",
    isPremium: true
  },
  {
    id: 3,
    title: "Google's Gemini Pro Surpasses GPT-4 in Coding Benchmarks",
    summary: "In a comprehensive evaluation across multiple programming languages and complexity levels, Google's latest Gemini Pro model has demonstrated superior performance in code generation, debugging, and optimization tasks compared to existing models.",
    author: "AI Research Hub",
    date: "2024-06-18",
    readTime: "6 min read",
    tags: ["Google", "Gemini", "Coding"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
    isPremium: true
  }
];

// Tweet-style card component for premium content preview
const TweetStylePreview = ({ article, onJoinClick }) => (
  <div className="relative overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50/50 rounded-lg">
    {/* Premium badge */}
    <div className="absolute top-4 right-4 z-20">
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
        <Lock className="w-3 h-3 mr-1" />
        Premium
      </span>
    </div>

    {/* Content (partially visible) */}
    <div className="relative">
      {/* Header with avatar-style author info */}
      <div className="p-4 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {article.author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-semibold text-sm">{article.author}</p>
            <p className="text-gray-500 text-xs">@aiweekly • {article.date}</p>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="px-4">
        <h3 className="font-bold text-lg mb-3 line-clamp-2">
          {article.title}
        </h3>
        
        {/* Preview text with fade effect */}
        <div className="relative">
          <p className="text-gray-600 text-sm leading-relaxed">
            {article.summary.substring(0, 120)}...
          </p>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
        </div>

        {/* Tags (partially visible) */}
        <div className="flex gap-2 mt-4 opacity-60">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
              {tag}
            </span>
          ))}
          <span className="text-gray-500 text-xs">+more</span>
        </div>
      </div>

      {/* Interaction buttons (disabled/preview state) */}
      <div className="flex justify-between items-center p-4 opacity-50">
        <div className="flex gap-4">
          <button disabled className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed">
            <MessageSquare className="w-4 h-4" />
            12
          </button>
          <button disabled className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed">
            <ThumbsUp className="w-4 h-4" />
            45
          </button>
          <button disabled className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
        <span className="text-xs text-gray-500">{article.readTime}</span>
      </div>
    </div>

    {/* Call-to-action overlay */}
    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
          <Eye className="w-4 h-4" />
          <span>Preview Mode</span>
        </div>
        <button 
          onClick={onJoinClick}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Join to Read Full Article
        </button>
        <p className="text-xs text-gray-500">
          Free account • No credit card required
        </p>
      </div>
    </div>
  </div>
);

// Alternative: Blur effect preview
const BlurPreview = ({ article, onJoinClick }) => (
  <div className="relative overflow-hidden rounded-lg border bg-white shadow-sm group">
    {/* Main content with blur */}
    <div className="blur-sm group-hover:blur-none transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {article.tags.map((t) => (
            <span key={t} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {article.summary}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {article.author} • {article.date} • {article.readTime}
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ThumbsUp className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Overlay CTA */}
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
      <div className="text-center space-y-4 p-6">
        <Lock className="w-12 h-12 mx-auto text-gray-400" />
        <div>
          <h3 className="font-semibold mb-2">Premium Content</h3>
          <p className="text-sm text-gray-600 mb-4">
            Join our community to access full articles and exclusive content
          </p>
          <button 
            onClick={onJoinClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Join Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function AINewsPreview() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [previewStyle, setPreviewStyle] = useState("tweet"); // "tweet" or "blur"

  const handleJoinClick = () => {
    // Simulate joining/login
    alert("Redirecting to join page...");
  };

  const togglePreviewStyle = () => {
    setPreviewStyle(prev => prev === "tweet" ? "blur" : "tweet");
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/50 text-blue-800 border border-blue-200">
              AI News Preview
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Latest AI Insights
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get a taste of our premium AI content. Join our community for full access.
            </p>

            {/* Demo toggle */}
            <div className="flex justify-center">
              <button 
                onClick={togglePreviewStyle}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Preview Style: {previewStyle === "tweet" ? "Tweet Card" : "Blur Effect"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aiArticles.map((article) => (
            <div
              key={article.id}
              className="animate-in fade-in-50 duration-500"
              style={{ animationDelay: `${article.id * 100}ms` }}
            >
              {article.isPremium ? (
                previewStyle === "tweet" ? (
                  <TweetStylePreview 
                    article={article} 
                    onJoinClick={handleJoinClick}
                  />
                ) : (
                  <BlurPreview 
                    article={article} 
                    onJoinClick={handleJoinClick}
                  />
                )
              ) : (
                // Regular free article card
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-lg transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-0 right-0 p-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        Free
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {article.tags.map((t) => (
                        <span key={t} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {article.summary}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {article.author} • {article.date} • {article.readTime}
                      </div>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}