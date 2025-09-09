import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Shield className="h-16 w-16 mx-auto mb-6 text-destructive" />
        <h1 className="text-4xl font-bold mb-4">403 - Access Denied</h1>
        <p className="text-xl text-muted-foreground mb-6">
          You don't have permission to access this page
        </p>
        <Link to="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}