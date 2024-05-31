
import { columns } from "../components/dashboardUser/Columns";
import { DataTable } from "../components/dashboardUser/DataTable";
import { useGetUserQuery } from "../dashboardApiInjector";
// import { useUserApiQuery } from "@/features/api/globalsApi";

const DashboardUsers = () => {
  const { data, error, isLoading } = useGetUserQuery();
console.log(data)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;


  const userData = data || [];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={userData.users} />
    </div>
  );
};

export default DashboardUsers;
