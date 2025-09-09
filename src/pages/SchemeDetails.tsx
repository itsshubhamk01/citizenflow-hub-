import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Users, 
  Calendar,
  FileText,
  CheckCircle,
  IndianRupee,
  Clock,
  MapPin
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Mock scheme data - in real app, this would come from API
const mockScheme = {
  id: "1",
  name: "PM Kisan Samman Nidhi",
  description: "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India. It has become operational from 1.12.2018. Under this scheme, vulnerable landholding farmer families, having combined land holding/ownership of upto 2 hectares, will be provided direct income support at the rate of Rs.6,000 per year.",
  category: "Agriculture",
  status: "Active",
  launchDate: "2018-12-01",
  deadline: "2024-12-31",
  totalBeneficiaries: "11+ Crore",
  budgetAllocated: "₹60,000 Crore",
  
  eligibility: {
    criteria: [
      "Small and marginal farmers with landholding up to 2 hectares",
      "Farmers should be Indian citizens",
      "Land records should be in the name of the applicant",
      "Bank account should be linked with Aadhaar"
    ],
    exclusions: [
      "Institutional landholders",
      "Farmer families whose member is/was an MP/MLA/MLC",
      "Present/former Ministers",
      "Present/former Mayors", 
      "Constitutional post holders",
      "Retired/serving employees of Central/State Government",
      "Professionals like doctors, engineers, lawyers, CAs",
      "Income tax payers in previous assessment year"
    ]
  },
  
  benefits: [
    "Direct cash transfer of ₹6,000 per year",
    "Amount transferred in 3 equal installments of ₹2,000 each",
    "Money directly credited to farmer's bank account",
    "No intermediary involvement in fund transfer"
  ],
  
  requiredDocuments: [
    "Aadhaar Card (mandatory)",
    "Land ownership documents (Khatauni/Khasra)",
    "Bank account details",
    "Passport size photograph",
    "Mobile number for SMS alerts"
  ],
  
  applicationProcess: [
    "Visit nearest Common Service Centre (CSC) or apply online",
    "Fill the application form with accurate details",
    "Upload required documents",
    "Submit the application and note the registration number",
    "Track application status online"
  ],
  
  keyFeatures: [
    "100% Central Government funding",
    "Direct Benefit Transfer (DBT) mechanism",
    "Aadhaar-based beneficiary identification",
    "Real-time tracking of benefits",
    "Transparent and corruption-free implementation"
  ]
};

export default function SchemeDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleApply = () => {
    if (user?.role !== "Citizen") {
      toast({
        title: "Access Denied",
        description: "Only citizens can apply for schemes",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Redirecting to Application",
      description: "You will be redirected to the application form",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/schemes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Schemes
          </Button>
        </Link>
      </div>

      {/* Scheme Header */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <Badge variant="outline">{mockScheme.category}</Badge>
                <Badge className="bg-success text-success-foreground">
                  {mockScheme.status}
                </Badge>
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                {mockScheme.name}
              </CardTitle>
              <CardDescription className="text-base mt-3">
                {mockScheme.description}
              </CardDescription>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Link to={`/apply/${mockScheme.id}`}>
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:bg-primary-hover"
                  onClick={handleApply}
                  disabled={user?.role !== "Citizen"}
                >
                  Apply Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Download Brochure
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{mockScheme.totalBeneficiaries}</div>
            <div className="text-sm text-muted-foreground">Beneficiaries</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <IndianRupee className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{mockScheme.budgetAllocated}</div>
            <div className="text-sm text-muted-foreground">Budget</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{mockScheme.launchDate}</div>
            <div className="text-sm text-muted-foreground">Launch Date</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{mockScheme.deadline}</div>
            <div className="text-sm text-muted-foreground">Deadline</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Benefits */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Key Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mockScheme.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-success mb-3">Who can apply:</h4>
                <ul className="space-y-2">
                  {mockScheme.eligibility.criteria.map((criteria, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold text-destructive mb-3">Exclusions:</h4>
                <ul className="space-y-2">
                  {mockScheme.eligibility.exclusions.map((exclusion, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="h-4 w-4 rounded-full bg-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{exclusion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {mockScheme.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Required Documents */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Required Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mockScheme.requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{doc}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>How to Apply</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {mockScheme.applicationProcess.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Apply CTA */}
          <Card className="shadow-card bg-gradient-primary text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
              <p className="text-sm opacity-90 mb-4">
                Start your application process now and get benefits directly in your account.
              </p>
              <Link to={`/apply/${mockScheme.id}`}>
                <Button 
                  size="lg" 
                  className="w-full bg-white text-primary hover:bg-white/90"
                  onClick={handleApply}
                  disabled={user?.role !== "Citizen"}
                >
                  Start Application
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}