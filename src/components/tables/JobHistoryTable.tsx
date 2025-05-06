
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Job = {
  id: string;
  startTime: string;
  duration: string;
  status: "completed" | "failed" | "running";
  products: string;
  issues: number;
};

const mockJobs: Job[] = [
  {
    id: "job_1",
    startTime: "2023-05-06 02:00:00",
    duration: "0:45:12",
    status: "completed",
    products: "5932 / 6284",
    issues: 0,
  },
  {
    id: "job_2",
    startTime: "2023-05-05 02:00:00",
    duration: "0:46:05",
    status: "completed",
    products: "5928 / 6279",
    issues: 2,
  },
  {
    id: "job_3",
    startTime: "2023-05-04 02:00:00",
    duration: "0:52:33",
    status: "failed",
    products: "2145 / 6270",
    issues: 5,
  },
  {
    id: "job_4",
    startTime: "2023-05-03 02:00:00",
    duration: "0:44:21",
    status: "completed",
    products: "5925 / 6268",
    issues: 0,
  },
];

export default function JobHistoryTable() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job ID</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Issues</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-mono text-xs">{job.id}</TableCell>
                <TableCell>{job.startTime}</TableCell>
                <TableCell>{job.duration}</TableCell>
                <TableCell>
                  <Badge
                    variant={job.status === "completed" ? "outline" : "destructive"}
                    className={
                      job.status === "completed" 
                        ? "bg-green-50 text-green-700 hover:bg-green-50 border-green-200" 
                        : job.status === "running" 
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
                          : undefined
                    }
                  >
                    {job.status === "completed" ? "Completed" : job.status === "running" ? "Running" : "Failed"}
                  </Badge>
                </TableCell>
                <TableCell>{job.products}</TableCell>
                <TableCell>{job.issues}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
