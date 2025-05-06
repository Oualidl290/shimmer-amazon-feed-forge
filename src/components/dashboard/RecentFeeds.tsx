
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

type Feed = {
  id: string;
  name: string;
  date: string;
  products: number;
  fileSize: string;
  status: "ready" | "processing" | "failed";
};

const MOCK_FEEDS: Feed[] = [
  {
    id: "1",
    name: "amazon-jewelry-feed-20250505.xlsx",
    date: "May 5, 2025",
    products: 6248,
    fileSize: "3.2 MB",
    status: "ready"
  },
  {
    id: "2",
    name: "amazon-jewelry-feed-20250504.xlsx",
    date: "May 4, 2025",
    products: 6106,
    fileSize: "3.1 MB",
    status: "ready"
  },
  {
    id: "3",
    name: "amazon-jewelry-feed-20250503.xlsx",
    date: "May 3, 2025",
    products: 6050,
    fileSize: "3.0 MB",
    status: "ready"
  }
];

export default function RecentFeeds() {
  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between p-6 pb-2">
        <h2 className="text-lg font-medium">Recent Feeds</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      <div className="p-6 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_FEEDS.map((feed) => (
              <TableRow key={feed.id}>
                <TableCell className="font-medium">{feed.name}</TableCell>
                <TableCell>{feed.date}</TableCell>
                <TableCell>{feed.products.toLocaleString()}</TableCell>
                <TableCell>{feed.fileSize}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${feed.status === 'ready' ? 'bg-green-100 text-green-800' : 
                      feed.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}
                  >
                    {feed.status === 'ready' ? 'Ready' : 
                      feed.status === 'processing' ? 'Processing' : 'Failed'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
