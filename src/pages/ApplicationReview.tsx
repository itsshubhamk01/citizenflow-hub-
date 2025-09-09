import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Eye,
  Download,
  User,
  FileText,
  Calendar,
  MapPin,
  IndianRupee,
  Phone,
  Mail
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const mockApplicationReview = {
  id: "APP001",
  schemeName: "PM Kisan Samman Nidhi",
  status: "Pending",
  submittedAt: "2024-01-15",
  
  applicant: {
    name: "Rajesh Kumar",
    aadhaar: "****-****-1234",
    phone: "+91-9876543210",
    email: "rajesh.kumar@email.com",
    address: "Village Rampur, Tehsil Sadar, District Aligarh, Uttar Pradesh - 202001",
    category: "General",
    landHolding: "1.5 hectares",
    annualIncome: "₹1,20,000",
    bankAccount: "****-****-1234",
    ifscCode: "SBIN0001234"
  },
  
  documents: [
    { 
      name: "Aadhaar Card", 
      status: "verified", 
      uploadedOn: "2024-01-15",
      url: "#",
      notes: "Valid and clear document"
    },
    { 
      name: "Land Records (Khatauni)", 
      status: "under_review", 
      uploadedOn: "2024-01-15",
      url: "#",
      notes: ""
    },
    { 
      name: "Bank Account Details", 
      status: "verified", 
      uploadedOn: "2024-01-15",
      url: "#",
      notes: "Account verified with IFSC"
    },
    { 
      name: "Passport Size Photo", 
      status: "verified", 
      uploadedOn: "2024-01-15",
      url: "#",
      notes: ""
    },
    { 
      name: "Income Certificate", 
      status: "requires_clarification", 
      uploadedOn: "2024-01-15",
      url: "#",
      notes: "Authority signature unclear"
    }
  ],
  
  eligibilityCheck: {
    landHoldingEligible: true,
    incomeEligible: true,
    categoryEligible: true,
    documentsComplete: false,
    aadhaarVerified: true,
    bankLinked: true
  },
  
  previousApplications: [
    { year: "2023", status: "Approved", amount: "₹6,000" },
    { year: "2022", status: "Approved", amount: "₹6,000" }
  ]
};

export default function ApplicationReview() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviewComments, setReviewComments] = useState("");
  const [actionInProgress, setActionInProgress] = useState("");

  const handleApprove = async () => {
    setActionInProgress("approve");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application Approved",
      description: `Application ${mockApplicationReview.id} has been approved successfully.`,
    });
    setActionInProgress("");
  };

  const handleReject = async () => {
    if (!reviewComments.trim()) {
      toast({
        title: "Comments Required",
        description: "Please provide comments before rejecting the application.",
        variant: "destructive",
      });
      return;
    }

    setActionInProgress("reject");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application Rejected",
      description: `Application ${mockApplicationReview.id} has been rejected.`,
    });
    setActionInProgress("");
  };

  const handleRequestClarification = async () => {
    if (!reviewComments.trim()) {
      toast({
        title: "Comments Required", 
        description: "Please provide specific clarification requirements.",
        variant: "destructive",
      });
      return;
    }

    setActionInProgress("clarification");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Clarification Requested",
      description: "Applicant has been notified about required clarifications.",
    });
    setActionInProgress("");
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-success text-success-foreground";
      case "under_review": return "bg-warning text-warning-foreground"; 
      case "requires_clarification": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/applications">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applications
            </Button>
          </Link>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-warning/10 text-warning">
            Assigned to {user?.name}
          </Badge>
          <Badge>Pending Review</Badge>
        </div>
      </div>

      {/* Application Header */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center space-x-3">
                <FileText className="h-6 w-6 text-primary" />
                <span>{mockApplicationReview.schemeName}</span>
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Application ID: {mockApplicationReview.id} • Submitted: {mockApplicationReview.submittedAt}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Review Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Applicant Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Full Name</Label>
                    <p className="font-medium">{mockApplicationReview.applicant.name}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Aadhaar Number</Label>
                    <p className="font-medium">{mockApplicationReview.applicant.aadhaar}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Phone Number</Label>
                    <p className="font-medium flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{mockApplicationReview.applicant.phone}</span>
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <p className="font-medium flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{mockApplicationReview.applicant.email}</span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Category</Label>
                    <p className="font-medium">{mockApplicationReview.applicant.category}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Land Holding</Label>
                    <p className="font-medium">{mockApplicationReview.applicant.landHolding}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Annual Income</Label>
                    <p className="font-medium flex items-center space-x-2">
                      <IndianRupee className="h-4 w-4" />
                      <span>{mockApplicationReview.applicant.annualIncome}</span>
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Bank Account</Label>
                    <p className="font-medium">{mockApplicationReview.applicant.bankAccount}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-xs text-muted-foreground">Address</Label>
                <p className="font-medium flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{mockApplicationReview.applicant.address}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Document Review */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Document Review</CardTitle>
              <CardDescription>
                Review all submitted documents and mark their verification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockApplicationReview.documents.map((doc, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Uploaded: {doc.uploadedOn}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getDocumentStatusColor(doc.status)}>
                          {doc.status.replace('_', ' ')}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {doc.notes && (
                      <div className="p-2 bg-muted/50 rounded text-sm">
                        <span className="font-medium">Notes: </span>
                        {doc.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Review Comments */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Review Comments</CardTitle>
              <CardDescription>
                Add your comments and observations about this application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    placeholder="Enter your review comments, observations, or requirements for clarification..."
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="bg-success hover:bg-success/90"
                    onClick={handleApprove}
                    disabled={!!actionInProgress}
                  >
                    {actionInProgress === "approve" ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Application
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="destructive"
                    onClick={handleReject}
                    disabled={!!actionInProgress}
                  >
                    {actionInProgress === "reject" ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Application
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleRequestClarification}
                    disabled={!!actionInProgress}
                  >
                    {actionInProgress === "clarification" ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Request Clarification
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Eligibility Checklist */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Eligibility Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(mockApplicationReview.eligibilityCheck).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    {value ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Previous Applications */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Application History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockApplicationReview.previousApplications.map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div>
                      <p className="text-sm font-medium">{app.year}</p>
                      <p className="text-xs text-muted-foreground">{app.amount}</p>
                    </div>
                    <Badge 
                      variant="outline"
                      className={app.status === "Approved" ? "bg-success/10 text-success" : ""}
                    >
                      {app.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download All Documents
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Contact Applicant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}