import { Button } from "@/components/ui/button"


import { Outlet } from "react-router-dom"


const AuthLayout = () => {
  // const dispatch:AppDispatch = useDispatch();




  return (
   <>
   <Button >
    refresh
   </Button>
   <Outlet/>
   </>
  )
}

export default AuthLayout