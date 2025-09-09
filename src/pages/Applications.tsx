import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle,
  FileText,
  Calendar,
  User
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const mockApplications = [
  {
    id: "APP001",
    schemeName: "PM Kisan Samman Nidhi",
    applicantName: "Rajesh Kumar", 
    applicantEmail: "rajesh@email.com",
    status: "Pending",
    submittedAt: "2024-01-15",
    reviewedBy: null,
    reviewedAt: null,
    documents: ["Aadhaar Card", "Land Records", "Bank Details"],
  },
  {
    id: "APP002",
    schemeName: "Ayushman Bharat",
    applicantName: "Priya Sharma",
    applicantEmail: "priya@email.com", 
    status: "Approved",
    submittedAt: "2024-01-14",
    reviewedBy: "Officer Kumar",
    reviewedAt: "2024-01-16",
    documents: ["Family Card", "Income Certificate", "Aadhaar Card"],
  },
  {
    id: "APP003",
    schemeName: "Digital India Initiative",
    applicantName: "Amit Patel",
    applicantEmail: "amit@email.com",
    status: "Under Review", 
    submittedAt: "2024-01-13",
    reviewedBy: "Officer Kumar",
    reviewedAt: "2024-01-15",
    documents: ["Aadhaar Card", "Educational Certificate"],
  },
  {
    id: "APP004",
    schemeName: "Mudra Yojana",
    applicantName: "Sunita Verma", 
    applicantEmail: "sunita@email.com",
    status: "Rejected",
    submittedAt: "2024-01-12",
    reviewedBy: "Officer Singh",
    reviewedAt: "2024-01-14",
    documents: ["Business Plan", "Bank Statement", "Aadhaar Card"],
    rejectionReason: "Incomplete documentation - Missing NOC from local authority",
  },
];

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { user } = useAuth();
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return CheckCircle;
      case "Rejected": return XCircle;
      case "Under Review": return Eye;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-success text-success-foreground";
      case "Rejected": return "bg-destructive text-destructive-foreground";
      case "Under Review": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleReviewAction = (applicationId: string, action: "approve" | "reject") => {
    toast({
      title: `Application ${action === "approve" ? "Approved" : "Rejected"}`,
      description: `Application ${applicationId} has been ${action}d successfully`,
    });
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = 
      app.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    
    // Filter by user role
    if (user?.role === "Citizen") {
      return matchesSearch && matchesStatus && app.applicantEmail === user.email;
    }
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {user?.role === "Citizen" ? "My Applications" : "Application Management"}
        </h1>
        <p className="text-muted-foreground">
          {user?.role === "Citizen" 
            ? "Track your scheme applications and their status"
            : "Review and manage scheme applications"
          }
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {["All", "Pending", "Under Review", "Approved", "Rejected"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="whitespace-nowrap"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => {
          const StatusIcon = getStatusIcon(application.status);
          
          return (
            <Card key={application.id} className="shadow-card hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>{application.schemeName}</span>
                    </CardTitle>
                    <CardDescription>
                      Application ID: {application.id}
                    </CardDescription>
                  </div>
                  
                  <Badge className={getStatusColor(application.status)}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {application.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Applicant:</span>
                      <span>{application.applicantName}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Submitted:</span>
                      <span>{application.submittedAt}</span>
                    </div>
                    
                    {application.reviewedAt && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Reviewed:</span>
                        <span>{application.reviewedAt} by {application.reviewedBy}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Documents:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {application.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {application.rejectionReason && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-sm text-destructive">
                      <span className="font-medium">Rejection Reason: </span>
                      {application.rejectionReason}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  
                  {(user?.role === "Officer" || user?.role === "Admin") && 
                   application.status === "Pending" && (
                    <>
                      <Button 
                        size="sm" 
                        className="bg-success hover:bg-success/90"
                        onClick={() => handleReviewAction(application.id, "approve")}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleReviewAction(application.id, "reject")}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No applications found</h3>
          <p className="text-muted-foreground">
            {user?.role === "Citizen" 
              ? "You haven't submitted any applications yet"
              : "No applications match your search criteria"
            }
          </p>
        </div>
      )}
    </div>
  );
}