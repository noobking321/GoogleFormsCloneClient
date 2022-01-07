import { Routes, Route } from "react-router-dom";
import Navigationbar from "./components/navigationbar";

import FillForm from "./layout/fillForm";
import FormCreate from "./layout/formCreate";
import Home from "./layout/home";
import Login from "./layout/login";
import Register from "./layout/register";

function App() {
  return (
    <>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="createform" element={<FormCreate />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="viewform/:formId" element={<FillForm />} />
      </Routes>
    </>
  );
}

export default App;
