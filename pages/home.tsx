import { ArrowRight } from "lucide-react";
import { Button } from "../app/ui/button";
import { Input } from "../app/ui/input";
import { Textarea } from "../app/ui/textarea";
import { Switch } from "../app/ui/switch";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "We-Create | Home" },
    { name: "description", content: "Welcome to We-Create - Create, Share, and Grow Together" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Create, Share, and Grow Together
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join our community of creators, share your work, and get inspired by others.
                Everything you need to bring your ideas to life.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/community">
                  Join Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What We Offer
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover the tools and community to help you create your best work.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {[
              {
                title: "Weekly AI Insights",
                description: "Stay updated with the latest AI trends and tools.",
                link: "/weekly-ai"
              },
              {
                title: "Community Showcase",
                description: "Share and discover amazing projects from our community.",
                link: "/community"
              },
              {
                title: "Portfolio Gallery",
                description: "Showcase your work and get inspired by others.",
                link: "/portfolios"
              },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
                <Link to={feature.link} className="text-primary inline-flex items-center mt-2 hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to get started?
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Join our community today and start sharing your creations with the world.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" className="px-8">
                Sign Up Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
