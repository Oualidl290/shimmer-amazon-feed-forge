
import { Product, ScrapingJob, ScrapingConfig, FeedReport, DashboardStats } from './types';

// Mock data for development
const MOCK_JOBS: ScrapingJob[] = [
  {
    id: "job_1",
    startTime: "2025-05-06T09:32:00Z", 
    endTime: "2025-05-06T10:14:00Z",
    status: "completed",
    totalProducts: 6248,
    errors: 18,
    categories: ["necklaces", "earrings", "rings", "bracelets", "pendants"],
    duration: "42 min"
  },
  {
    id: "job_2",
    startTime: "2025-05-05T09:30:00Z",
    endTime: "2025-05-05T10:10:00Z",
    status: "completed",
    totalProducts: 6106,
    errors: 21,
    categories: ["necklaces", "earrings", "rings", "bracelets", "pendants"],
    duration: "40 min"
  },
  {
    id: "job_3",
    startTime: "2025-05-04T09:31:00Z",
    endTime: "2025-05-04T10:15:00Z",
    status: "completed",
    totalProducts: 6050,
    errors: 25,
    categories: ["necklaces", "earrings", "rings", "bracelets", "pendants"],
    duration: "44 min"
  },
  {
    id: "job_4",
    startTime: "2025-05-03T09:29:00Z",
    endTime: "2025-05-03T10:07:00Z",
    status: "completed",
    totalProducts: 6012,
    errors: 19,
    categories: ["necklaces", "earrings", "rings", "bracelets", "pendants"],
    duration: "38 min"
  },
  {
    id: "job_5",
    startTime: "2025-05-02T09:30:00Z",
    endTime: "2025-05-02T10:11:00Z",
    status: "failed",
    totalProducts: 5240,
    errors: 768,
    categories: ["necklaces", "earrings", "rings", "bracelets"],
    duration: "41 min"
  }
];

const MOCK_REPORTS: FeedReport[] = [
  {
    id: "report_1",
    name: "amazon-jewelry-feed-20250506.xlsx",
    date: "2025-05-06",
    type: "amazon",
    fileSize: "3.2 MB",
    products: 6248
  },
  {
    id: "report_2",
    name: "out-of-stock-20250506.xlsx",
    date: "2025-05-06",
    type: "stock",
    fileSize: "156 KB",
    products: 843
  },
  {
    id: "report_3",
    name: "error-products-20250506.xlsx",
    date: "2025-05-06",
    type: "errors",
    fileSize: "24 KB",
    products: 18
  },
  {
    id: "report_4",
    name: "amazon-jewelry-feed-20250505.xlsx",
    date: "2025-05-05",
    type: "amazon",
    fileSize: "3.1 MB",
    products: 6106
  },
  {
    id: "report_5",
    name: "out-of-stock-20250505.xlsx",
    date: "2025-05-05",
    type: "stock",
    fileSize: "160 KB",
    products: 867
  }
];

const DEFAULT_CONFIG: ScrapingConfig = {
  supplierUrl: "https://jewelry-supplier.com",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
  scrapeInterval: "daily",
  maxConcurrency: 5,
  timeout: 30000,
  exportFormat: "xlsx"
};

// API Services
export const apiService = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    // In a real app, this would be a fetch request to your backend
    return {
      totalProducts: 6248,
      lastScrapeTime: "32 min ago",
      failedProducts: 18,
      feedStatus: "Ready",
      categoryProgress: [
        { name: "Necklaces", value: 100, status: "completed" },
        { name: "Earrings", value: 100, status: "completed" },
        { name: "Rings", value: 84, status: "running" },
        { name: "Bracelets", value: 0, status: "idle" },
        { name: "Pendants", value: 0, status: "idle" }
      ]
    };
  },

  // Jobs
  getJobs: async (): Promise<ScrapingJob[]> => {
    // In a real app, this would be a fetch request to your backend
    return [...MOCK_JOBS];
  },

  getJobById: async (id: string): Promise<ScrapingJob | null> => {
    return MOCK_JOBS.find(job => job.id === id) || null;
  },

  startScrapeJob: async (): Promise<ScrapingJob> => {
    // In a real app, this would start a scraping job on the server
    const newJob: ScrapingJob = {
      id: `job_${Date.now()}`,
      startTime: new Date().toISOString(),
      status: "running",
      totalProducts: 0,
      errors: 0,
      categories: ["necklaces", "earrings", "rings", "bracelets", "pendants"]
    };
    
    // Simulate job being added to database
    // In a real app, this would be stored in your database
    
    return newJob;
  },

  // Reports
  getReports: async (): Promise<FeedReport[]> => {
    // In a real app, this would be a fetch request to your backend
    return [...MOCK_REPORTS];
  },

  getReportById: async (id: string): Promise<FeedReport | null> => {
    return MOCK_REPORTS.find(report => report.id === id) || null;
  },

  // Config
  getConfig: async (): Promise<ScrapingConfig> => {
    // In a real app, this would get the config from your backend
    return { ...DEFAULT_CONFIG };
  },

  updateConfig: async (config: Partial<ScrapingConfig>): Promise<ScrapingConfig> => {
    // In a real app, this would update the config on your backend
    console.info("Saving config:", { ...DEFAULT_CONFIG, ...config });
    return { ...DEFAULT_CONFIG, ...config };
  }
};
