import {  FaChartLine,
    FaUsers,
    FaShoppingCart,
    FaUserCheck,} from 'react-icons/fa'



const DashboardHome = () => {
  return (
    <div className="container mx-auto mt-12 p-4 md:p-8 lg:p-12">
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center justify-between pb-2">
          <span className="text-sm font-medium">Total Revenue</span>
          <FaChartLine className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center justify-between pb-2">
          <span className="text-sm font-medium">Subscriptions</span>
          <FaUsers className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">+2350</div>
        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center justify-between pb-2">
          <span className="text-sm font-medium">Sales</span>
          <FaShoppingCart className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">+12,234</div>
        <p className="text-xs text-muted-foreground">+19% from last month</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center justify-between pb-2">
          <span className="text-sm font-medium">Active Now</span>
          <FaUserCheck className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">+573</div>
        <p className="text-xs text-muted-foreground">+201 since last hour</p>
      </div>
    </div>
  </div>
  )
}

export default DashboardHome