import { useState } from "react";
import { HeartPulse, Stethoscope, Clock, MessageSquare, ThumbsUp, Share2, BookOpen, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

// Mock data for reflections
const reflections = [
  {
    id: 1,
    title: "The Longest 8 Hours of My Nursing Career",
    content: "Yesterday, I assisted in an 8-hour surgery that pushed me to my limits. The patient was a young father with three kids, and the stakes felt incredibly high. The physical toll of standing in one position, the mental focus required, and the emotional weight of knowing a family's world was in our hands... It was exhausting but reminded me why I chose this profession.",
    author: "Sarah M., OR Nurse",
    role: "Operating Room Nurse",
    experience: "7 years",
    date: "June 18, 2024",
    readTime: "5 min read",
    tags: ["Surgery", "Nursing", "Patient Care", "Long Shifts"],
    likes: 42,
    comments: 8,
    isLiked: false
  },
  {
    id: 2,
    title: "When the Patient Becomes a Friend",
    content: "After 3 months of daily dialysis treatments, Mr. Johnson and I developed a special bond. Today was his last session before getting a kidney transplant. The mix of joy for his new chance at life and the sadness of saying goodbye was overwhelming. These connections make the tough days worthwhile.",
    author: "David K., Dialysis Nurse",
    role: "Nephrology Nurse",
    experience: "5 years",
    date: "June 15, 2024",
    readTime: "3 min read",
    tags: ["Dialysis", "Patient Relationships", "Nursing"],
    likes: 36,
    comments: 5,
    isLiked: true
  },
  {
    id: 3,
    title: "The Night Shift That Changed Me",
    content: "Last night in the ER was one of those shifts that stays with you. Multiple traumas, critical patients, and not enough hands. At 3 AM, when I finally had a moment to breathe, I found myself in the break room with a cup of cold coffee, wondering how we managed to keep it all together. The camaraderie among night shift staff is something special - we're a family that keeps each other going when the going gets tough.",
    author: "Emma R., ER Nurse",
    role: "Emergency Room Nurse",
    experience: "4 years",
    date: "June 10, 2024",
    readTime: "4 min read",
    tags: ["Emergency", "Night Shift", "Teamwork", "Trauma"],
    likes: 58,
    comments: 12,
    isLiked: false
  }
];

// Mock data for popular tags
const popularTags = [
  { name: "Nursing", count: 128 },
  { name: "Surgery", count: 94 },
  { name: "ER Stories", count: 76 },
  { name: "Patient Care", count: 65 },
  { name: "Night Shift", count: 53 },
  { name: "Pediatrics", count: 47 },
  { name: "ICU", count: 42 },
  { name: "Mental Health", count: 38 }
];

export default function Reflections() {
  const [activeTab, setActiveTab] = useState("latest");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tags: "",
    role: "",
    experience: ""
  });
  const [reflectionsList, setReflectionsList] = useState(reflections);

  const handleLike = (id: number) => {
    setReflectionsList(prev => 
      prev.map(reflection => 
        reflection.id === id 
          ? { ...reflection, isLiked: !reflection.isLiked, likes: reflection.isLiked ? reflection.likes - 1 : reflection.likes + 1 }
          : reflection
      )
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReflection = {
      id: reflectionsList.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: "You",
      role: newPost.role,
      experience: newPost.experience,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: `${Math.ceil(newPost.content.split(' ').length / 200)} min read`,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      likes: 0,
      comments: 0,
      isLiked: false
    };
    
    setReflectionsList([newReflection, ...reflectionsList]);
    setNewPost({
      title: "",
      content: "",
      tags: "",
      role: "",
      experience: ""
    });
    setShowNewPost(false);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-amber-50 to-amber-100/50">
      {/* Hero Section */}
      <div className="border-b border-amber-200 bg-gradient-to-r from-amber-400/10 to-orange-400/10">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-amber-100 text-amber-800 mb-6">
              <HeartPulse className="h-5 w-5 mr-2" />
              <span className="font-medium">Healthcare Professionals Community</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
              Reflections
            </h1>
            <p className="text-xl text-amber-900/80 mb-8 max-w-2xl mx-auto">
              A space for healthcare workers to share experiences, challenges, and moments that remind us why we do what we do.
            </p>
            <Button 
              onClick={() => setShowNewPost(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-6 text-lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Share Your Story
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <Tabs defaultValue="latest" className="w-full" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-8">
                <TabsList>
                  <TabsTrigger value="latest" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Latest
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="flex items-center gap-2">
                    <HeartPulse className="h-4 w-4" />
                    Most Liked
                  </TabsTrigger>
                </TabsList>
                <div className="text-sm text-amber-900/70">
                  {reflectionsList.length} stories shared
                </div>
              </div>

              {/* New Post Form */}
              {showNewPost && (
                <Card className="mb-8 border-amber-200 bg-amber-50/50">
                  <CardHeader>
                    <CardTitle>Share Your Experience</CardTitle>
                    <CardDescription>
                      Your story matters. Share your experiences to support and inspire fellow healthcare professionals.
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium text-amber-900/80">
                          Title
                        </label>
                        <Input
                          id="title"
                          name="title"
                          value={newPost.title}
                          onChange={handleInputChange}
                          placeholder="What's your story about?"
                          className="bg-white border-amber-200 focus:border-amber-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium text-amber-900/80">
                          Your Story
                        </label>
                        <Textarea
                          id="content"
                          name="content"
                          value={newPost.content}
                          onChange={handleInputChange}
                          placeholder="Share your experience..."
                          className="min-h-[200px] bg-white border-amber-200 focus:border-amber-400"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="role" className="text-sm font-medium text-amber-900/80">
                            Your Role
                          </label>
                          <Input
                            id="role"
                            name="role"
                            value={newPost.role}
                            onChange={handleInputChange}
                            placeholder="e.g., OR Nurse, Surgeon, etc."
                            className="bg-white border-amber-200 focus:border-amber-400"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="experience" className="text-sm font-medium text-amber-900/80">
                            Years of Experience
                          </label>
                          <Input
                            id="experience"
                            name="experience"
                            value={newPost.experience}
                            onChange={handleInputChange}
                            placeholder="e.g., 5 years"
                            className="bg-white border-amber-200 focus:border-amber-400"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="tags" className="text-sm font-medium text-amber-900/80">
                          Tags (comma separated)
                        </label>
                        <Input
                          id="tags"
                          name="tags"
                          value={newPost.tags}
                          onChange={handleInputChange}
                          placeholder="e.g., Surgery, Nursing, Patient Care"
                          className="bg-white border-amber-200 focus:border-amber-400"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowNewPost(false)}
                        className="border-amber-300 text-amber-700 hover:bg-amber-50"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        Share Your Story
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}

              {/* Reflections List */}
              <div className="space-y-8">
                {reflectionsList.map((reflection) => (
                  <Card key={reflection.id} className="border-amber-100 bg-white/70 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl font-bold text-amber-900 mb-2">
                            {reflection.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-amber-800/80 mb-3">
                            <span className="font-medium">{reflection.author}</span>
                            <span>•</span>
                            <span>{reflection.role}</span>
                            <span>•</span>
                            <span>{reflection.experience} experience</span>
                            <span>•</span>
                            <span>{reflection.date}</span>
                            <span>•</span>
                            <span>{reflection.readTime}</span>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-8 w-8 rounded-full ${reflection.isLiked ? 'text-amber-600' : 'text-amber-400'}`}
                          onClick={() => handleLike(reflection.id)}
                        >
                          <HeartPulse className={`h-4 w-4 ${reflection.isLiked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {reflection.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-amber-900/90 leading-relaxed">
                        {reflection.content.length > 300 
                          ? `${reflection.content.substring(0, 300)}...` 
                          : reflection.content}
                        {reflection.content.length > 300 && (
                          <Button variant="link" className="text-amber-600 p-0 h-auto ml-1">
                            Read more
                          </Button>
                        )}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-0">
                      <div className="flex items-center gap-4 text-sm text-amber-700/80">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-amber-700/80 hover:text-amber-900 hover:bg-amber-100/50">
                          <MessageSquare className="h-4 w-4" />
                          <span>{reflection.comments} comments</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-amber-700/80 hover:text-amber-900 hover:bg-amber-100/50">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <HeartPulse className={`h-4 w-4 ${reflection.isLiked ? 'text-amber-600 fill-current' : 'text-amber-400'}`} />
                        <span className="text-sm font-medium text-amber-700">{reflection.likes}</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* About Card */}
            <Card className="border-amber-100 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  About This Space
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-900/80 mb-4">
                  This is a safe space for healthcare professionals to share their experiences, challenges, and moments of triumph. 
                  Your stories help build understanding and support within our community.
                </p>
                <p className="text-amber-900/80">
                  Share your journey, connect with peers, and find strength in our shared experiences.
                </p>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="border-amber-100 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="text-amber-900">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm" 
                      className="text-amber-700 border-amber-200 bg-white/50 hover:bg-amber-50"
                    >
                      {tag.name}
                      <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-700 hover:bg-amber-200">
                        {tag.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="border-amber-100 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="text-amber-900">Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-white/50 border border-amber-100">
                  <h4 className="font-medium text-amber-900 mb-1">Healthcare Worker Support</h4>
                  <p className="text-sm text-amber-900/70 mb-2">Confidential support services for healthcare professionals.</p>
                  <Button variant="link" size="sm" className="text-amber-600 p-0 h-auto">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4 rounded-lg bg-white/50 border border-amber-100">
                  <h4 className="font-medium text-amber-900 mb-1">Wellbeing Resources</h4>
                  <p className="text-sm text-amber-900/70 mb-2">Tools and strategies for maintaining mental health.</p>
                  <Button variant="link" size="sm" className="text-amber-600 p-0 h-auto">
                    Explore resources <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}