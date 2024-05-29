
interface INavbarData {
    name:string,
    path:string
}

 const navbarData:INavbarData[] = [
    {
        name:"Home",
        path:"/"
    },
    {
        name:"About",
        path:"/about",

    },
    {
        name:"Books",
        path:"/books",
    },
    {
        name:"Dashboard",
        path:"/dashboard",
    }
] 

export {navbarData};