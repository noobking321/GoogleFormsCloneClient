import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SnowStorm from "react-snowstorm";

import Navigationbar from "./components/navigationbar";
import FillForm from "./layout/fillForm";
import FormCreate from "./layout/formCreate";
import Home from "./layout/home";
import Login from "./layout/login";
import MyForms from "./layout/myForms";
import NotFound from "./layout/notFound";
import Register from "./layout/register";
import Responses from "./layout/responses";

function App() {
  const html = document.querySelector("html");
  if (localStorage.getItem("darkMode")) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));
  return (
    <>
      <Navigationbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {darkMode && <SnowStorm />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="createform" element={<FormCreate />} />
        <Route exact path="myforms" element={<MyForms />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
        <Route exact path="viewform/:formId" element={<FillForm />} />
        <Route exact path="responses/:formId" element={<Responses />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
