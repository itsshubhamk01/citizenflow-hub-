import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManageCitizens() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Citizens</h1>
        <p className="text-muted-foreground">View and manage citizen accounts</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Citizens Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Citizens management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}