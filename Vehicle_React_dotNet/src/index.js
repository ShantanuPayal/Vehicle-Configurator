import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import DefaultInvoiceGenerator from "./components/DefaultInvoiceGenerator";
import AlternateModifier from "./components/AlternateModifier";
import { Configurator } from "./components/configurator";
import InvoiceGenerator from "./components/InvoiceGenerator";
import SendInvoiceViaEmail from "./components/SendInvoiceViaEmail";
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/Configurator" element={<Configurator />}></Route>
        <Route
          path="/DefaultInvoiceGenerator"
          element={<DefaultInvoiceGenerator />}
        ></Route>
        <Route
          path="/AlternateModifier"
          element={<AlternateModifier />}
        ></Route>
        <Route path="/InvoiceGenerator" element={<InvoiceGenerator />}></Route>
        <Route path="/SendInvoiceViaEmail" element={<SendInvoiceViaEmail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
