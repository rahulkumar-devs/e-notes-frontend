import Navbar from "@/components/navbar/Navbar";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface RootLayoutProps {
  allowRoles: Array<"admin" | "user" | "member">;
}



const ProtectedLayout = ({ allowRoles }: RootLayoutProps) => {
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
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedLayout;
