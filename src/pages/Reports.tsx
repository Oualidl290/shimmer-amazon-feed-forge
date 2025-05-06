
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
import { Download, Eye, FilePlus, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/lib/api-service";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filterType, setFilterType] = useState<string | null>(null);
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  
  const { data: reports, isLoading, error } = useQuery({
    queryKey: ['reports'],
    queryFn: apiService.getReports
  });
  
  const generateReportMutation = useMutation({
    mutationFn: apiService.generateReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast({
        title: "Report generated",
        description: "Your report has been generated successfully"
      });
      setGeneratingReport(null);
    },
    onError: () => {
      toast({
        title: "Report generation failed",
        description: "There was an error generating your report",
        variant: "destructive"
      });
      setGeneratingReport(null);
    }
  });
  
  const handleGenerateReport = (type: string) => {
    setGeneratingReport(type);
    generateReportMutation.mutate(type);
  };
  
  if (error) {
    toast({
      title: "Error loading reports",
      description: "Failed to load report data. Please try refreshing.",
      variant: "destructive",
    });
  }
  
  const filteredReports = filterType 
    ? reports?.filter(report => report.type === filterType)
    : reports;
  
  return (
    <div className="flex h-screen bg-background">
      <SideNav />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Feed Reports</h1>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleGenerateReport('amazon')}
                disabled={generatingReport === 'amazon'}
              >
                {generatingReport === 'amazon' ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <FilePlus className="h-4 w-4 mr-2" />
                )}
                Generate Amazon Feed
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => handleGenerateReport('stock')} 
                disabled={generatingReport === 'stock'}
              >
                {generatingReport === 'stock' ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <FilePlus className="h-4 w-4 mr-2" />
                )}
                Generate Stock Report
              </Button>
            </div>
          </div>
          
          <div className="flex gap-3 mb-6">
            <Button 
              variant={filterType === null ? "default" : "outline"}
              onClick={() => setFilterType(null)}
            >
              All Reports
            </Button>
            <Button 
              variant={filterType === "amazon" ? "default" : "outline"}
              onClick={() => setFilterType("amazon")}
            >
              Amazon Feeds
            </Button>
            <Button 
              variant={filterType === "stock" ? "default" : "outline"}
              onClick={() => setFilterType("stock")}
            >
              Stock Reports
            </Button>
            <Button 
              variant={filterType === "errors" ? "default" : "outline"}
              onClick={() => setFilterType("errors")}
            >
              Error Reports
            </Button>
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Loading reports...
                    </TableCell>
                  </TableRow>
                ) : filteredReports && filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No reports found.
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
