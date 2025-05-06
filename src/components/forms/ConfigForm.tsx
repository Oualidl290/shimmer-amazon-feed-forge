
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function ConfigForm() {
  const [selectedTab, setSelectedTab] = useState("general");
  
  return (
    <Tabs defaultValue="general" className="w-full" onValueChange={setSelectedTab}>
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="selectors">Selectors</TabsTrigger>
        <TabsTrigger value="amazon">Amazon Feed</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Configuration</CardTitle>
            <CardDescription>
              Configure the base settings for the web scraper
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="baseUrl">Supplier Website Base URL</Label>
              <Input
                id="baseUrl"
                placeholder="https://www.supplier-jewelry-website.com"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userAgent">User Agent</Label>
              <Input
                id="userAgent"
                placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) ..."
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">The user agent string helps mimic a browser request</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requestDelay">Request Delay (seconds)</Label>
                <Input
                  id="requestDelay"
                  type="number"
                  defaultValue={2}
                  min={0}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxRetries">Max Retries</Label>
                <Input
                  id="maxRetries"
                  type="number"
                  defaultValue={3}
                  min={1}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product Categories</Label>
              <div className="border rounded-md p-3 space-y-2">
                <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md">
                  <Switch id="category-jewelry" defaultChecked />
                  <Label htmlFor="category-jewelry" className="flex-grow">/jewelry</Label>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Add Category
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Test Connection</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="selectors">
        <Card>
          <CardHeader>
            <CardTitle>CSS Selectors</CardTitle>
            <CardDescription>
              Configure the CSS selectors used to extract product data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="productLinks">Product Links</Label>
                <Input
                  id="productLinks"
                  placeholder=".product-item a.product-link"
                />
                <p className="text-xs text-muted-foreground">Selector for product links on category pages</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pagination">Pagination</Label>
                <Input
                  id="pagination"
                  placeholder=".pagination a.next"
                />
                <p className="text-xs text-muted-foreground">Selector for the "next page" link</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productTitle">Product Title</Label>
                <Input
                  id="productTitle"
                  placeholder=".product-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productSku">Product SKU</Label>
                <Input
                  id="productSku"
                  placeholder=".product-sku"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productPrice">Product Price</Label>
                <Input
                  id="productPrice"
                  placeholder=".product-price"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockStatus">Stock Status</Label>
                <Input
                  id="stockStatus"
                  placeholder=".stock-status"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productDescription">Product Description</Label>
                <Input
                  id="productDescription"
                  placeholder=".product-description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productImages">Product Images</Label>
                <Input
                  id="productImages"
                  placeholder=".product-gallery img"
                />
              </div>
            </div>

            <div className="pt-4">
              <Label htmlFor="testSelector">Test Selector</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="testSelector"
                  placeholder="Enter a CSS selector to test"
                  className="flex-1"
                />
                <Button>Test</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="amazon">
        <Card>
          <CardHeader>
            <CardTitle>Amazon Feed Settings</CardTitle>
            <CardDescription>
              Configure the Amazon product feed output format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="brandName">Brand Name</Label>
                <Input id="brandName" placeholder="Your Brand" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultQuantity">Default Quantity</Label>
                <Input id="defaultQuantity" type="number" defaultValue={10} />
                <p className="text-xs text-muted-foreground">Default quantity for in-stock items</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weightUnit">Weight Unit</Label>
                <Input id="weightUnit" defaultValue="GR" />
                <p className="text-xs text-muted-foreground">Unit of measure for weight (GR, OZ, etc.)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productIdType">Product ID Type</Label>
                <Input id="productIdType" defaultValue="1" />
                <p className="text-xs text-muted-foreground">1 for ASIN, 2 for ISBN, 3 for UPC, 4 for EAN</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conditionType">Condition Type</Label>
              <Input id="conditionType" defaultValue="New" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="columnMapping">Amazon Feed Column Mapping</Label>
              <textarea 
                id="columnMapping" 
                rows={4}
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                defaultValue={`sku=sku, product-id=sku, product-id-type=1, title=title, product-type=jewelry, brand=Your Brand`}
              />
              <p className="text-xs text-muted-foreground">Map scraped data fields to Amazon feed columns</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule">
        <Card>
          <CardHeader>
            <CardTitle>Scheduling</CardTitle>
            <CardDescription>
              Configure automatic scheduling for the scraper
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch id="enableSchedule" />
              <Label htmlFor="enableSchedule">Enable Automatic Scheduling</Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <select 
                  id="frequency"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input id="startTime" type="time" defaultValue="02:00" />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Notification Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="emailSuccess" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                  <Label htmlFor="emailSuccess" className="text-sm">Email on successful completion</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="emailFailure" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                  <Label htmlFor="emailFailure" className="text-sm">Email on failure or errors</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="dailyReport" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" defaultChecked />
                  <Label htmlFor="dailyReport" className="text-sm">Daily summary report</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailRecipients">Email Recipients</Label>
              <Input
                id="emailRecipients"
                placeholder="email1@example.com, email2@example.com"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
