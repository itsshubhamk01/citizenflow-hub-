import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  User, 
  FileText,
  Calendar,
  Download,
  MessageSquare,
  Eye
} from "lucide-react";

const mockApplication = {
  id: "APP001",
  schemeName: "PM Kisan Samman Nidhi",
  applicantName: "Rajesh Kumar",
  status: "Under Review",
  submittedAt: "2024-01-15",
  lastUpdated: "2024-01-18",
  estimatedCompletion: "2024-02-05",
  currentStage: "Document Verification",
  
  timeline: [
    {
      stage: "Application Submitted",
      date: "2024-01-15",
      status: "completed",
      description: "Application submitted successfully"
    },
    {
      stage: "Initial Verification", 
      date: "2024-01-16",
      status: "completed",
      description: "Basic details verified"
    },
    {
      stage: "Document Verification",
      date: "2024-01-18",
      status: "current",
      description: "Documents under review by Officer Kumar"
    },
    {
      stage: "Field Verification",
      date: "Expected: 2024-01-25",
      status: "pending", 
      description: "Physical verification of land records"
    },
    {
      stage: "Final Approval",
      date: "Expected: 2024-02-05",
      status: "pending",
      description: "Final approval by District Collector"
    }
  ],
  
  documents: [
    { name: "Aadhaar Card", status: "verified", uploadedOn: "2024-01-15" },
    { name: "Land Records", status: "under_review", uploadedOn: "2024-01-15" },
    { name: "Bank Details", status: "verified", uploadedOn: "2024-01-15" },
    { name: "Passport Photo", status: "verified", uploadedOn: "2024-01-15" },
    { name: "Income Certificate", status: "pending_clarification", uploadedOn: "2024-01-15" }
  ],
  
  applicationData: {
    landHolding: "1.5 hectares",
    annualIncome: "₹1,20,000",
    bankAccount: "****1234",
    category: "General"
  },
  
  comments: [
    {
      by: "Officer Kumar",
      date: "2024-01-18", 
      message: "Land records are being verified. Income certificate needs to be resubmitted with proper authority signature."
    }
  ]
};

export default function ApplicationStatus() {
  const { id } = useParams();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "current": return "bg-warning text-warning-foreground";
      case "verified": return "bg-success text-success-foreground";
      case "under_review": return "bg-warning text-warning-foreground";
      case "pending_clarification": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4 text-success" />;
      case "under_review": return <Clock className="h-4 w-4 text-warning" />;
      case "pending_clarification": return <Eye className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/applications">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Button>
        </Link>
      </div>

      {/* Application Header */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <CardTitle className="text-2xl flex items-center space-x-3">
                <FileText className="h-6 w-6 text-primary" />
                <span>{mockApplication.schemeName}</span>
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Application ID: {mockApplication.id}
              </CardDescription>
            </div>
            <div className="flex flex-col items-start md:items-end space-y-2">
              <Badge className={getStatusColor(mockApplication.status.toLowerCase())}>
                {mockApplication.status}
              </Badge>
              <p className="text-sm text-muted-foreground">
                Current Stage: {mockApplication.currentStage}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Timeline */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Application Progress</CardTitle>
              <CardDescription>
                Track your application through each stage of the review process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockApplication.timeline.map((stage, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      stage.status === 'completed' 
                        ? 'bg-success text-success-foreground' 
                        : stage.status === 'current'
                        ? 'bg-warning text-warning-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {stage.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : stage.status === 'current' ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <div className="w-2 h-2 bg-current rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{stage.stage}</h4>
                        <span className="text-xs text-muted-foreground">{stage.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents Status */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Document Verification Status</CardTitle>
              <CardDescription>
                Status of all submitted documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockApplication.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getDocumentStatusIcon(doc.status)}
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded: {doc.uploadedOn}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(doc.status)}
                      >
                        {doc.status.replace('_', ' ')}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments & Updates */}
          {mockApplication.comments.length > 0 && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Officer Comments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplication.comments.map((comment, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{comment.by}</span>
                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="text-sm">{comment.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Application Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Applicant</p>
                  <p className="text-xs text-muted-foreground">{mockApplication.applicantName}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Submitted On</p>
                  <p className="text-xs text-muted-foreground">{mockApplication.submittedAt}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Expected Completion</p>
                  <p className="text-xs text-muted-foreground">{mockApplication.estimatedCompletion}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Application Details</p>
                <div className="text-xs space-y-1">
                  <p>Land Holding: {mockApplication.applicationData.landHolding}</p>
                  <p>Annual Income: {mockApplication.applicationData.annualIncome}</p>
                  <p>Bank Account: {mockApplication.applicationData.bankAccount}</p>
                  <p>Category: {mockApplication.applicationData.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Application
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Officer
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Update Documents
              </Button>
            </CardContent>
          </Card>

          {/* Help */}
          <Card className="shadow-card bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm">Need Clarification?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">
                If you need to resubmit documents or have questions about your application status.
              </p>
              <Button size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}