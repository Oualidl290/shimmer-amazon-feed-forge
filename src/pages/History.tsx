
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
import { Check, X, Clock, Eye, FileText, BarChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/lib/api-service";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrapingJob } from "@/lib/types";

export default function History() {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<ScrapingJob | null>(null);
  
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: apiService.getJobs
  });
  
  const viewJobDetails = (job: ScrapingJob) => {
    setSelectedJob(job);
  };
  
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
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Job History</h1>
            
            <Button variant="outline" className="flex gap-2">
              <FileText className="h-4 w-4" />
              Export History
            </Button>
          </div>
          
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
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => viewJobDetails(job)}
                        >
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
      
      {/* Job Details Dialog */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
            <DialogDescription>
              Scraping job started on {selectedJob && new Date(selectedJob.startTime).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p className={`text-xl font-semibold
                    ${selectedJob.status === "completed" ? "text-green-500" : 
                    selectedJob.status === "failed" ? "text-red-500" : 
                    "text-amber-500"}`}>
                    {selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Duration</p>
                  <p className="text-xl font-semibold">{selectedJob.duration || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-xl font-semibold">{selectedJob.totalProducts.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Errors</p>
                  <p className="text-xl font-semibold">{selectedJob.errors}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.categories?.map((category, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedJob(null)}>Close</Button>
                <Button className="flex gap-2">
                  <BarChart className="h-4 w-4" />
                  View Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
