
import { Navigate, Outlet, useLocation } from "react-router-dom";


interface RootLayoutProps {
  allowRoles: Array<"admin" | "user" | "member">;
}



interface User {
  user: {
    role: string[];
  };
  accessToken: string;
}


const RootLayout = ({ allowRoles }: RootLayoutProps) => {
  const fromLocalStorage = localStorage.getItem("authInfo");
  
  let localUser: User | null = null;

  try {
    localUser = fromLocalStorage ? JSON.parse(fromLocalStorage) : null;
  } catch (error) {
    console.error("Error parsing local storage item 'authInfo':", error);
  }


  const location = useLocation();

  console.log("localUser",localUser)

  if (!localUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  const hasRequiredRole = localUser.user.role.some(role => allowRoles.includes(role as "admin" | "user" | "member"));
  console.log(hasRequiredRole)

  if (!hasRequiredRole) {
    return <Navigate to="/unAuthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RootLayout;
