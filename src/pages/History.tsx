
import { useState } from "react";
import SideNav from "@/components/layout/SideNav";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/lib/api-service";
import { useToast } from "@/hooks/use-toast";

export default function History() {
  const { toast } = useToast();
  
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: apiService.getJobs
  });
  
  if (error) {
    toast({
      title: "Error loading job history",
      description: "Failed to load job history. Please try refreshing.",
      variant: "destructive",
    });
  }
  
  return (
    <div className="flex h-screen bg-background">
      <SideNav />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Job History</h1>
          
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Errors</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Loading job history...
                    </TableCell>
                  </TableRow>
                ) : jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">
                        {new Date(job.startTime).toLocaleString()}
                      </TableCell>
                      <TableCell>{job.duration || "N/A"}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1">
                          {job.status === "completed" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : job.status === "failed" ? (
                            <X className="h-4 w-4 text-red-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-amber-500" />
                          )}
                          <span className={
                            job.status === "completed" ? "text-green-500" : 
                            job.status === "failed" ? "text-red-500" : 
                            "text-amber-500"
                          }>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell>{job.totalProducts.toLocaleString()}</TableCell>
                      <TableCell>{job.errors}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No job history found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
