import { IconType } from "react-icons/lib";
import { FaHome, FaEnvelope, FaCog, FaBook } from "react-icons/fa";

interface IDashboardSidebar {
  name: string;
  icon: IconType;
  path: string;
}

const dashboardSidebar: IDashboardSidebar[] = [
  {
    name: "Home",
    icon: FaHome,
    path: "/dashboard",
  },
  {
    name: "Mails",
    icon: FaEnvelope,
    path: "/dashboard/mails",
  },
  {
    name: "Book",
    icon: FaBook,
    path: "/dashboard/books",
  },
  {
    name: "Settings",
    icon: FaCog,
    path: "/dashboard/settings",
  },
];

export default dashboardSidebar;
