import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import HomeIcon from "@mui/icons-material/Home";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import SettingsIcon from "@mui/icons-material/Settings";
const routes = [
  {
    path: "/",
    content: "Home",
    icon: <HomeIcon />,
  },
  {
    path: "/orders",
    content: "Orders",
    icon: <LocalGroceryStoreIcon />,
  },
  {
    path: "/clients",
    content: "Clients",
    icon: <PeopleAltIcon />,
  },
  {
    path: "/marketing",
    content: "SMS marketing",
    icon: <ForwardToInboxIcon />,
  },
  {
    path: "/settings",
    content: "Settings",
    icon: <SettingsIcon />,
  },
  {
    path: "/service",
    content: "Service",
    icon: <LocalPostOfficeIcon />,
  },
];

export default routes;
