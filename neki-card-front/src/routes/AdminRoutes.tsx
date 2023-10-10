import { Route, Routes } from "react-router-dom";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home/Home";
import { EditCollaborator } from "../pages/Edit";
import { Collaborator } from "../pages/Collaborator";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit/:id" element={<EditCollaborator />} />
      <Route path="/collaborator/:id" element={<Collaborator />} />
      <Route path="/newCollaborator" element={<Register />} />
    </Routes>
  );
}
