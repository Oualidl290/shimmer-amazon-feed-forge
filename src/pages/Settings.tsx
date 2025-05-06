
import SideNav from "@/components/layout/SideNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [amazonSettings, setAmazonSettings] = useState({
    merchantId: "A2EXAMPLE123",
    marketplaceId: "ATVPDKIKX0DER",
    authToken: "amzn.mws.123456-abcd-efgh-ijkl-mnopqrstuvwx",
    defaultCategory: "jewelry"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    emailAddress: "user@example.com",
    slackEnabled: false,
    slackWebhook: ""
  });

  const handleSaveAmazon = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the Amazon settings
    toast({
      title: "Amazon settings saved",
      description: "Your Amazon integration settings have been updated"
    });
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the notification settings
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated"
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <SideNav />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          
          <div className="space-y-8">
            {/* Amazon Integration Settings */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4">Amazon Integration</h2>
              <form onSubmit={handleSaveAmazon} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="merchantId">Amazon Merchant ID</Label>
                    <Input 
                      id="merchantId"
                      value={amazonSettings.merchantId}
                      onChange={(e) => setAmazonSettings({...amazonSettings, merchantId: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="marketplaceId">Marketplace ID</Label>
                    <Input 
                      id="marketplaceId"
                      value={amazonSettings.marketplaceId}
                      onChange={(e) => setAmazonSettings({...amazonSettings, marketplaceId: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="authToken">Authentication Token</Label>
                  <Input 
                    id="authToken"
                    type="password"
                    value={amazonSettings.authToken}
                    onChange={(e) => setAmazonSettings({...amazonSettings, authToken: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultCategory">Default Category</Label>
                  <select 
                    id="defaultCategory"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={amazonSettings.defaultCategory}
                    onChange={(e) => setAmazonSettings({...amazonSettings, defaultCategory: e.target.value})}
                  >
                    <option value="jewelry">Jewelry</option>
                    <option value="watches">Watches</option>
                    <option value="fashion">Fashion</option>
                  </select>
                </div>
                
                <Button type="submit">Save Amazon Settings</Button>
              </form>
            </div>
            
            {/* Notification Settings */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <form onSubmit={handleSaveNotifications} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="emailEnabled"
                    checked={notificationSettings.emailEnabled}
                    onChange={(e) => setNotificationSettings({...notificationSettings, emailEnabled: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <Label htmlFor="emailEnabled">Email Notifications</Label>
                </div>
                
                {notificationSettings.emailEnabled && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="emailAddress">Email Address</Label>
                    <Input 
                      id="emailAddress"
                      type="email"
                      value={notificationSettings.emailAddress}
                      onChange={(e) => setNotificationSettings({...notificationSettings, emailAddress: e.target.value})}
                    />
                  </div>
                )}
                
                <div className="flex items-center space-x-2 pt-2">
                  <input 
                    type="checkbox" 
                    id="slackEnabled"
                    checked={notificationSettings.slackEnabled}
                    onChange={(e) => setNotificationSettings({...notificationSettings, slackEnabled: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <Label htmlFor="slackEnabled">Slack Notifications</Label>
                </div>
                
                {notificationSettings.slackEnabled && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
                    <Input 
                      id="slackWebhook"
                      value={notificationSettings.slackWebhook}
                      onChange={(e) => setNotificationSettings({...notificationSettings, slackWebhook: e.target.value})}
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>
                )}
                
                <Button type="submit">Save Notification Settings</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
