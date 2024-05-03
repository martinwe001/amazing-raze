import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import InfoComponent from "./InfoComponent/InfoComponent";
import AdminFormComponent from "./components/AdminFormComponent/AdminFormComponent";
import FormComponent from "./components/FormComponent/FormComponent";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import TableComponent from "./components/TableComponent/TableComponent";

function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        <div className="mainWrapper">
          <Routes>
            <Route path="/" element={<FormComponent />} />
            <Route path="/leaderboard" element={<TableComponent />} />
            <Route path="/info" element={<InfoComponent />} />
            <Route path="/madsernub" element={<AdminFormComponent />} />
            <Route path="*" element={<div>Page not found!</div>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
