import Dashboard from "../views/AdminDashboard.js";
import Notifications from "../views/Notifications.js";
import TableList from "../views/TableList.js";
import UserProfile from "../views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Admin Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "User Management",
    icon: "tim-icons icon-single-02",
    component: <TableList />,
    layout: "/admin",
  },
];
export default routes;
