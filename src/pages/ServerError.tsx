import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServerError() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-16 w-16 mx-auto mb-6 text-destructive" />
        <h1 className="text-4xl font-bold mb-4">500 - Server Error</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Something went wrong on our end
        </p>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}