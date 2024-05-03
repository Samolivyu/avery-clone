import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About, Blog, Career, Contact, Home, Projects, Services } from "../components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/blog" element={<Blog/>} />
      </Routes>
    </div>
  );
}

export default App;