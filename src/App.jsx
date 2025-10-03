import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Reservation from "./components/reservation/Reservation";
import ErrorNotFound from "./components/errorNotFound/ErrorNotFound";
import Sales from "./components/sales/Sales";
import Services from "./components/services/Services";
import AboutUs from "./components/aboutUs/aboutUs";
import Reviews from "./components/reviews/Reviews";
import Rooms from "./components/rooms/Rooms";
import Footer from "./components/footer/Footer";
import Admin from "./components/admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="*" element={<ErrorNotFound />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
