import UserContext from "@/contexts/UserContext/UserContext";
import { useContext } from "react";

const RoleWrapper = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  return (!allowedRoles || allowedRoles?.includes(user?.role)) && children;
};

export default RoleWrapper;
