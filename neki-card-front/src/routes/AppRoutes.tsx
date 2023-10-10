import { AuthContext } from "../contexts/authContext";
import { AdminRoutes } from "./AdminRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { useContext } from "react";

export function AppRoutes() {
  const { user } = useContext(AuthContext);
  console.log("ROUTES", user);
  return <>{user.id ? <AdminRoutes /> : <PublicRoutes />}</>;
}
