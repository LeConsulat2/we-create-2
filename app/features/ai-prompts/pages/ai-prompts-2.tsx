import { useState } from "react";
import { Bot, Search, Copy, Check, Star, Eye, Download, Filter, Plus, Sparkles, Code, Palette, FileText, Brain, Users, Coffee, Stethoscope, BookOpen, Lightbulb, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";

// Mock data for AI prompts
const aiPrompts = [
  {
    id: 1,
    title: "Professional Medical Report Rewriter",
    description: "Transform clinical notes into polished, professional reports while maintaining medical accuracy",
    prompt: `You are an expert medical writer with 15+ years of experience in clinical documentation. Please rewrite the following medical report to be more professional, clear, and comprehensive while maintaining all clinical accuracy and following proper medical documentation standards.

Requirements:
- Use proper medical terminology where appropriate
- Ensure clear, logical flow of information
- Maintain objective, professional tone
- Include relevant clinical details
- Follow standard medical report structure
- Ensure patient confidentiality compliance

Original report to rewrite:
[PASTE YOUR REPORT HERE]

Please provide:
1. Rewritten professional version
2. Brief explanation of key improvements made
3. Any recommendations for additional clinical details that might strengthen the report`,
    category: "Medical Writing",
    subcategory: "Clinical Documentation",
    author: "Dr. Sarah Chen",
    role: "Senior Physician",
    tags: ["Medical Reports", "Clinical Writing", "Documentation", "Professional"],
    difficulty: "Advanced",
    estimatedTime: "10-15 minutes",
    useCount: 2847,
    rating: 4.9,
    dateAdded: "2024-06-15",
    isFavorited: false,
    resultExample: "Transforms basic clinical notes into comprehensive, professional medical reports suitable for peer review and official documentation.",
    aiModel: "GPT-4",
    copyCount: 892
  },
  {
    id: 2,
    title: "Creative Digital Art Prompt Generator",
    description: "Generate stunning visual artwork prompts for AI image generators like DALL-E, Midjourney, or Stable Diffusion",
    prompt: `You are a master digital art director and prompt engineer specializing in AI-generated artwork. Create a detailed, sophisticated prompt for generating beautiful, professional-quality digital art.

Style Categories: [Choose one or combine]
- Photorealistic portraits
- Abstract conceptual art  
- Minimalist modern design
- Fantasy/sci-fi illustration
- Medical/healthcare visualization
- Architectural renders
- Nature photography style

Please create a comprehensive art generation prompt that includes:

1. **Subject/Main Focus**: [Describe what you want depicted]
2. **Visual Style**: Artistic movement, aesthetic, mood
3. **Technical Specifications**: Resolution, composition, lighting
4. **Color Palette**: Specific colors, mood, contrast
5. **Additional Details**: Textures, effects, atmosphere

Example structure:
"A [subject] in [setting], [artistic style], [lighting description], [color palette], [camera angle], [additional artistic elements], trending on ArtStation, professional quality, 8K resolution"

What type of artwork would you like me to help you create a prompt for?`,
    category: "Creative Arts",
    subcategory: "Digital Art",
    author: "Marcus Rivera",
    role: "Digital Art Director",
    tags: ["Digital Art", "DALL-E", "Midjourney", "Creative", "Visual Design"],
    difficulty: "Intermediate",
    estimatedTime: "5-10 minutes",
    useCount: 5643,
    rating: 4.8,
    dateAdded: "2024-06-18",
    isFavorited: true,
    resultExample: "Creates detailed prompts that generate professional-quality digital artwork suitable for presentations, marketing, or personal projects.",
    aiModel: "GPT-4",
    copyCount: 1456
  },
  {
    id: 3,
    title: "Single Page Application Builder",
    description: "Generate complete, functional React/HTML applications with modern design and full functionality",
    prompt: `You are a senior full-stack developer and UI/UX designer with expertise in modern web development. Create a complete, professional single-page application (SPA) based on the requirements below.

Technical Stack:
- React with TypeScript (or vanilla HTML/CSS/JS if specified)
- Modern CSS frameworks (Tailwind preferred)
- Responsive design principles
- Clean, accessible code structure

Requirements Gathering:
1. **Application Purpose**: What is the main function/goal?
2. **Target Users**: Who will use this application?
3. **Key Features**: What specific functionality is needed?
4. **Design Preferences**: Modern, minimal, colorful, professional, etc.
5. **Data Requirements**: What information needs to be displayed/collected?

Please provide:
1. Complete, functional code
2. Responsive design that works on all devices
3. Modern UI/UX with smooth interactions
4. Proper component structure and organization
5. Comments explaining key functionality
6. Basic state management if needed
7. Form validation where applicable

Application Requirements:
[DESCRIBE YOUR APP REQUIREMENTS HERE]

Deliver a production-ready application with clean, maintainable code and modern design principles.`,
    category: "Web Development",
    subcategory: "Frontend Development",
    author: "Alex Thompson",
    role: "Senior Frontend Developer",
    tags: ["React", "Web Development", "SPA", "Frontend", "JavaScript"],
    difficulty: "Advanced",
    estimatedTime: "20-30 minutes",
    useCount: 3421,
    rating: 4.7,
    dateAdded: "2024-06-12",
    isFavorited: false,
    resultExample: "Generates complete, functional web applications ready for deployment with modern design and full interactivity.",
    aiModel: "GPT-4",
    copyCount: 765
  },
  {
    id: 4,
    title: "Mental Health Counseling Session Planner",
    description: "Design comprehensive, evidence-based counseling session plans and therapeutic interventions",
    prompt: `You are a licensed clinical psychologist with 20+ years of experience in evidence-based therapy. Design a comprehensive counseling session plan tailored to specific client needs and therapeutic goals.

Session Planning Framework:
1. **Client Demographics & Presentation**
2. **Primary Concerns/Goals**
3. **Therapeutic Approach** (CBT, DBT, Humanistic, etc.)
4. **Session Structure** (50-minute format)
5. **Specific Interventions**
6. **Homework/Between-Session Activities**
7. **Progress Tracking Methods**

Please provide:
✓ Detailed session outline with time allocations
✓ Specific therapeutic techniques and interventions
✓ Relevant worksheets or exercises
✓ Safety considerations and risk assessment
✓ Progress measurement tools
✓ Follow-up recommendations
✓ Cultural sensitivity considerations

Client Information:
[PROVIDE CLIENT DETAILS, CONCERNS, AND GOALS]

Create a professional, ethical, evidence-based session plan that promotes therapeutic progress while ensuring client safety and wellbeing.

*Note: This is for educational/planning purposes. Always follow professional licensing requirements and supervision guidelines.*`,
    category: "Mental Health",
    subcategory: "Counseling",
    author: "Dr. Jennifer Walsh",
    role: "Clinical Psychologist",
    tags: ["Mental Health", "Counseling", "Therapy", "Session Planning", "Psychology"],
    difficulty: "Expert",
    estimatedTime: "15-25 minutes",
    useCount: 1876,
    rating: 4.9,
    dateAdded: "2024-06-10",
    isFavorited: true,
    resultExample: "Creates structured, evidence-based counseling session plans that enhance therapeutic outcomes and client progress.",
    aiModel: "GPT-4",
    copyCount: 423
  },
  {
    id: 5,
    title: "Clinical Education Session Designer",
    description: "Develop engaging, interactive educational sessions for healthcare professionals with learning objectives and assessments",
    prompt: `You are an expert medical educator and curriculum designer with extensive experience in adult learning principles and healthcare education. Design a comprehensive clinical education session for healthcare professionals.

Session Design Framework:
1. **Learning Objectives** (SMART goals)
2. **Target Audience** (nurses, doctors, residents, etc.)
3. **Duration & Format** (lecture, hands-on, hybrid)
4. **Content Structure** with timing
5. **Interactive Elements** (case studies, simulations, Q&A)
6. **Assessment Methods**
7. **Resources & Materials**
8. **Evaluation & Feedback**

Please create:
📚 Detailed session plan with learning objectives
🎯 Engaging content delivery methods
💡 Interactive exercises and case studies
📋 Assessment tools and rubrics
📖 Resource lists and references
🔄 Continuous improvement strategies
👥 Differentiated learning approaches

Topic/Subject Area:
[SPECIFY THE CLINICAL TOPIC OR SKILL TO BE TAUGHT]

Target Audience:
[DESCRIBE THE HEALTHCARE PROFESSIONALS WHO WILL ATTEND]

Session Duration:
[SPECIFY TIME AVAILABLE - 30 min, 1 hour, half-day, etc.]

Deliver a comprehensive educational session that promotes active learning, knowledge retention, and practical skill application in clinical practice.`,
    category: "Healthcare Education",
    subcategory: "Professional Development",
    author: "Prof. Michael Chen",
    role: "Medical Education Director",
    tags: ["Medical Education", "Training", "Healthcare", "Professional Development", "Clinical Skills"],
    difficulty: "Advanced",
    estimatedTime: "20-30 minutes",
    useCount: 2134,
    rating: 4.8,
    dateAdded: "2024-06-14",
    isFavorited: false,
    resultExample: "Creates comprehensive educational sessions that improve clinical competency and professional development outcomes.",
    aiModel: "GPT-4",
    copyCount: 567
  },
  {
    id: 6,
    title: "Team Building Activity Creator",
    description: "Design innovative, engaging team building activities that strengthen workplace relationships and improve collaboration",
    prompt: `You are an expert organizational psychologist and team development specialist with 15+ years of experience designing effective team building programs. Create innovative, engaging team building activities that strengthen relationships and improve collaboration.

Team Building Framework:
1. **Team Assessment** (size, dynamics, challenges)
2. **Objectives** (communication, trust, problem-solving, etc.)
3. **Activity Design** (format, duration, materials)
4. **Facilitation Guidelines**
5. **Debrief & Reflection**
6. **Follow-up Actions**
7. **Success Metrics**

Activity Categories:
🤝 Trust Building Exercises
💬 Communication Workshops
🧩 Problem-Solving Challenges
🎯 Goal-Setting Sessions
🎭 Creative Collaboration
🏃‍♂️ Physical/Outdoor Activities
💻 Virtual Team Building
🎲 Gamification Elements

Please provide:
• Detailed activity instructions
• Required materials and setup
• Facilitation tips and techniques
• Timing and group size recommendations
• Adaptation options for different contexts
• Assessment/feedback methods
• Follow-up activities to reinforce learning

Team Information:
[DESCRIBE YOUR TEAM: size, work environment, specific challenges, goals]

Available Time:
[SPECIFY: 30 minutes, 1 hour, half-day, full day, etc.]

Environment:
[IN-PERSON, VIRTUAL, or HYBRID]

Create activities that are inclusive, engaging, and directly applicable to improving workplace dynamics and team performance.`,
    category: "Team Development",
    subcategory: "Workplace Activities",
    author: "Sarah Martinez",
    role: "Organizational Development Consultant",
    tags: ["Team Building", "Leadership", "Workplace", "Collaboration", "Communication"],
    difficulty: "Intermediate",
    estimatedTime: "15-20 minutes",
    useCount: 4521,
    rating: 4.6,
    dateAdded: "2024-06-16",
    isFavorited: true,
    resultExample: "Designs creative team building activities that measurably improve team cohesion and workplace collaboration.",
    aiModel: "GPT-4",
    copyCount: 987
  },
  {
    id: 7,
    title: "Innovative Cafe Menu Creator",
    description: "Design creative, profitable cafe menus with unique items, pricing strategies, and dietary accommodations",
    prompt: `You are a renowned culinary consultant and restaurant strategist with expertise in menu development, food trends, and business profitability. Create an innovative, market-ready cafe menu that balances creativity, profitability, and customer appeal.

Menu Development Framework:
1. **Concept & Theme** (aesthetic, target market, unique selling proposition)
2. **Menu Categories** (beverages, food, seasonal specials)
3. **Recipe Development** (ingredients, preparation, presentation)
4. **Pricing Strategy** (cost analysis, profit margins, competitive positioning)
5. **Dietary Accommodations** (vegan, gluten-free, keto, allergies)
6. **Seasonal Variations** & Limited-time offers
7. **Marketing Integration** (Instagram-worthy items, signature drinks)

Please create:
☕ Signature beverage menu (coffee, tea, specialty drinks)
🥗 Food menu (breakfast, lunch, snacks, desserts)
💰 Strategic pricing with profit margin considerations
🌱 Dietary accommodation options
📸 Presentation and plating suggestions
📈 Marketing and promotional strategies
🔄 Seasonal menu rotation ideas

Cafe Information:
[DESCRIBE: Location, target demographic, size, budget, theme/concept]

Special Requirements:
[Any specific dietary needs, local ingredients, budget constraints, etc.]

Deliver a comprehensive menu that drives profitability while creating memorable customer experiences and social media buzz.`,
    category: "Food & Beverage",
    subcategory: "Menu Development",
    author: "Chef Isabella Rodriguez",
    role: "Culinary Consultant",
    tags: ["Menu Design", "Food Service", "Restaurant", "Culinary", "Business Strategy"],
    difficulty: "Intermediate",
    estimatedTime: "25-35 minutes",
    useCount: 3876,
    rating: 4.7,
    dateAdded: "2024-06-17",
    isFavorited: false,
    resultExample: "Creates comprehensive cafe menus that balance profitability, customer appeal, and operational efficiency.",
    aiModel: "GPT-4",
    copyCount: 678
  }
];

// Mock data for categories
const categories = [
  { name: "All Prompts", count: 847, icon: Sparkles },
  { name: "Medical Writing", count: 156, icon: FileText },
  { name: "Creative Arts", count: 203, icon: Palette },
  { name: "Web Development", count: 134, icon: Code },
  { name: "Mental Health", count: 89, icon: Brain },
  { name: "Healthcare Education", count: 97, icon: BookOpen },
  { name: "Team Development", count: 76, icon: Users },
  { name: "Food & Beverage", count: 92, icon: Coffee }
];

const popularTags = [
  "Medical Reports", "Digital Art", "React", "Mental Health", "Team Building",
  "Menu Design", "Clinical Education", "Professional Development", "Creative",
  "Documentation", "Frontend", "Psychology", "Leadership", "Food Service"
];

export default function AIPrompts() {
  const [activeCategory, setActiveCategory] = useState("All Prompts");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPrompt, setShowNewPrompt] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [promptsList, setPromptsList] = useState(aiPrompts);
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    description: "",
    prompt: "",
    category: "",
    tags: "",
    difficulty: "Beginner",
    estimatedTime: "",
    aiModel: "GPT-4"
  });

  const handleCopy = async (prompt: string, id: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleFavorite = (id: number) => {
    setPromptsList(prev => 
      prev.map(prompt => 
        prompt.id === id 
          ? { ...prompt, isFavorited: !prompt.isFavorited }
          : prompt
      )
    );
  };

  const filteredPrompts = promptsList.filter(prompt => {
    const matchesCategory = activeCategory === "All Prompts" || prompt.category === activeCategory;
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPrompt(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAIPrompt = {
      id: promptsList.length + 1,
      title: newPrompt.title,
      description: newPrompt.description,
      prompt: newPrompt.prompt,
      category: newPrompt.category,
      subcategory: "User Generated",
      author: "You",
      role: "Community Member",
      tags: newPrompt.tags.split(',').map(tag => tag.trim()),
      difficulty: newPrompt.difficulty,
      estimatedTime: newPrompt.estimatedTime,
      useCount: 0,
      rating: 0,
      dateAdded: new Date().toISOString().split('T')[0],
      isFavorited: false,
      resultExample: "User-generated prompt for community use.",
      aiModel: newPrompt.aiModel,
      copyCount: 0
    };
    
    setPromptsList([newAIPrompt, ...promptsList]);
    setNewPrompt({
      title: "",
      description: "",
      prompt: "",
      category: "",
      tags: "",
      difficulty: "Beginner",
      estimatedTime: "",
      aiModel: "GPT-4"
    });
    setShowNewPrompt(false);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-indigo-100/50">
      {/* Hero Section */}
      <div className="border-b border-blue-200 bg-gradient-to-r from-blue-400/10 to-indigo-400/10">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 mb-6">
              <Bot className="h-5 w-5 mr-2" />
              <span className="font-medium">AI-Powered Productivity</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              AI Prompts Library
            </h1>
            <p className="text-xl text-blue-900/80 mb-8 max-w-2xl mx-auto">
              Discover sophisticated AI prompts for professional tasks, creative projects, and workflow optimization. Curated by experts, tested by professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowNewPrompt(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 text-lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Share Your Prompt
              </Button>
              <Button 
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 px-6 py-6 text-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Browse Collection
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Search */}
            <Card className="border-blue-100 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Prompts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search prompts, categories, tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border-blue-200 focus:border-blue-400"
                />
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border-blue-100 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.name}
                      variant={activeCategory === category.name ? "default" : "ghost"}
                      className={`w-full justify-between ${
                        activeCategory === category.name 
                          ? "bg-blue-600 text-white" 
                          : "text-blue-700 hover:bg-blue-100"
                      }`}
                      onClick={() => setActiveCategory(category.name)}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {category.name}
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {category.count}
                      </Badge>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="border-blue-100 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-blue-900">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="cursor-pointer bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                      onClick={() => setSearchTerm(tag)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header Stats */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-blue-900">
                  {activeCategory}
                </h2>
                <p className="text-blue-700/70">
                  {filteredPrompts.length} prompts available
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-blue-700/70">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{promptsList.reduce((acc, p) => acc + p.useCount, 0).toLocaleString()} total uses</span>
                </div>
              </div>
            </div>

            {/* New Prompt Form */}
            {showNewPrompt && (
              <Card className="mb-8 border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle>Share Your AI Prompt</CardTitle>
                  <CardDescription>
                    Help the community by sharing your tested and effective AI prompts.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium text-blue-900/80">
                          Prompt Title
                        </label>
                        <Input
                          id="title"
                          name="title"
                          value={newPrompt.title}
                          onChange={handleInputChange}
                          placeholder="e.g., Professional Email Writer"
                          className="bg-white border-blue-200 focus:border-blue-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium text-blue-900/80">
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={newPrompt.category}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-blue-200 rounded-md bg-white focus:border-blue-400 focus:outline-none"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.slice(1).map(cat => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium text-blue-900/80">
                        Description
                      </label>
                      <Input
                        id="description"
                        name="description"
                        value={newPrompt.description}
                        onChange={handleInputChange}
                        placeholder="Brief description of what this prompt does..."
                        className="bg-white border-blue-200 focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="prompt" className="text-sm font-medium text-blue-900/80">
                        AI Prompt
                      </label>
                      <Textarea
                        id="prompt"
                        name="prompt"
                        value={newPrompt.prompt}
                        onChange={handleInputChange}
                        placeholder="Enter your detailed AI prompt here..."
                        className="min-h-[200px] bg-white border-blue-200 focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="difficulty" className="text-sm font-medium text-blue-900/80">
                          Difficulty
                        </label>
                        <select
                          id="difficulty"
                          name="difficulty"
                          value={newPrompt.difficulty}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-blue-200 rounded-md bg-white focus:border-blue-400 focus:outline-none"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="estimatedTime" className="text-sm font-medium text-blue-900/80">
                          Estimated Time
                        </label>
                        <Input
                          id="estimatedTime"
                          name="estimatedTime"
                          value={newPrompt.estimatedTime}
                          onChange={handleInputChange}
                          placeholder="e.g., 5-10 minutes"
                          className="bg-white border-blue-200 focus:border-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="aiModel" className="text-sm font-medium text-blue-900/80">
                          Recommended AI Model
                        </label>
                        <select
                          id="aiModel"
                          name="aiModel"
                          value={newPrompt.aiModel}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-blue-200 rounded-md bg-white focus:border-blue-400 focus:outline-none"
                        >
                          <option value="GPT-4">GPT-4</option>
                          <option value="GPT-3.5">GPT-3.5</option>
                          <option value="Claude">Claude</option>
                          <option value="Gemini">Gemini</option>
                          <option value="Any">Any Model</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="tags" className="text-sm font-medium text-blue-900/80">
                        Tags (comma separated)
                      </label>
                      <Input
                        id="tags"
                        name="tags"
                        value={newPrompt.tags}
                        onChange={handleInputChange}
                        placeholder="e.g., writing, professional, communication"
                        className="bg-white border-blue-200 focus:border-blue-400"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowNewPrompt(false)}
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Share Prompt
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}

            {/* Prompts List */}
            <div className="space-y-6">
              {filteredPrompts.map((prompt) => (
                <Card key={prompt.id} className="border-blue-100 bg-white/70 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant="outline" 
                            className={`${
                              prompt.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                              prompt.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              prompt.difficulty === 'Advanced' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                              'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            {prompt.difficulty}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {prompt.aiModel}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            {prompt.estimatedTime}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-blue-900 mb-2 hover:text-blue-700 cursor-pointer">
                          {prompt.title}
                        </CardTitle>
                        <CardDescription className="text-blue-800/80 mb-3">
                          {prompt.description}
                        </CardDescription>
                        <div className="flex items-center gap-2 text-sm text-blue-700/70 mb-3">
                          <span className="font-medium">{prompt.author}</span>
                          <span>•</span>
                          <span>{prompt.role}</span>
                          <span>•</span>
                          <span>{prompt.dateAdded}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {prompt.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 cursor-pointer">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-8 w-8 rounded-full ${prompt.isFavorited ? 'text-blue-600' : 'text-blue-400'}`}
                          onClick={() => handleFavorite(prompt.id)}
                        >
                          <Star className={`h-4 w-4 ${prompt.isFavorited ? 'fill-current' : ''}`} />
                        </Button>
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{prompt.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                          <Bot className="h-4 w-4" />
                          AI Prompt
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(prompt.prompt, prompt.id)}
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          {copiedId === prompt.id ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="bg-white border rounded p-3 text-sm text-gray-700 max-h-40 overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-mono text-xs">
                          {prompt.prompt.length > 500 
                            ? `${prompt.prompt.substring(0, 500)}...` 
                            : prompt.prompt}
                        </pre>
                      </div>
                      {prompt.prompt.length > 500 && (
                        <Button 
                          variant="link" 
                          className="text-blue-600 p-0 h-auto mt-2 text-sm"
                        >
                          View full prompt
                        </Button>
                      )}
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Expected Results
                      </h4>
                      <p className="text-blue-800/80 text-sm">
                        {prompt.resultExample}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-0">
                    <div className="flex items-center gap-4 text-sm text-blue-700/80">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{prompt.useCount.toLocaleString()} uses</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Copy className="h-4 w-4" />
                        <span>{prompt.copyCount} copies</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Bot className="h-4 w-4 mr-1" />
                        Try Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <ArrowRight className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredPrompts.length === 0 && (
              <div className="text-center py-12">
                <Bot className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-900 mb-2">No prompts found</h3>
                <p className="text-blue-700/70 mb-6">
                  Try adjusting your search terms or browse different categories.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("All Prompts");
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Featured Section */}
        <div className="mt-16 border-t border-blue-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Featured Prompt Collections</h2>
            <p className="text-blue-700/70 max-w-2xl mx-auto">
              Curated collections of prompts for specific use cases and industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-blue-900">Healthcare Essentials</CardTitle>
                </div>
                <CardDescription>
                  Complete collection of medical writing, patient communication, and clinical education prompts.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-blue-100 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-purple-900">Creative Studio</CardTitle>
                </div>
                <CardDescription>
                  Professional-grade prompts for digital art, content creation, and visual design projects.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-blue-100 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-green-900">Developer Toolkit</CardTitle>
                </div>
                <CardDescription>
                  Advanced prompts for code generation, debugging, documentation, and technical writing.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
              💡 Tips for Using AI Prompts Effectively
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Customize for Your Context</h3>
                    <p className="text-blue-800/80 text-sm">
                      Replace placeholder text with your specific requirements, industry, or use case for better results.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Iterate and Refine</h3>
                    <p className="text-blue-800/80 text-sm">
                      Start with the base prompt and refine based on the AI's output. Small adjustments can lead to big improvements.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Test with Different Models</h3>
                    <p className="text-blue-800/80 text-sm">
                      Different AI models may produce varying results. Try the same prompt with multiple models to find the best fit.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Share Your Success</h3>
                    <p className="text-blue-800/80 text-sm">
                      When you create an effective variation, consider sharing it with the community to help others.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}