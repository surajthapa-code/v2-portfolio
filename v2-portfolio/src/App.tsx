import { Route, Routes } from "react-router-dom";
import "./App.css";

import MainPage from "./pages/MainPage";
import Layout from "./components/Layout";
import Skills from "./components/Skills";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/skills" element={<Skills />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
