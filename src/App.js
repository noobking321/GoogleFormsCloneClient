import { Routes, Route } from "react-router-dom";

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
  return (
    <>
      <Navigationbar />
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
