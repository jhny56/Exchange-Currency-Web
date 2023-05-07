import ExchangeCurrency from "./components/ExchangeCurrency";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Registration />} path="/"></Route>
        <Route element={<Login />} path="/Login"></Route>
        <Route element={<ExchangeCurrency />} path="/Exchange"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
