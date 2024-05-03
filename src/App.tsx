import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import TableComponent from "./components/TableComponent/TableComponent";
import FormComponent from "./components/FormComponent/FormComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InfoComponent from "./InfoComponent/InfoComponent";

function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        <div className="mainWrapper">
          <Routes>
            <Route path="/" element={<TableComponent />} />
            <Route path="/viewchallenges" element={<FormComponent />} />
            <Route path="/info" element={<InfoComponent />} />
            <Route path="*" element={<div>Page not found!</div>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
