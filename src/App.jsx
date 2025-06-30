import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { authManager } from "./utils/auth";
import Products from "./pages/Products.jsx";
import Services from "./pages/Services.jsx";
import LoginForm from "./components/LoginForm.jsx";
import PinEntryForm from "./components/PinEntryForm.jsx";
import NotFound from "./pages/NotFound.jsx";
import TimeLogger from "./components/TimeLogger.jsx"; // Add this import
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx"; 
import { TooltipProvider } from '@radix-ui/react-tooltip'; 
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }) => {
  if (!authManager.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/services" element={<Services />} />
      <Route 
        path="/time-logger" 
        element={
          <ProtectedRoute>
            <TimeLogger />
          </ProtectedRoute>
        } 
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/pin" element={<PinEntryForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;