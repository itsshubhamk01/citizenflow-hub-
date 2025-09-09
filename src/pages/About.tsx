import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Users, 
  Globe, 
  Zap,
  CheckCircle,
  ArrowRight,
  Target,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Government-grade security with encrypted data protection and secure authentication."
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Automated workflows reduce application processing time by up to 40%."
  },
  {
    icon: Globe,
    title: "Accessible Anywhere",
    description: "Access schemes and services 24/7 from any device with internet connectivity."
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Tailored interfaces for Citizens, Officers, and Administrators for optimal experience."
  }
];

const objectives = [
  "Digitize government scheme applications and processes",
  "Reduce manual paperwork and processing time",
  "Improve transparency in application status tracking", 
  "Provide equal access to government services for all citizens",
  "Enable efficient workflow management for government officers",
  "Generate analytics for better policy making and resource allocation"
];

const benefits = [
  {
    title: "For Citizens",
    points: [
      "Apply for schemes from home",
      "Track application status in real-time", 
      "Receive instant notifications",
      "Access scheme information 24/7"
    ]
  },
  {
    title: "For Officers",
    points: [
      "Streamlined review process",
      "Digital document verification",
      "Automated workflow management",
      "Performance analytics and reporting"
    ]
  },
  {
    title: "For Administrators",
    points: [
      "Comprehensive scheme management",
      "Real-time analytics and insights",
      "Resource allocation optimization", 
      "Policy impact measurement"
    ]
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Government Scheme Portal
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Empowering citizens through digital governance and seamless access 
            to government schemes and services across India.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To create a unified digital platform that enables every citizen to easily 
                  access government schemes, apply for benefits, and track their applications 
                  transparently, while empowering government officials with efficient tools 
                  for service delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To build a Digital India where government services are accessible, 
                  transparent, and efficient. We envision a future where technology 
                  bridges the gap between citizens and governance, ensuring no one 
                  is left behind in the digital transformation journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Objectives
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key goals driving our platform development and service delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {objectives.map((objective, index) => (
              <div key={index} className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-card">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-success mt-1" />
                </div>
                <p className="text-foreground">{objective}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make government services more accessible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Benefits for Everyone
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How our platform serves different stakeholders in the ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    <Badge variant="outline" className="text-base px-4 py-2">
                      {benefit.title}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefit.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Be Part of Digital India
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join millions of citizens who have already embraced digital governance. 
            Start your journey with government schemes today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/schemes">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Schemes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}