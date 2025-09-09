import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  PlusCircle,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const mockSchemes = [
  {
    id: "1",
    name: "PM Kisan Yojana",
    description: "Direct income support to farmers",
    status: "Active",
    applicants: 1245,
  },
  {
    id: "2", 
    name: "Ayushman Bharat",
    description: "Health insurance for families",
    status: "Active",
    applicants: 892,
  },
  {
    id: "3",
    name: "Digital India Initiative", 
    description: "Digital literacy and infrastructure",
    status: "Active",
    applicants: 567,
  },
];

const mockApplications = [
  {
    id: "1",
    schemeName: "PM Kisan Yojana",
    applicantName: "Rajesh Kumar",
    status: "Pending",
    submittedAt: "2024-01-15",
  },
  {
    id: "2",
    schemeName: "Ayushman Bharat", 
    applicantName: "Priya Sharma",
    status: "Approved",
    submittedAt: "2024-01-14",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const renderCitizenDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Citizen Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}. Apply for schemes and track your applications.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Applications Submitted"
          value={3}
          icon={FileText}
          description="Total applications"
        />
        <StatsCard
          title="Approved"
          value={1}
          icon={CheckCircle}
          description="Successfully approved"
        />
        <StatsCard
          title="Pending"
          value={2}
          icon={Clock}
          description="Under review"
        />
        <StatsCard
          title="Available Schemes"
          value={12}
          icon={Users}
          description="You can apply"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Available Schemes
              <Link to="/schemes">
                <Button size="sm" variant="outline">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSchemes.slice(0, 3).map((scheme) => (
              <div key={scheme.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{scheme.name}</h4>
                  <p className="text-sm text-muted-foreground">{scheme.description}</p>
                </div>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Apply
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{app.schemeName}</h4>
                  <p className="text-sm text-muted-foreground">Submitted: {app.submittedAt}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={app.status === "Approved" ? "default" : "secondary"}
                    className={app.status === "Approved" ? "bg-success" : ""}
                  >
                    {app.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderOfficerDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Officer Dashboard</h1>
        <p className="text-muted-foreground">
          Review and manage applications assigned to you.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pending Reviews"
          value={15}
          icon={Clock}
          description="Awaiting your action"
        />
        <StatsCard
          title="Approved Today"
          value={8}
          icon={CheckCircle}
          description="Applications approved"
        />
        <StatsCard
          title="Rejected"
          value={2}
          icon={AlertCircle}
          description="Applications rejected"
        />
        <StatsCard
          title="Total Processed"
          value={156}
          icon={FileText}
          description="This month"
        />
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Applications to Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockApplications.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{app.schemeName}</h4>
                <p className="text-sm text-muted-foreground">
                  Applicant: {app.applicantName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Submitted: {app.submittedAt}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  Review
                </Button>
                <Button size="sm" className="bg-success hover:bg-success/90">
                  Approve
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage schemes, users, and monitor system performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={2456}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Schemes"
          value={18}
          icon={FileText}
          description="Currently running"
        />
        <StatsCard
          title="Applications Today"
          value={67}
          icon={PlusCircle}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Approval Rate"
          value="84%"
          icon={CheckCircle}
          description="This month"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Scheme Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSchemes.map((scheme) => (
              <div key={scheme.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{scheme.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {scheme.applicants} applications
                  </p>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success">
                  {scheme.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Scheme
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  switch (user?.role) {
    case "Admin":
      return renderAdminDashboard();
    case "Officer":
      return renderOfficerDashboard();
    case "Citizen":
      return renderCitizenDashboard();
    default:
      return <div>Loading...</div>;
  }
}