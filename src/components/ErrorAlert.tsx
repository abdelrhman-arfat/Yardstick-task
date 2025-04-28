import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ErrorAlert() {
  return (
    <Alert
      variant="destructive"
      className="border-l-4 border-red-600 bg-red-50 text-red-700 p-4 rounded-lg shadow-md flex items-start gap-4"
    >
      <AlertCircle className="h-6 w-6 mt-1 flex-shrink-0 text-red-600" />
      <div className="flex-1">
        <AlertTitle className="text-base font-semibold">Error</AlertTitle>
        <AlertDescription className="text-sm mt-1">
          Your session has expired. Please log in again.
        </AlertDescription>
      </div>
    </Alert>
  );
}
