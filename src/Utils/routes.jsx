import Dashboard from "../Containers/Dashboard/Dashboard.jsx";
// import Settings from "./Pages/Settings";
import Products from "../Containers/Products/Products";
import Categories from "../Containers/Categories/Categories";
import Users from "../Containers/Users/Users.jsx";
import Order from "../Containers/Orders/Order.jsx";
import CmsSetting from "../Containers/Cms-Setting/CmsSetting.jsx";
import { MdOutlineDashboard } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { FaProductHunt } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { AiFillBank } from "react-icons/ai";
import { RiLinksFill } from "react-icons/ri";
import { MdSettingsSuggest } from "react-icons/md";
import { TbSortAscendingLetters } from "react-icons/tb";
import { MdOutlineRateReview } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";

const routes = [
  {
    path: "/dashboard",
    element: Dashboard,
    label: "Dashboard",
    icon: <MdOutlineDashboard size={30} />,
  },
  {
    path: "/category",
    element: Categories,
    label: "Category",
    icon: <IoHomeOutline size={30} />,
  },
  {
    path: "/products",
    element: Products,
    label: "Products",
    icon: <RiProductHuntLine size={30} />,
  },
  {
    path: "/users",
    element: Users,
    label: "Users",
    icon: <FaRegUserCircle size={30} />,
  },
  {
    path: "/orders",
    element: Order,
    label: "Orders",
    icon: <IoCartOutline size={30} />,
  },
  {
    // path: "/settings",
    // element: Settings,
    label: "Mange Reviews",
    icon: <MdOutlineRateReview size={30} />,
  },
  {
    // path: "/settings",
    // element: Settings,
    label: "Add Product Deliver Charges",
    icon: <CiDeliveryTruck size={30} />,
  },
  {
    // path: "/settings",
    // element: Settings,
    label: "Change Feeature Prodcut",
    icon: <MdSettingsSuggest size={30} />,
  },
  {
    // path: "/settings",
    // element: Settings,
    label: "Change Prodcut Order",
    icon: <TbSortAscendingLetters size={30} />,
  },
  {
    path: "/cms",
    element: CmsSetting,
    label: "CMS Setting",
    icon: <CiSettings size={30} />,
  },
];

export default routes;
