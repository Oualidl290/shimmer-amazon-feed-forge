
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
import { Download, Eye } from "lucide-react";

type Report = {
  id: string;
  name: string;
  date: string;
  type: "amazon" | "stock" | "errors";
  fileSize: string;
  products: number;
};

const MOCK_REPORTS: Report[] = [
  {
    id: "report_1",
    name: "amazon-jewelry-feed-20250506.xlsx",
    date: "May 6, 2025",
    type: "amazon",
    fileSize: "3.2 MB",
    products: 6248
  },
  {
    id: "report_2",
    name: "out-of-stock-20250506.xlsx",
    date: "May 6, 2025",
    type: "stock",
    fileSize: "156 KB",
    products: 843
  },
  {
    id: "report_3",
    name: "error-products-20250506.xlsx",
    date: "May 6, 2025",
    type: "errors",
    fileSize: "24 KB",
    products: 18
  },
  {
    id: "report_4",
    name: "amazon-jewelry-feed-20250505.xlsx",
    date: "May 5, 2025",
    type: "amazon",
    fileSize: "3.1 MB",
    products: 6106
  },
  {
    id: "report_5",
    name: "out-of-stock-20250505.xlsx",
    date: "May 5, 2025",
    type: "stock",
    fileSize: "160 KB",
    products: 867
  }
];

export default function Reports() {
  return (
    <div className="flex h-screen bg-background">
      <SideNav />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Feed Reports</h1>
          
          <div className="flex gap-3 mb-6">
            <Button variant="outline">All Reports</Button>
            <Button variant="outline">Amazon Feeds</Button>
            <Button variant="outline">Stock Reports</Button>
            <Button variant="outline">Error Reports</Button>
          </div>
          
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_REPORTS.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${report.type === 'amazon' ? 'bg-blue-100 text-blue-800' : 
                          report.type === 'stock' ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'}`}
                      >
                        {report.type === 'amazon' ? 'Amazon Feed' : 
                          report.type === 'stock' ? 'Stock Report' : 'Error Report'}
                      </span>
                    </TableCell>
                    <TableCell>{report.products.toLocaleString()}</TableCell>
                    <TableCell>{report.fileSize}</TableCell>
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
      </div>
    </div>
  );
}
