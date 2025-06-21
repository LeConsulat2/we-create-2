import { useState } from "react";
import { Search, Filter, Heart, MessageCircle, Share2, BookOpen, Award, Calendar, MapPin, ExternalLink, Play, Eye } from "lucide-react";

// Mock data for professional portfolios
const mockPortfolios = [
  {
    id: 1,
    type: 'design',
    title: 'Brand Identity for Eco-Startup',
    description: 'Complete brand identity system including logo, color palette, typography, and brand guidelines for a sustainable technology startup.',
    author: {
      name: 'Sarah Chen',
      title: 'Brand Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c74c?w=150&h=150&fit=crop&crop=face',
      location: 'San Francisco, CA',
      verified: true
    },
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop', alt: 'Brand identity mockup' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop', alt: 'Logo variations' }
    ],
    tags: ['Brand Identity', 'Logo Design', 'Sustainability', 'Startup'],
    metrics: { likes: 324, comments: 48, views: 2847 },
    date: '2024-06-15',
    category: 'Creative',
    skills: ['Adobe Creative Suite', 'Figma', 'Brand Strategy'],
    collaboration: 'Solo project with client feedback sessions',
    duration: '6 weeks'
  },
  {
    id: 2,
    type: 'therapy',
    title: 'Anxiety Management Group Therapy Session',
    description: 'Facilitated 8-week group therapy program focusing on CBT techniques for anxiety management. Implemented mindfulness practices and peer support strategies.',
    author: {
      name: 'Dr. Michael Rodriguez',
      title: 'Licensed Clinical Psychologist',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      location: 'Austin, TX',
      verified: true
    },
    media: [
      { type: 'document', title: 'Session Plan Overview', description: 'Structured approach to group dynamics and therapeutic interventions' },
      { type: 'chart', title: 'Patient Progress Metrics', description: 'Anonymized anxiety reduction scores over 8 weeks' }
    ],
    tags: ['CBT', 'Group Therapy', 'Anxiety', 'Mindfulness'],
    metrics: { likes: 187, comments: 29, views: 1456 },
    date: '2024-06-12',
    category: 'Healthcare',
    skills: ['CBT', 'Group Facilitation', 'Assessment', 'Treatment Planning'],
    collaboration: 'Co-facilitated with licensed social worker',
    duration: '8 weeks',
    outcomes: 'Average 40% reduction in GAD-7 scores across participants'
  },
  {
    id: 3,
    type: 'development',
    title: 'AI-Powered Fitness Tracking App',
    description: 'Full-stack mobile application with machine learning integration for personalized workout recommendations and progress tracking.',
    author: {
      name: 'Alex Kim',
      title: 'Full-Stack Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Seattle, WA',
      verified: true
    },
    media: [
      { type: 'video', url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop', alt: 'App demo video', duration: '2:34' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop', alt: 'App interface mockup' }
    ],
    tags: ['React Native', 'Machine Learning', 'Fitness', 'Mobile Development'],
    metrics: { likes: 412, comments: 73, views: 3521 },
    date: '2024-06-10',
    category: 'Technology',
    skills: ['React Native', 'Python', 'TensorFlow', 'Node.js', 'MongoDB'],
    collaboration: 'Team of 4 developers, 2 designers',
    duration: '12 weeks',
    outcomes: '4.8/5 App Store rating, 10k+ downloads in first month'
  },
  {
    id: 4,
    type: 'physiotherapy',
    title: 'Post-Surgical Knee Rehabilitation Program',
    description: 'Comprehensive rehabilitation program for ACL reconstruction recovery, incorporating progressive strengthening and functional movement patterns.',
    author: {
      name: 'Dr. Emma Thompson',
      title: 'Sports Physiotherapist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      location: 'Melbourne, AU',
      verified: true
    },
    media: [
      { type: 'document', title: 'Treatment Protocol', description: 'Phase-based rehabilitation approach with measurable outcomes' },
      { type: 'video', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', alt: 'Exercise demonstration', duration: '3:12' }
    ],
    tags: ['ACL Rehabilitation', 'Sports Medicine', 'Functional Movement', 'Recovery'],
    metrics: { likes: 256, comments: 34, views: 1876 },
    date: '2024-06-08',
    category: 'Healthcare',
    skills: ['Manual Therapy', 'Exercise Prescription', 'Biomechanical Analysis', 'Patient Education'],
    collaboration: 'Worked with orthopedic surgeon and sports medicine team',
    duration: '16 weeks',
    outcomes: 'Patient returned to competitive sports with 95% functional capacity'
  }
];

const categories = [
  { id: 'all', name: 'All Portfolios', icon: '🎯' },
  { id: 'creative', name: 'Creative', icon: '🎨' },
  { id: 'healthcare', name: 'Healthcare', icon: '⚕️' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'sports', name: 'Sports & Fitness', icon: '🏃' }
];

const professionTypes = [
  { id: 'design', name: 'Design', color: 'bg-purple-100 text-purple-800' },
  { id: 'therapy', name: 'Therapy', color: 'bg-green-100 text-green-800' },
  { id: 'development', name: 'Development', color: 'bg-blue-100 text-blue-800' },
  { id: 'physiotherapy', name: 'Physiotherapy', color: 'bg-orange-100 text-orange-800' },
  { id: 'medicine', name: 'Medicine', color: 'bg-red-100 text-red-800' },
  { id: 'education', name: 'Education', color: 'bg-yellow-100 text-yellow-800' }
];

// This would be app/portfolios/page.tsx - Public user interface
export default function PortfoliosPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [portfolios, setPortfolios] = useState(mockPortfolios);
  const [likedPortfolios, setLikedPortfolios] = useState(new Set());

  const filteredPortfolios = portfolios.filter(portfolio => {
    const matchesCategory = activeCategory === 'all' || portfolio.category.toLowerCase() === activeCategory;
    const matchesSearch = portfolio.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         portfolio.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         portfolio.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         portfolio.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (id) => {
    const newLikedPortfolios = new Set(likedPortfolios);
    if (newLikedPortfolios.has(id)) {
      newLikedPortfolios.delete(id);
    } else {
      newLikedPortfolios.add(id);
    }
    setLikedPortfolios(newLikedPortfolios);
    
    setPortfolios(portfolios.map(portfolio => 
      portfolio.id === id 
        ? { ...portfolio, metrics: { ...portfolio.metrics, likes: portfolio.metrics.likes + (likedPortfolios.has(id) ? -1 : 1) }}
        : portfolio
    ));
  };

  const getProfessionTypeColor = (type) => {
    const profession = professionTypes.find(p => p.id === type);
    return profession ? profession.color : 'bg-gray-100 text-gray-800';
  };

  const renderMedia = (media, portfolioId) => {
    return media.map((item, index) => (
      <div key={index} className="relative group">
        {item.type === 'image' && (
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={item.url} 
              alt={item.alt}
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        )}
        {item.type === 'video' && (
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={item.url} 
              alt={item.alt}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 rounded-full p-3">
                <Play className="w-8 h-8 text-gray-800" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
              {item.duration}
            </div>
          </div>
        )}
        {item.type === 'document' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        )}
        {item.type === 'chart' && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 text-white">
              Professional Portfolios
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Discover exceptional work from professionals across all industries. Share your projects, connect with peers, and inspire others.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search portfolios, professionals, or skills..."
                className="pl-10 w-full h-12 text-base bg-white/95 backdrop-blur-sm rounded-xl border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                      activeCategory === category.id 
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      {category.name}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category.id === 'all' 
                        ? portfolios.length 
                        : portfolios.filter(p => p.category.toLowerCase() === category.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Profession Types</h3>
              <div className="flex flex-wrap gap-2">
                {professionTypes.map(type => (
                  <span key={type.id} className={`px-3 py-1 rounded-full text-sm ${type.color}`}>
                    {type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolios List */}
          <div className="lg:w-3/4 space-y-8">
            {filteredPortfolios.map(portfolio => (
              <div key={portfolio.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={portfolio.author.avatar} 
                        alt={portfolio.author.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{portfolio.author.name}</h3>
                          {portfolio.author.verified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{portfolio.author.title}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {portfolio.author.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {portfolio.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getProfessionTypeColor(portfolio.type)}`}>
                      {professionTypes.find(p => p.id === portfolio.type)?.name || portfolio.type}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3">{portfolio.title}</h2>
                  <p className="text-gray-700 mb-4">{portfolio.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolio.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Media */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderMedia(portfolio.media, portfolio.id)}
                  </div>
                </div>

                {/* Project Details */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Duration</h4>
                      <p className="text-gray-600 text-sm">{portfolio.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Collaboration</h4>
                      <p className="text-gray-600 text-sm">{portfolio.collaboration}</p>
                    </div>
                    {portfolio.outcomes && (
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm mb-2">Key Outcomes</h4>
                        <p className="text-gray-600 text-sm">{portfolio.outcomes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div className="px-6 pb-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-3">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm border border-indigo-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => toggleLike(portfolio.id)}
                        className={`flex items-center gap-2 text-sm transition-colors ${
                          likedPortfolios.has(portfolio.id) 
                            ? 'text-red-600' 
                            : 'text-gray-600 hover:text-red-600'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedPortfolios.has(portfolio.id) ? 'fill-current' : ''}`} />
                        <span>{portfolio.metrics.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{portfolio.metrics.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>{portfolio.metrics.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}