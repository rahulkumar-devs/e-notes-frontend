
import {
    FaChartLine,
    FaUsers,
    FaShoppingCart,
    FaUserCheck,
  } from "react-icons/fa";
  
  import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  const DashboardOverview = () => {
    return (
      <div className="container mx-auto mt-12 p-4 md:p-8 lg:p-12">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white shadow-md rounded-lg p-4">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <FaChartLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardTitle className="text-2xl font-bold">$45,231.89</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              +20.1% from last month
            </CardDescription>
          </Card>
  
          <Card className="bg-white shadow-md rounded-lg p-4">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <FaUsers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardTitle className="text-2xl font-bold">+2350</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              +180.1% from last month
            </CardDescription>
          </Card>
  
          <Card className="bg-white shadow-md rounded-lg p-4">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <FaShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardTitle className="text-2xl font-bold">+12,234</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              +19% from last month
            </CardDescription>
          </Card>
  
          <Card className="bg-white shadow-md rounded-lg p-4">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <FaUserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardTitle className="text-2xl font-bold">+573</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              +201 since last hour
            </CardDescription>
          </Card>
        </div>
      </div>
    );
  };
  
  export default DashboardOverview;
  