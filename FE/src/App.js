import React from "react";

import Footer from "./layout/Footer";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Home from "./pages/home/Home";
import CitiesPage from "./pages/cities/citiesPage";
import GuiedsPage from "./pages/Guides/GuidesPage";
import AboutPage from "./pages/About/About";
import ContactPage from "./pages/Contacts/ConntactsPage";
import LoginForm from "./pages/Login&singup/LoginForm";
import SingUpForm from "./pages/Login&singup/SingUpForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme/theme";
import City from "./pages/cities/City/City";

import "./App.css";
import Layout from "./layout/Layout";
import Cities from "./pages/admin/cities/Cities";
import Opiontments from "./pages/admin/opointments/Opiontments";
import Guides from "./pages/admin/guides/Guides";
import Restruanats from "./pages/admin/restraunats/Restraunats";
import Hotels from "./pages/admin/hotels/Hotels";
import Places from "./pages/admin/places/Places";
import TouristPro from "./pages/tourist/TouristPro";
import GuideProfile from "./pages/Guide/GuideProfile";
import Culture from './pages/Culture/Culture';
import EditForm from "./pages/Login&singup/EditForm";
// import 

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CitiesPage" element={<CitiesPage />} />
          <Route path="/dashboard">
            <Route path="/dashboard/cities" element={<Cities />} />
            <Route path="/dashboard/opointments" element={<Opiontments />} />
            <Route path="/dashboard/guides" element={<Guides />} />
            <Route path="/dashboard/restaurants" element={<Restruanats />} />
            <Route path="/dashboard/hotels" element={<Hotels />} />
            <Route path="/dashboard/places" element={<Places />} />
          </Route>
          <Route path="/GuiedsPage" element={<GuiedsPage />} />
          <Route path="/ContactsPage" element={<ContactPage />} />
          <Route path="/Abotus" element={<AboutPage />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/SignUp" element={<SingUpForm />} />
          <Route path="/EditForm" element={<EditForm/>} />
          <Route path="/cities/:id" element={<City />} />
          <Route path="/tourist" element={<TouristPro />} />
          <Route path="/guide" element={<GuideProfile />} />
          <Route path="/Culture" element={<Culture/>} />
        </Routes>
        {/* </Layout> */}
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
