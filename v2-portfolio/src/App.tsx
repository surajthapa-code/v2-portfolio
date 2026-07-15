import { Route, Routes } from "react-router-dom";
import "./App.css";

import MainPage from "./pages/MainPage";
import Layout from "./components/Layout";
import SkillsPage from "./pages/SkillsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/SkillsPage" element={<SkillsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
