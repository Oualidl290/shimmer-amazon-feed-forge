
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, FileText, Settings, History, Calendar, Database, ListFilter } from "lucide-react";
import StatusCard from "@/components/dashboard/StatusCard";
import ProgressBar from "@/components/dashboard/ProgressBar";
import JobHistoryTable from "@/components/tables/JobHistoryTable";
import ConfigForm from "@/components/forms/ConfigForm";
import SideNav from "@/components/layout/SideNav";

export default function Index() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <SideNav />
      
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Jewelry Amazon Feed Generator</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <Button className="h-8 gap-1">
              <Play className="h-3.5 w-3.5" />
              <span>Start Scraper</span>
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="overview" className="flex gap-2">
                    <Database className="h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="configuration" className="flex gap-2">
                    <Settings className="h-4 w-4" />
                    Configuration
                  </TabsTrigger>
                  <TabsTrigger value="data" className="flex gap-2">
                    <FileText className="h-4 w-4" />
                    Data Viewer
                  </TabsTrigger>
                  <TabsTrigger value="logs" className="flex gap-2">
                    <FileText className="h-4 w-4" />
                    Logs
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex gap-2">
                    <History className="h-4 w-4" />
                    Job History
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {/* Overview Tab Content */}
              <TabsContent value="overview" className="space-y-6">
                {/* Scraper Status Section */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <StatusCard 
                    title="Scraper Status" 
                    value="Idle" 
                    icon={<div className="h-3 w-3 rounded-full bg-gray-300"></div>}
                  />
                  <StatusCard 
                    title="Products Processed" 
                    value="0" 
                    subtitle="/ 0" 
                  />
                  <StatusCard 
                    title="Time Elapsed" 
                    value="00:00:00" 
                  />
                </div>
                
                {/* Progress Bar */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProgressBar value={0} max={100} showPercentage />
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Pages Crawled</p>
                        <p className="text-xl font-bold">0 <span className="text-sm text-muted-foreground">/ 0</span></p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Available Products</p>
                        <p className="text-xl font-bold">0</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Unavailable Products</p>
                        <p className="text-xl font-bold">0</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Feed Status</p>
                        <p className="text-xl font-bold">Pending</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <Button className="gap-2 px-8">
                        <Play className="h-4 w-4" />
                        Start Scraper
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Job Summary Section */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Job Summary</CardTitle>
                      <CardDescription>Overview of the latest scraping job</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Products Scraped</p>
                          <p className="text-3xl font-bold">6,284</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">In Stock</p>
                          <p className="text-3xl font-bold">5,932</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Last Run</p>
                          <p className="text-3xl font-bold">2h ago</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                          <p className="text-3xl font-bold text-green-500">98%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common operations for the scraper</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                          <FileText className="h-6 w-6" />
                          <span>Download Latest Feed</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                          <Database className="h-6 w-6" />
                          <span>View Stock Report</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                          <Settings className="h-6 w-6" />
                          <span>Edit Configuration</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                          <Calendar className="h-6 w-6" />
                          <span>Update Schedule</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Recent Jobs Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Jobs</CardTitle>
                    <CardDescription>History of the most recent scraping jobs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <JobHistoryTable />
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Configuration Tab Content */}
              <TabsContent value="configuration">
                <ConfigForm />
              </TabsContent>
              
              {/* Data Viewer Tab Content */}
              <TabsContent value="data">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Preview</CardTitle>
                    <CardDescription>
                      Preview of the scraped product data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>SKU</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Images</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                              No data available. Run the scraper to see results.
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Logs Tab Content */}
              <TabsContent value="logs">
                <Card>
                  <CardHeader>
                    <CardTitle>Scraper Logs</CardTitle>
                    <CardDescription>
                      Log output from the scraper process
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-zinc-950 text-zinc-50 p-4 rounded-md font-mono text-sm h-[400px] overflow-y-auto">
                      <p className="text-green-400">2023-05-06 02:00:00 - INFO - Starting jewelry catalog scraper</p>
                      <p className="text-green-400">2023-05-06 02:00:01 - INFO - Scraping category: https://supplier-jewelry-website.com/necklaces</p>
                      <p className="text-green-400">2023-05-06 02:00:02 - INFO - Scraping page 1: https://supplier-jewelry-website.com/necklaces</p>
                      <p className="text-green-400">2023-05-06 02:00:05 - INFO - Found 24 products on page 1</p>
                      <p className="text-gray-400">... log entries will appear here during scraping ...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Job History Tab Content */}
              <TabsContent value="history">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Job History</CardTitle>
                      <CardDescription>
                        Complete history of all scraper jobs
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      All Time
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <JobHistoryTable />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper Table components for the data viewer tab
const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full caption-bottom text-sm">{children}</table>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="[&_tr]:border-b">{children}</thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
);

const TableHead = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <th className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground ${className || ''}`}>{children}</th>
);

const TableRow = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className || ''}`}>{children}</tr>
);

const TableCell = ({ children, className, colSpan }: { children: React.ReactNode, className?: string, colSpan?: number }) => (
  <td className={`p-2 align-middle ${className || ''}`} colSpan={colSpan}>{children}</td>
);
