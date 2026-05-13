import { Routes, Route } from "react-router-dom";
import HomeLayout from "./components/homeLayout";
import DashboardLayout from "./components/dashboardLayout";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import AddEvent from "./pages/addEvent";
import Login from "./components/forms/login/index";
import Signup from "./components/forms/signup/index";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/add-event" element={<DashboardLayout><AddEvent /></DashboardLayout>} />
          <Route path="/add-event/:id" element={<DashboardLayout><AddEvent /></DashboardLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    );
}

export default App;
