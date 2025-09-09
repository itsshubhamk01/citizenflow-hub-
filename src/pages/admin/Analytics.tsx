import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { Users, FileText, CheckCircle, TrendingUp } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics & Reports</h1>
        <p className="text-muted-foreground">Comprehensive analytics and insights</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Applications" value={2456} icon={FileText} trend={{ value: 12, isPositive: true }} />
        <StatsCard title="Active Users" value={1829} icon={Users} trend={{ value: 8, isPositive: true }} />
        <StatsCard title="Approval Rate" value="84%" icon={CheckCircle} />
        <StatsCard title="Monthly Growth" value="15%" icon={TrendingUp} trend={{ value: 3, isPositive: true }} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Advanced analytics dashboard coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}