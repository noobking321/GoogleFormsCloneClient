import { Routes, Route } from "react-router-dom";

import FillForm from "./layout/fillForm";
import Home from "./layout/formCreate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="viewform/:formId" element={<FillForm />} />
    </Routes>
  );
}

export default App;
