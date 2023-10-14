import {Home} from "./components/Home";
import {Blog} from "./components/Blog";
import React from "react";
import {About} from "./components/About";
import {Links} from "./components/Links";
import {Restaurants} from "./components/Restaurants";
import {Shopping} from "./components/Shopping";
import {Logout} from "./components/Auth/Logout";
import {Login} from "./components/Auth/Login";

const AppRoutes = [
  {
    index: true,
    element: <Home/>
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/logout",
    element: <Logout/>
  },
  {
    path: "/blog",
    element: <Blog/>
  },
  {
    path: "/links",
    element: <Links/>
  },
  {
    path: "/restaurants",
    element: <Restaurants/>
  },
  {
    path: "/shopping",
    element: <Shopping/>
  }
];

export default AppRoutes;
