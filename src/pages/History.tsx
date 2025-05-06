
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

type JobHistory = {
  id: string;
  date: string;
  duration: string;
  status: "completed" | "failed" | "running";
  products: number;
  errors: number;
};

const MOCK_HISTORY: JobHistory[] = [
  {
    id: "job_1",
    date: "May 6, 2025, 9:32 AM",
    duration: "42 min",
    status: "completed",
    products: 6248,
    errors: 18
  },
  {
    id: "job_2",
    date: "May 5, 2025, 9:30 AM",
    duration: "40 min",
    status: "completed",
    products: 6106,
    errors: 21
  },
  {
    id: "job_3",
    date: "May 4, 2025, 9:31 AM",
    duration: "44 min",
    status: "completed",
    products: 6050,
    errors: 25
  },
  {
    id: "job_4",
    date: "May 3, 2025, 9:29 AM",
    duration: "38 min",
    status: "completed",
    products: 6012,
    errors: 19
  },
  {
    id: "job_5",
    date: "May 2, 2025, 9:30 AM",
    duration: "41 min",
    status: "failed",
    products: 5240,
    errors: 768
  }
];

export default function History() {
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
                {MOCK_HISTORY.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.date}</TableCell>
                    <TableCell>{job.duration}</TableCell>
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
                    <TableCell>{job.products.toLocaleString()}</TableCell>
                    <TableCell>{job.errors}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
