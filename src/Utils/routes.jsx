import { MdOutlineDashboard } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { MdSettingsSuggest } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { AiOutlineBank } from "react-icons/ai";
import { CiLink } from "react-icons/ci";
import Dashboard from "../Containers/Dashboard/Dashboard.jsx";
import Products from "../Containers/Products/ProductList/Products.jsx";
import Categories from "../Containers/Categories/CategoriesList/Categories.jsx";
import Users from "../Containers/Users/Users.jsx";
import Order from "../Containers/Orders/Order.jsx";
import CmsSetting from "../Containers/Cms-Setting/CmsSetting.jsx";
import Invoice from "../Containers/Orders/Invoice.jsx/Invoice.jsx";
import UserView from "../Containers/Users/UserView/UserView.jsx";
import Review from "../Containers/Reviews/review.jsx";
import ProductDeliveryCharges from "../Containers/ProductDeliveryCharges/ProductDeliveryCharges.jsx";
import CategoryView from "../Containers/Categories/CategoriesView/CategoryView.jsx";
import ProductView from "../Containers/Products/ProductView/ProductView.jsx";
import CategoriesProducts from "../Containers/Categories/CategoriesDetails/CategoriesProducts.jsx";
import BankAccount from "../Containers/BankAccount/BankAccount.jsx";
import VerifyPayments from "../Containers/Orders/VerifyPayments/VerifyPayments.jsx";
import UtmLinks from "../Containers/UtmLinks/UtmLinks.jsx";
import Profile from "../Containers/Profile/Profile.jsx";

const routes = [
  {
    path: "/dashboard",
    element: Dashboard,
    label: "Dashboard",
    icon: <MdOutlineDashboard size={30} />,
  },
  {
    path: "/profile",
    element: Profile,
    visible: false,
  },
  {
    path: "/category",
    element: Categories,
    label: "Category",
    icon: <IoHomeOutline size={30} />,
    visible: true,
  },
  {
    path: "/category/view",
    element: CategoryView,
    label: "Category",
    icon: <IoHomeOutline size={30} />,
    visible: false,
  },
  {
    path: "/category/view/products",
    element: CategoriesProducts,
    label: "Category",
    icon: <IoHomeOutline size={30} />,
    visible: false,
  },
  {
    path: "/products",
    element: Products,
    label: "Products",
    icon: <RiProductHuntLine size={30} />,
  },
  {
    path: "/products/view",
    element: ProductView,
    label: "Products",
    visible: false,
  },
  {
    path: "/users",
    element: Users,
    label: "Users",
    icon: <FaRegUserCircle size={30} />,
  },
  {
    path: "/users/view",
    element: UserView,
    label: "Users",
    icon: <FaRegUserCircle size={30} />,
    visible: false,
  },
  {
    path: "/orders",
    element: Order,
    label: "Orders",
    icon: <IoCartOutline size={30} />,
    hidden: true,
  },
  {
    path: "/orders/invoice",
    element: Invoice,
    label: "Invoice",
    icon: <CiDeliveryTruck size={30} />,
    visible: false,
  },
  {
    path: "/orders/verify-payment",
    element: VerifyPayments,
    label: "Invoice",
    icon: <CiDeliveryTruck size={30} />,
    visible: false,
  },
  {
    path: "/reviews",
    element: Review,
    label: "Mange Reviews",
    icon: <MdOutlineRateReview size={30} />,
  },
  {
    path: "/bank-account-details",
    element: BankAccount,
    label: "Add Bank Account",
    icon: <AiOutlineBank size={30} />,
  },
  {
    path: "/product-delivery-charges",
    element: ProductDeliveryCharges,
    label: "Add Product Delivery Charges",
    icon: <CiDeliveryTruck size={30} />,
  },
  // {
  //   path: "/feature-product",
  //   element: Settings,
  //   label: "Change Feeature Prodcut",
  //   icon: <MdSettingsSuggest size={30} />,
  // },
  {
    path: "/social-links",
    element: UtmLinks,
    label: "Generate Social Links",
    icon: <CiLink size={30} />,
  },
  {
    path: "/cms",
    element: CmsSetting,
    label: "CMS Setting",
    icon: <CiSettings size={30} />,
  },
];

export default routes;
