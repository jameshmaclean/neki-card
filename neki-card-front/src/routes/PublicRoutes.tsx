import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { Collaborator } from "../pages/Collaborator";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/collaborator/:id" element={<Collaborator />} />
    </Routes>
  );
}
