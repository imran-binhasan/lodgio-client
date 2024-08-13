import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Rooms from "../pages/Rooms/Rooms";
import MyBookings from "../pages/MyBookings/MyBookings";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Auth from "../layouts/Auth";



const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
        path: '/mybookings',
        element: <MyBookings/>
      },
    ],
  },
  {
    path:'/auth',
    element:<Auth/>,
    children:[
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
]);

export default Router;