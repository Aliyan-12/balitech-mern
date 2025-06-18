import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../Pages/index';
import HomePage from '../Pages/HomePage';
import FAQ from '../components/FAQ/FAQ';
import Contact from '../components/Contact/Contact';
import About from '../components/About/About';
import Services from '../components/Services/Services';
import Careers from '../Pages/Careers';
import Dashboard from '../Pages/Admin/Dashboard';
import Login from '../Pages/Admin/Login';
import ProtectedRoute from '../components/ProtectedRoute';
// import Pricing from '../components/Pricing/Pricing';
// import WhyUs from '../components/WhyUs/WhyUS';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><HomePage /></MainLayout>,
  },
  {
    path: '/about',
    element: <MainLayout><About /></MainLayout>,
  },
  {
    path: '/services',
    element: <MainLayout><Services /></MainLayout>,
  },
  {
    path: '/contact',
    element: <MainLayout><Contact /></MainLayout>,
  },
  {
    path: '/faq',
    element: <MainLayout><FAQ /></MainLayout>,
  },
  {
    path: '/careers',
    element: <MainLayout><Careers /></MainLayout>,
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  }
]);

export default router;