import { useState } from "react";
import { Search, Plus, Copy, ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";

// Mock data for prompts
const mockPrompts = [
  {
    id: 1,
    title: "Surreal Digital Landscape",
    content: "Create a hyper-detailed digital painting of a surreal landscape with floating islands and a vibrant color palette.",
    category: 'art',
    likes: 128,
    comments: 24,
    author: 'DigitalDreamer',
    date: '2024-06-15',
    tags: ['digital art', 'landscape', 'sci-fi'],
    model: 'Midjourney v5.2'
  },
  {
    id: 2,
    title: "React Dashboard with Dark Mode",
    content: "Create a responsive admin dashboard using React and Tailwind CSS with dark/light mode toggle and analytics.",
    category: 'code',
    likes: 95,
    comments: 18,
    author: 'CodeWizard',
    date: '2024-06-12',
    tags: ['react', 'tailwind', 'dashboard'],
    model: 'GPT-4'
  },
  {
    id: 3,
    title: "Anxiety Management Session",
    content: "Create a 30-minute mental health counseling session plan for anxiety management with grounding techniques.",
    category: 'health',
    likes: 156,
    comments: 32,
    author: 'MindfulTherapist',
    date: '2024-06-10',
    tags: ['anxiety', 'therapy', 'mental health'],
    model: 'Claude 3'
  }
];

const categories = [
  { id: 'all', name: 'All Prompts' },
  { id: 'art', name: 'AI Art' },
  { id: 'code', name: 'Coding' },
  { id: 'health', name: 'Mental Health' },
  { id: 'education', name: 'Education' },
  { id: 'business', name: 'Business' },
  { id: 'food', name: 'Food & Drink' },
];

export default function AIPrompts() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [prompts, setPrompts] = useState(mockPrompts);
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);

  const filteredPrompts = prompts.filter(prompt => {
    const matchesCategory = activeCategory === 'all' || prompt.category === activeCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const toggleLike = (id: number) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === id 
        ? { ...prompt, likes: prompt.likes + (prompt.likes > 0 ? -1 : 1) }
        : prompt
    ));
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              AI Prompt Library
            </h1>
            <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
              Discover and share effective AI prompts for various use cases.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Search prompts by keyword, category, or model..."
                className="pl-10 w-full h-12 text-base bg-white/80 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? 'secondary' : 'ghost'}
                      className={`w-full justify-start ${activeCategory === category.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'}`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                      <span className="ml-auto text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                        {category.id === 'all' 
                          ? prompts.length 
                          : prompts.filter(p => p.category === category.id).length}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prompts List */}
          <div className="lg:w-3/4 space-y-6">
            {filteredPrompts.map(prompt => (
              <Card key={prompt.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900">
                        {prompt.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span>By {prompt.author}</span>
                        <span className="mx-2">•</span>
                        <span>{prompt.date}</span>
                        <span className="mx-2">•</span>
                        <Badge variant="secondary" className="text-xs">
                          {prompt.model}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => copyToClipboard(prompt.content, prompt.id)}
                      className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {copiedPromptId === prompt.id ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {prompt.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-md font-mono text-sm text-gray-700 whitespace-pre-wrap">
                    {prompt.content}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-0">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500 hover:text-indigo-600" onClick={() => toggleLike(prompt.id)}>
                      <ThumbsUp className="h-4 w-4" />
                      <span>{prompt.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500 hover:text-indigo-600">
                      <MessageSquare className="h-4 w-4" />
                      <span>{prompt.comments} comments</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500 hover:text-indigo-600">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-700">
                    {categories.find(c => c.id === prompt.category)?.name || prompt.category}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}