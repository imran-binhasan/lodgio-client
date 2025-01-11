import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Rooms from "../pages/Rooms/Rooms";
import MyBookings from "../pages/MyBookings/MyBookings";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthLayout from "../layouts/AuthLayout";
import Gallery from "../pages/Gallery/Gallery";
import RoomDetails from "../pages/Rooms/RoomDetails";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/Error/NotFound";
import Contact from "../pages/Contact/Contact";



const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/rooms',
        element: <Rooms />
      },
      {
        path: '/bookings',
        element: <PrivateRoute><MyBookings/></PrivateRoute>
      },
      {
        path:'/gallery',
        element:<Gallery/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/room/:id',
        element:<RoomDetails/>,
        loader:({params})=>fetch(`https://lodgio-server.vercel.app/room/${params.id}`)
      }
      
    ],
  },
  {
    path:'/auth',
    element:<AuthLayout/>,
    children:[
      {
        path: "login",
        element: <PublicRoute><Login/></PublicRoute>
      },
      {
        path: "register",
        element: <PublicRoute><Register/></PublicRoute>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default Router;