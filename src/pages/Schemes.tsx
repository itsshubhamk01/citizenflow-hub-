import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Users, 
  Calendar,
  FileText,
  Heart,
  GraduationCap,
  Home,
  Briefcase
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const mockSchemes = [
  {
    id: "1",
    name: "PM Kisan Samman Nidhi",
    description: "Direct income support of ₹6,000 per year to small and marginal farmers",
    category: "Agriculture",
    eligibility: "Farmers with landholding up to 2 hectares",
    benefits: "₹2,000 per instalment, 3 times a year",
    applicants: 1245,
    status: "Active",
    deadline: "2024-12-31",
    icon: Users,
  },
  {
    id: "2", 
    name: "Ayushman Bharat",
    description: "Health insurance coverage up to ₹5 lakhs per family per year",
    category: "Healthcare",
    eligibility: "Families listed in SECC 2011 database",
    benefits: "Cashless treatment at empaneled hospitals",
    applicants: 892,
    status: "Active", 
    deadline: "2024-11-30",
    icon: Heart,
  },
  {
    id: "3",
    name: "Digital India Initiative", 
    description: "Digital literacy and infrastructure development program",
    category: "Education",
    eligibility: "All citizens for digital services",
    benefits: "Free digital literacy training, online services",
    applicants: 567,
    status: "Active",
    deadline: "2024-10-15",
    icon: GraduationCap,
  },
  {
    id: "4",
    name: "Pradhan Mantri Awas Yojana",
    description: "Affordable housing for economically weaker sections",
    category: "Housing",
    eligibility: "EWS/LIG families without pucca house",
    benefits: "Interest subsidy and direct assistance up to ₹2.67 lakh",
    applicants: 743,
    status: "Active",
    deadline: "2024-12-15",
    icon: Home,
  },
  {
    id: "5",
    name: "Mudra Yojana",
    description: "Micro-financing for small business enterprises",
    category: "Business",
    eligibility: "Non-corporate, non-farm small/micro enterprises",
    benefits: "Loans up to ₹10 lakh without collateral",
    applicants: 423,
    status: "Active",
    deadline: "2024-11-20",
    icon: Briefcase,
  },
];

const categories = ["All", "Agriculture", "Healthcare", "Education", "Housing", "Business"];

export default function Schemes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useAuth();
  const { toast } = useToast();

  const filteredSchemes = mockSchemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApply = (schemeName: string) => {
    if (user?.role !== "Citizen") {
      toast({
        title: "Access Denied",
        description: "Only citizens can apply for schemes",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Application Started",
      description: `Your application for ${schemeName} has been initiated`,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Agriculture": return Users;
      case "Healthcare": return Heart;
      case "Education": return GraduationCap;
      case "Housing": return Home;
      case "Business": return Briefcase;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Government Schemes</h1>
        <p className="text-muted-foreground">
          Browse and apply for government schemes and benefits
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              <Filter className="h-4 w-4 mr-1" />
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSchemes.map((scheme) => {
          const IconComponent = getCategoryIcon(scheme.category);
          
          return (
            <Card key={scheme.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline">{scheme.category}</Badge>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="bg-success/10 text-success border-success/20"
                  >
                    {scheme.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{scheme.name}</CardTitle>
                <CardDescription className="text-sm">
                  {scheme.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Eligibility: </span>
                    <span className="text-muted-foreground">{scheme.eligibility}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Benefits: </span>
                    <span className="text-muted-foreground">{scheme.benefits}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{scheme.applicants} applications</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Till {scheme.deadline}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Details
                </Button>
                <Button 
                  size="sm"
                  className="flex-1 bg-gradient-primary hover:bg-primary-hover"
                  onClick={() => handleApply(scheme.name)}
                  disabled={user?.role !== "Citizen"}
                >
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No schemes found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}