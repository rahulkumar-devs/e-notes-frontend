import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface RootLayoutProps {
  allowRoles: Array<"admin" | "user" | "member">;
}

// interface IUser {
//   user: {
//     role: Array<"admin" | "user" | "member">; 
//   };
//   accessToken: string;
// }

const ProtectedLayout = ({ allowRoles }: RootLayoutProps) => {
  const {user,roles} = useSelector((state: RootState) => state.persisted.auth);

  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  const userRoles = roles;

  const hasRequiredRole = userRoles.find(role=>allowRoles.includes(role))

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;