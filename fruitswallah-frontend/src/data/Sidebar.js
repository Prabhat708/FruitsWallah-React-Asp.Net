import {
  Package,
  User,
  Lock,
  CreditCard,
  MapPin,
  LogOut,
} from "lucide-react";

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
