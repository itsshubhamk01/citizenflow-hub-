import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar,
  Search
} from "lucide-react";

const mockSchemes = [
  { id: "1", name: "PM Kisan Samman Nidhi", category: "Agriculture", status: "Active", applicants: 1245, budget: "₹60,000 Cr" },
  { id: "2", name: "Ayushman Bharat", category: "Healthcare", status: "Active", applicants: 892, budget: "₹30,000 Cr" },
  { id: "3", name: "Digital India", category: "Education", status: "Active", applicants: 567, budget: "₹15,000 Cr" },
];

export default function ManageSchemes() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Schemes</h1>
          <p className="text-muted-foreground">Create and manage government schemes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Scheme
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSchemes.map((scheme) => (
              <div key={scheme.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium">{scheme.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{scheme.category}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{scheme.applicants} applications</span>
                    </div>
                    <span>Budget: {scheme.budget}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-success text-success-foreground">{scheme.status}</Badge>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}