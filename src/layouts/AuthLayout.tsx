import { Button } from "@/components/ui/button"
import { refreshTokenAsync } from "@/features/refreshTokenReducer";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"


const AuthLayout = () => {
  const dispatch:AppDispatch = useDispatch();

  const handleRefreshToken = async () => {
    try {
    //  const info =localStorage.getItem("authInfo");

      await dispatch(refreshTokenAsync()).unwrap();
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  return (
   <>
   <Button onClick={handleRefreshToken}>
    refresh
   </Button>
   <Outlet/>
   </>
  )
}

export default AuthLayout