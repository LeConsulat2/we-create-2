import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Plus, MessageSquare, ThumbsUp, Share2, MoreHorizontal, Calendar, Zap, Rocket, Lightbulb } from "lucide-react"; // Added new icons
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/ui/card";
import { Badge } from "@/ui/badge";

// Mock data (from your original component)
const featuredMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "AI Researcher",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    skills: ["Machine Learning", "Python", "TensorFlow"],
    posts: 42,
    joined: "2023"
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    skills: ["Figma", "UI/UX", "Prototyping"],
    posts: 28,
    joined: "2023"
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Full-stack Developer",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    skills: ["React", "Node.js", "TypeScript"],
    posts: 56,
    joined: "2022"
  }
];

const discussionThreads = [
  {
    id: 1,
    title: "How to optimize React performance?",
    author: "Sarah Miller",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    date: "2 hours ago",
    content: "I've been working on a large React application and noticed some performance issues. What are some best practices for optimizing React performance?",
    tags: ["react", "performance", "frontend"],
    likes: 24,
    comments: 8,
    isLiked: false
  },
  {
    id: 2,
    title: "Showcase your latest projects",
    author: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    date: "5 hours ago",
    content: "I just finished building a new portfolio using Next.js and Framer Motion. Would love to get some feedback! Check it out at...",
    tags: ["showcase", "nextjs", "portfolio"],
    likes: 15,
    comments: 5,
    isLiked: true
  },
  {
    id: 3,
    title: "Best practices for state management in 2024",
    author: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    date: "1 day ago",
    content: "With so many state management solutions out there, I'm curious what everyone is using in 2024. I've been using Zustand and really enjoying it.",
    tags: ["statemanagement", "react", "frontend"],
    likes: 32,
    comments: 14,
    isLiked: false
  }
];

// NEW MOCK DATA for AI Tools
const aiTools = [
  {
    id: 1,
    name: "ChatGPT",
    description: "Your go-to AI chatbot for writing, ideas, and conversation.",
    category: "Generative Text",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", // Placeholder for actual logo
    link: "https://openai.com/chatgpt/",
    tags: ["chatbot", "writing", "ideas"],
  },
  {
    id: 2,
    name: "Claude",
    description: "A powerful AI assistant from Anthropic for advanced reasoning and content generation.",
    category: "Generative Text",
    icon: "https://www.anthropic.com/images/logos/claude_logo_light.svg", // Placeholder
    link: "https://www.anthropic.com/index/claude",
    tags: ["chatbot", "reasoning", "long-form"],
  },
  {
    id: 3,
    name: "Midjourney",
    description: "Create stunning images from text descriptions with this advanced AI art generator.",
    category: "Image Generation",
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Midjourney_Logo.svg/1200px-Midjourney_Logo.svg.png", // Placeholder
    link: "https://www.midjourney.com/",
    tags: ["art", "images", "creativity"],
  },
  {
    id: 4,
    name: "ElevenLabs",
    description: "Generate realistic speech in various voices and languages from text.",
    category: "Audio Generation",
    icon: "https://elevenlabs.io/img/logo_11L.png", // Placeholder
    link: "https://elevenlabs.io/",
    tags: ["voice", "audio", "narration"],
  },
  {
    id: 5,
    name: "Gamma App",
    description: "Create beautiful presentations, documents, and webpages in seconds using AI.",
    category: "Productivity",
    icon: "https://assets-global.website-files.com/6249764a781b0f50731a196e/627447432f48f760f27c8a41_gamma-icon.png", // Placeholder
    link: "https://gamma.app/",
    tags: ["presentations", "slides", "documents"],
  },
  {
    id: 6,
    name: "HeyGen",
    description: "Generate professional AI videos with customizable avatars and voiceovers.",
    category: "Video Generation",
    icon: "https://assets-global.website-files.com/63c5017df8ef7a151b5c4644/63e17ce42c67fe44a0470557_favicon-32x32.png", // Placeholder
    link: "https://www.heygen.com/",
    tags: ["video", "avatars", "marketing"],
  },
  {
    id: 7,
    name: "Google Gemini",
    description: "Google's powerful and versatile AI model for diverse tasks.",
    category: "Generative Text",
    icon: "https://www.gstatic.com/images/icons/material/product/2x/gemini_48dp.png", // Placeholder
    link: "https://gemini.google.com/",
    tags: ["chatbot", "google", "multimodal"],
  },
  {
    id: 8,
    name: "Remove.bg",
    description: "Instantly remove backgrounds from images with a single click.",
    category: "Image Editing",
    icon: "https://www.remove.bg/apple-touch-icon.png", // Placeholder
    link: "https://www.remove.bg/",
    tags: ["photo editing", "background removal", "easy"],
  },
  {
    id: 9,
    name: "Ideogram AI",
    description: "Another powerful tool for generating creative images from text prompts.",
    category: "Image Generation",
    icon: "https://ideogram.ai/favicon.ico", // Placeholder
    link: "https://ideogram.ai/",
    tags: ["art", "images", "design"],
  },
  // Add more tools here following the same structure
  {
    id: 10,
    name: "Napkin AI",
    description: "Organize your thoughts and ideas quickly with this intelligent note-taking AI.",
    category: "Productivity",
    icon: "https://napkin.ai/favicon.ico", // Placeholder
    link: "https://napkin.ai/",
    tags: ["notes", "organization", "ideas"],
  },
  {
    id: 11,
    name: "HaiLuo", // Assuming this is a tool, description is generic
    description: "Explore new possibilities with HaiLuo's innovative AI solutions.",
    category: "General AI",
    icon: "/path/to/hailuo-icon.png", // Placeholder - you'd need to add this
    link: "#", // Placeholder link
    tags: ["innovation", "solutions"],
  },
  {
    id: 12,
    name: "Mirage Studio",
    description: "Create immersive 3D experiences with AI-powered design tools.",
    category: "3D Design",
    icon: "/path/to/mirage-studio-icon.png", // Placeholder
    link: "#", // Placeholder link
    tags: ["3D", "design", "immersive"],
  },
  {
    id: 13,
    name: "Veo 3", // Assuming Veo3 is a specific tool like a video editor or analysis tool
    description: "Advanced video analysis and content creation capabilities.",
    category: "Video Analysis",
    icon: "/path/to/veo3-icon.png", // Placeholder
    link: "#", // Placeholder link
    tags: ["video", "sports", "analysis"],
  }
];


export default function Community() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [threads, setThreads] = useState(discussionThreads);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiToolSearchQuery, setAiToolSearchQuery] = useState("");


  const handleLike = (id: number) => {
    setThreads(threads.map(thread =>
      thread.id === id
        ? { ...thread, likes: thread.isLiked ? thread.likes - 1 : thread.likes + 1, isLiked: !thread.isLiked }
        : thread
    ));
  };

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAiTools = aiTools.filter(tool =>
    tool.name.toLowerCase().includes(aiToolSearchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(aiToolSearchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(aiToolSearchQuery.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(aiToolSearchQuery.toLowerCase()))
  );


  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Explore the World of AI Tools
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover powerful AI tools designed for everyone. No technical skills needed – just curiosity! Learn what's out there and how these innovations can simplify your life and boost your creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tools, categories, or uses..."
                  className="pl-10 w-full"
                  value={aiToolSearchQuery} // Changed search query to filter AI tools
                  onChange={(e) => setAiToolSearchQuery(e.target.value)}
                />
              </div>
              <Button className="whitespace-nowrap">
                <Plus className="mr-2 h-4 w-4" /> Suggest a Tool
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Tool Categories</CardTitle>
                <CardDescription>Filter by common AI functionalities</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["Generative Text", "Image Generation", "Audio Generation", "Video Generation", "Productivity", "Image Editing", "3D Design", "Video Analysis", "General AI"].map((category) => (
                  <Badge key={category} variant="outline" className="cursor-pointer hover:bg-accent">
                    {category}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Explore AI?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Boost Productivity</h4>
                    <p className="text-sm text-muted-foreground">Automate tasks, analyze data faster, and streamline workflows.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Unleash Creativity</h4>
                    <p className="text-sm text-muted-foreground">Generate unique content, images, and ideas with ease.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Rocket className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Stay Ahead</h4>
                    <p className="text-sm text-muted-foreground">Understand the future of technology and its impact on daily life.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - AI Tools Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Tabs defaultValue="ai-tools" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 max-w-xs">
                  <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
                  <TabsTrigger value="discussions">Discussions</TabsTrigger> {/* Kept for context */}
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="popular">Most Popular</option>
                    <option value="new">Newly Added</option>
                    <option value="alpha">A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {activeTab === "ai-tools" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAiTools.map((tool) => (
                  <Card key={tool.id} className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      {tool.icon && (
                        <Avatar className="h-12 w-12 rounded-lg border">
                          <AvatarImage src={tool.icon} alt={tool.name} className="object-contain p-1" />
                          <AvatarFallback className="rounded-lg text-lg font-bold">{tool.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <CardDescription>{tool.category}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {tool.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t">
                      <a href={tool.link} target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </a>
                    </CardFooter>
                  </Card>
                ))}
                {filteredAiTools.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No AI tools found</h3>
                    <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
                  </div>
                )}
              </div>
            )}

            {/* Existing Discussions Tab Content */}
            {activeTab === "discussions" && (
              <div className="space-y-6">
                {filteredThreads.map((thread) => (
                  <Card key={thread.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={thread.avatar} alt={thread.author} />
                            <AvatarFallback>{thread.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{thread.author}</h3>
                            <p className="text-sm text-muted-foreground">{thread.date}</p>
                          </div>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/discussion/${thread.id}`} className="block">
                        <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                          {thread.title}
                        </h2>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {thread.content}
                        </p>
                      </Link>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {thread.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t px-6 py-3 bg-muted/20">
                      <button
                        onClick={() => handleLike(thread.id)}
                        className={`flex items-center gap-1.5 text-sm ${thread.isLiked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <ThumbsUp className={`h-4 w-4 ${thread.isLiked ? 'fill-current' : ''}`} />
                        {thread.likes} {thread.likes === 1 ? 'Like' : 'Likes'}
                      </button>
                      <Link to={`/discussion/${thread.id}#comments`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                        <MessageSquare className="h-4 w-4" />
                        {thread.comments} {thread.comments === 1 ? 'Comment' : 'Comments'}
                      </Link>
                      <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "events" && (
              <div className="text-center py-12">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No upcoming events</h3>
                <p className="mt-2 text-muted-foreground">Check back later for community events and meetups.</p>
                <Button className="mt-4">Suggest an Event</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}