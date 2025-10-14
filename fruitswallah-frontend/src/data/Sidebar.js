import {
  Package,
  User,
  Lock,
  CreditCard,
  MapPin,
  LogOut,
} from "lucide-react";
import { BsChatText } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { PiUsersFourFill } from "react-icons/pi";
import { href } from "react-router-dom";


export const sidebarItems = [
  { icon: Package, label: "View orders", href: "/orders" },
  {
    icon: User,
    label: "Personal details",
    href: "/profile",
  },
  {
    icon: Lock,
    label: "Change password",
    href: "/changePassword",
  },
  { icon: CreditCard, label: "Payment methods", href: "/payment" },
  { icon: MapPin, label: "Manage addresses", href: "/address" },
  { icon: LogOut, label: "Log out", href: "/logOut" },
];

export const adminSidebarItems = [
  {
    label: "Dashboard",
    href: "/FruitsWallahAdmin",
    icon: IoStatsChartSharp,
  },
  { label: "View orders", href: "/FruitsWallahAdmin/orders", icon: Package },
  {
    label: "Manage Products",
    href: "/FruitsWallahAdmin/products",
    icon: FaEdit,
  },
  {
    label: "Manage Admins",
    href: "/FruitsWallahAdmin/users",
    icon: PiUsersFourFill,
  },
  {
    icon: BsChatText,
    label: "Chat Support",
    href: "/FruitsWallahAdmin/AdminChatSupportPage",
  },
  { icon: LogOut, label: "Log out", href: "/logOut" },

  // Add more items as needed
];