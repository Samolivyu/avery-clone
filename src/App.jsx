import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products.jsx";
import Services from "./pages/Services.jsx";
import Login from "./components/LoginForm.jsx";
import PinEntryForm from "./components/PinEntryForm.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx"; 
import { TooltipProvider } from '@radix-ui/react-tooltip'; 
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

const App = () => {
  //Added a success handler to demonstrate login success
  const handleSuccess = () =>{
    console.log("Login successful");
  }
 
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products  />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login onSuccess={handleSuccess} />} />
          <Route path="/pin" element={<PinEntryForm onSuccess={handleSuccess} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer /> 
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
};

export default App;