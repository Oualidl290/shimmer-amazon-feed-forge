
// Basic types for our application
export interface Product {
  id: string;
  sku: string;
  title: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
  dateAdded: string;
  lastUpdated: string;
}

export interface ScrapingJob {
  id: string;
  startTime: string;
  endTime?: string; 
  status: "completed" | "failed" | "running" | "idle";
  totalProducts: number;
  errors: number;
  categories: string[];
  duration?: string;
}

export interface ScrapingConfig {
  supplierUrl: string;
  userAgent: string;
  scrapeInterval: string;
  maxConcurrency: number;
  timeout: number;
  exportFormat: string;
}

export interface FeedReport {
  id: string;
  name: string;
  date: string;
  type: "amazon" | "stock" | "errors";
  fileSize: string;
  products: number;
}

export interface CategoryProgress {
  name: string;
  value: number;
  status: "completed" | "running" | "idle";
}

export interface DashboardStats {
  totalProducts: number;
  lastScrapeTime: string;
  failedProducts: number;
  feedStatus: string;
  categoryProgress: CategoryProgress[];
}
