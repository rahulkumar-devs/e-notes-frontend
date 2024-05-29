import DashboardSidebar from "@/pages/dashboard/components/DashboardSidebar";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface RootLayoutProps {
  allowRoles: Array<"admin" | "user" | "member">;
}

const DashboardLayout = ({ allowRoles }: RootLayoutProps) => {
  const { user, roles } = useSelector((state: RootState) => state.auth);

  const location = useLocation();


  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  const hasRequiredRole = roles.find((role: "admin" | "user" | "member") =>
    allowRoles.includes(role)
  );

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  return (
    <>
      <div>
        <div className=" md:flex dark:bg-gray-900 dark:text-white">
          <DashboardSidebar />
          <div className=" max-h-screen overflow-y-scroll scroll-smooth overflow-hidden  w-full">
            <Outlet />
          </div>
        </div>
        <div>
          Footer Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Consequuntur sed inventore hic.
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
