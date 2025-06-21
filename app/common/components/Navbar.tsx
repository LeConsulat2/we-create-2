import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, User } from "lucide-react";
import { Button } from "../../ui/button";

// Simple cn utility for class name merging
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Weekly AI', path: '/weekly-ai' },
    { name: 'Community', path: '/community' },
    { name: 'Portfolios', path: '/portfolios' },
    { name: 'Reflections', path: '/reflections' },
    { name: 'AI Prompts', path: '/ai-prompts' },
    // { name: 'AI Prompts 2', path: '/ai-prompts-2' },
    { name: 'AI Tools', path: '/ai-tools' },
    { name: 'Suggestions', path: '/suggestions' },
    { name: 'AI News Archive', path: '/ai-news-archive' },
    //{ name: 'Reflections', path: '/reflections' },   
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md border-b" : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            We-Create
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "text-foreground bg-accent"
                  : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden
          ">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground focus:outline-none"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === item.path
                    ? "bg-accent text-foreground"
                    : "text-foreground/70 hover:bg-accent/50 hover:text-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-border mt-2 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <User className="mr-2 h-4 w-4" />
                  Sign in
                </Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
