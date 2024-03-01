import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Configurator } from "./components/configurator";
import { Gallery } from "./components/gallery";
import AboutUs from "./AboutUs"; // Corrected import statement
import Auth from "./components/Auth"

import InvoiceGenerator from './components/InvoiceGenerator'; // Import InvoiceGenerator component
import AlternateModifier from './components/AlternateModifier'; // Import AlternateModifier component

import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { BrowserRouterLink, Outlet, Routes, Route } from "react-router-dom";
import ContactUs from "./ContactUs"; // Import the ContactUs component
import { AuthContext } from "./Contexts/AuthContext"
import { ResetContext } from "./Contexts/ResetContext";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  const [isLogged, setIsLogged] = useState(false);
  const [segmentSelectedTop, setSegmentSelectedTop] = useState(1);

  return (

    <div>
      {/* <Auth data={landingPageData.Auth} /> */}
      <ResetContext.Provider value={{ segmentSelectedTop, setSegmentSelectedTop }}>

        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
          <Navigation />
          <Header data={landingPageData.Header} />
          {isLogged ? <Configurator data={landingPageData.Configurator} /> : <Auth data={landingPageData.Auth} />}
        </AuthContext.Provider>

        <Outlet></Outlet>
        <Gallery data={landingPageData.Gallery} />
        <ContactUs/>
        <AboutUs />
      </ResetContext.Provider>
    </div>
  );
};

export default App;