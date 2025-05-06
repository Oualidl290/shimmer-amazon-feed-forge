
import { useScrapingContext } from "@/context/ScrapingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Check, AlertTriangle } from "lucide-react";

export default function ScrapingStatus() {
  const { status, progress, currentCategory } = useScrapingContext();
  
  const getStatusIcon = () => {
    switch (status) {
      case 'running':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = () => {
    switch (status) {
      case 'idle':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Idle</Badge>;
      case 'running':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Running</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Failed</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Scraping Status</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} max={100} className="h-2" />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Progress</p>
            <p className="text-2xl font-bold">{progress}%</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Category</p>
            <p className="text-lg font-medium">
              {status === 'running' ? currentCategory || 'Initializing...' : '-'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
