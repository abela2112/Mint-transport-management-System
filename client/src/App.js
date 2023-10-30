
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register/index";
import Login from "./pages/Login/index";
import Request from "./pages/Request";
function App() {
  return (
    <>
      <Routes>
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request" element={<Request />}/>
      </Routes>
    </>
  );
}

export default App;