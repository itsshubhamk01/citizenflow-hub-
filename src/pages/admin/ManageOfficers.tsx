import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ManageOfficers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Officers</h1>
          <p className="text-muted-foreground">Add and manage government officers</p>
        </div>
        <Button>Add New Officer</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Officers List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Officer management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}