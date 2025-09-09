import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  FileText, 
  CheckCircle,
  ArrowRight,
  Heart,
  GraduationCap,
  Home as HomeIcon,
  Briefcase
} from "lucide-react";
import heroImage from "@/assets/hero-government.jpg";

const featuredSchemes = [
  {
    id: "1",
    name: "PM Kisan Samman Nidhi",
    description: "Direct income support for farmers",
    category: "Agriculture",
    icon: Users,
  },
  {
    id: "2", 
    name: "Ayushman Bharat",
    description: "Health insurance coverage",
    category: "Healthcare", 
    icon: Heart,
  },
  {
    id: "3",
    name: "Digital India Initiative",
    description: "Digital literacy program",
    category: "Education",
    icon: GraduationCap,
  },
  {
    id: "4",
    name: "PM Awas Yojana",
    description: "Affordable housing scheme",
    category: "Housing",
    icon: HomeIcon,
  },
];

const stats = [
  { label: "Active Schemes", value: "25+", icon: FileText },
  { label: "Citizens Benefited", value: "2.5M+", icon: Users },
  { label: "Applications Processed", value: "1.8M+", icon: CheckCircle },
  { label: "Success Rate", value: "87%", icon: Shield },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero text-white overflow-hidden">
        <img 
          src={heroImage} 
          alt="Government Building"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Government Scheme Portal
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Empowering citizens through digital governance. Access government schemes, 
              apply online, and track your applications seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elegant">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/schemes">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse Schemes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Featured Government Schemes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover popular government schemes designed to improve lives and 
              provide opportunities for citizens across various sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredSchemes.map((scheme) => (
              <Card key={scheme.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <scheme.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline">{scheme.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{scheme.name}</CardTitle>
                  <CardDescription>{scheme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/schemes/${scheme.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/schemes">
              <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover">
                View All Schemes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to access government schemes and benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Register Account</h3>
              <p className="text-muted-foreground">
                Create your citizen account with basic details and verify your identity
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Browse & Apply</h3>
              <p className="text-muted-foreground">
                Explore available schemes, check eligibility, and submit applications online
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor application status and receive notifications on approval
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of citizens accessing government schemes digitally
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Register Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}