import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import MyAppointments from "./views/MyAppointments/MyAppointments";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Portal from "./views/Portal/Portal";
import Specialties from "./views/Specialties/Specialties";
import Studies from "./views/Studies/Studies";
import Footer from "./components/Footer/Footer";
import Coberturas from "./views/Coberturas/Coberturas";
import UserProfile from "./views/UserProfile/UserProfile";
function App() {

  return (
    <>
      <NavBar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/portal" element={<Portal/>}/>
        <Route path="/appointments" element={<MyAppointments/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/specialties" element={<Specialties/>}/>
        <Route path="/studies" element={<Studies/>}/>
        <Route path="/coberturas" element={<Coberturas/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
      </Routes>

      <Footer/>
    </>
  )
}

export default App
