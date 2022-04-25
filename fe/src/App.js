import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NameForm from "./pages/form";
import PenyakitForm from "./pages/formpenyakit";
import Layout from "./Layout";
import History from "./pages/history";
function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route path="/add-penyakit" element={<NameForm />} />
               <Route path="/add-test" element={<PenyakitForm />} />
               <Route path="/history" element={<History />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
