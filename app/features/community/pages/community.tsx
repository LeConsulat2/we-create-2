import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Plus, MessageSquare, ThumbsUp, Share2, MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/ui/card";
import { Badge } from "@/ui/badge";

// Mock data
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

export default function Community() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [threads, setThreads] = useState(discussionThreads);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Join Our Growing Community
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with like-minded creators, share your knowledge, and grow together in our supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search discussions, members, or topics..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="whitespace-nowrap">
                <Plus className="mr-2 h-4 w-4" /> New Post
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
                <CardTitle>Featured Members</CardTitle>
                <CardDescription>Connect with active community members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.skills.slice(0, 2).map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View all members
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["react", "design", "javascript", "typescript", "ai", "figma", "nextjs", "tailwind"].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Tabs defaultValue="discussions" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 max-w-xs">
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="trending">Trending</option>
                  </select>
                </div>
              </div>
            </div>

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