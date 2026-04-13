import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";

import Companies from "./components/Companies";
import DriveDetails from "./components/DriveDetails";
import AddCompany from "./components/AddCompany";
import Profile from "./components/Profile";
import AdminPlacements from "./components/AdminPlacements";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/companies" element={<Companies />} />
        <Route path="/student/drive/:id" element={<DriveDetails />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-company" element={<AddCompany />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/admin/placements" element={<AdminPlacements />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;