import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home/Home";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "./Routes/Dashboard/Dashboard";
import Cart from "./Routes/Cart/Cart";
import { UserProvider } from "./context/UserContext";
import Login from "./Routes/Login/Login";
import Signup from "./Routes/Signup/Signup";
import EmailVerify from "./Routes/EmailVerify/EmailVerify";
import ForgotPassword from "./Routes/ForgotPassword/forgotpassword";
import PasswordVerify from "./Routes/PasswordVerify/PasswordVerify";
import ResetPass from "./Routes/ResetPass/ResetPass";
import AdminNav from "./Components/AdminNavbar/AdminNav";
import AdminHome from "./Routes/AdminHome/AdminHome";
import AdminPizzaCard from "./Components/AdminPizzaCard/AdminPizzaCard";
import AdminPizzaDetails from "./Routes/AdminPizzaDetails/AdminPizzaDetails";
import AdminDashboard from "./Routes/Admin Dashboard/AdminDashboard";
import AdminPizzaVarities from "./Routes/AdminPizzaVarities/AdminPizzaVarities";
import AdminCreatePizza from "./Routes/AdminCreatePizza/AdminCreatePizza";
import CustomPizza from "./Routes/CustomPizza/CustomPizza";
import AdminAddStock from "./Routes/AdminAddStock/AdminAddStock";

library.add(faCartShopping);

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forpass" element={<ForgotPassword />} />
        <Route path="/forpass/:id/verify/:token" element={<PasswordVerify />} />
        <Route path="/resetpass" element={<ResetPass />} />

        <Route path="/adminhome" element={<AdminHome />}>
          <Route index element={<AdminDashboard />} />
          <Route path="adminpizzavarities" element={<AdminPizzaVarities />} />
          <Route path="admincreatepizza" element={<AdminCreatePizza />} />
          <Route
            path="adminpizzadetails/:pizzaid"
            element={<AdminPizzaDetails />}
          />
          <Route path="adminaddstock" element={<AdminAddStock />} />
        </Route>

        <Route path="/home" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="cart" element={<Cart />} />
          <Route path="custompizza" element={<CustomPizza />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
