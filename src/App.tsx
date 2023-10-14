import React from "react";
import {Route, Routes} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import {Layout} from "./components/Layout";
import "./custom.scss";
import {AuthProvider} from "./context/AuthContext";

const App = () => {

  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const {element, ...rest} = route;
            return <Route key={index} {...rest} element={element}/>;
          })}
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
