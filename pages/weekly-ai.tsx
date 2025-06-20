import { useState } from "react";
import { Calendar, Clock, ExternalLink, ArrowRight, Bookmark, Share2, MessageSquare, ThumbsUp, Search, FileText } from "lucide-react";
import { Button } from "../app/ui/button";
import { Input } from "../app/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../app/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../app/ui/card";
import { Badge } from "../app/ui/badge";

// Mock data for AI articles
const aiArticles = [
  {
    id: 1,
    title: "The Future of Generative AI in 2024",
    summary: "Exploring the latest advancements in generative AI and what to expect in the coming year.",
    author: "Dr. Sarah Chen",
    date: "June 15, 2024",
    readTime: "8 min read",
    tags: ["Generative AI", "Trends", "2024"],
    likes: 124,
    comments: 23,
    isBookmarked: false,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 2,
    title: "Multi-Modal AI: Beyond Text and Images",
    summary: "How AI systems are learning to understand and generate content across multiple modalities.",
    author: "James Wilson",
    date: "June 10, 2024",
    readTime: "6 min read",
    tags: ["Multi-Modal AI", "Research", "Innovation"],
    likes: 89,
    comments: 15,
    isBookmarked: true,
    image: "https://images.unsplash.com/photo-1633356122544-f134324b6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 3,
    title: "Ethical Considerations in AI Development",
    summary: "Addressing the ethical challenges and responsibilities in modern AI development.",
    author: "Dr. Maria Garcia",
    date: "June 5, 2024",
    readTime: "10 min read",
    tags: ["Ethics", "Responsible AI", "Governance"],
    likes: 156,
    comments: 42,
    isBookmarked: false,
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80"
  }
];

// Mock data for AI tools
const aiTools = [
  {
    id: 1,
    name: "GPT-5 Playground",
    description: "Experiment with the latest GPT-5 model with advanced capabilities.",
    category: "Text Generation",
    url: "https://openai.com/gpt-5",
    isNew: true
  },
  {
    id: 2,
    name: "DALL-E 3",
    description: "Create stunning images from text descriptions with improved quality.",
    category: "Image Generation",
    url: "https://openai.com/dall-e-3",
    isNew: false
  },
  {
    id: 3,
    name: "CodeLlama",
    description: "State-of-the-art AI coding assistant for developers.",
    category: "Code Generation",
    url: "https://ai.meta.com/llama/code-llama/",
    isNew: true
  }
];

// Mock data for research papers
const researchPapers = [
  {
    id: 1,
    title: "Scaling Laws for Neural Language Models",
    authors: "J. Kaplan et al.",
    conference: "ICLR 2024",
    abstract: "We present a detailed empirical study of scaling laws for language model performance across multiple orders of magnitude of model size, dataset size, and compute budget.",
    url: "https://arxiv.org/abs/2301.00001"
  },
  {
    id: 2,
    title: "Towards Understanding the Role of Over-Parameterization in Deep Learning",
    authors: "S. Arora et al.",
    conference: "NeurIPS 2024",
    abstract: "This paper provides theoretical insights into why over-parameterized neural networks generalize well despite having more parameters than training examples.",
    url: "https://arxiv.org/abs/2301.00002"
  }
];

export default function WeeklyAI() {
  const [activeTab, setActiveTab] = useState("articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<number[]>([]);

  const toggleBookmark = (articleId: number) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const filteredArticles = aiArticles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 text-sm font-medium px-3 py-1 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              Weekly AI Digest
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              AI Insights & Innovations
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stay ahead with the latest AI research, tools, and trends. Curated weekly by experts in the field.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles, tools, or research..."
                className="pl-10 w-full h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="articles" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-3">
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                AI Tools
              </TabsTrigger>
              <TabsTrigger value="research" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Research
              </TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Week of June 17, 2024
            </div>
          </div>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-0 right-0 p-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={() => toggleBookmark(article.id)}
                      >
                        <Bookmark
                          className={`h-5 w-5 ${bookmarkedArticles.includes(article.id) ? 'fill-current' : ''}`}
                        />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {article.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl line-clamp-2">
                      <a
                        href={`#`}
                        className="hover:text-primary transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        {article.title}
                      </a>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="sr-only">Like</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {aiTools.map((tool) => (
                <Card key={tool.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {tool.name}
                          {tool.isNew && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </CardTitle>
                        <Badge variant="outline" className="mt-2">
                          {tool.category}
                        </Badge>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        Visit Tool <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Research Papers Tab */}
          <TabsContent value="research" className="space-y-6">
            <div className="space-y-6">
              {researchPapers.map((paper) => (
                <Card key={paper.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors flex items-center gap-2"
                      >
                        {paper.title}
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {paper.authors} • {paper.conference}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{paper.abstract}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-0">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Button variant="ghost" size="sm" className="h-8">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Discuss
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={paper.url} target="_blank" rel="noopener noreferrer">
                        Read Paper <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Stay Updated with AI Weekly</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest AI news, research, and tools delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="whitespace-nowrap">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}