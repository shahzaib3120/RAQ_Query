// src/router/index.tsx
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/Login";
import BookDetails from "../pages/BookDetails";

import { useLocation } from "react-router";

const ScrollToTop = (props: { children: any }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/book/:id" Component={BookDetails} />
          <Route path="/about" Component={About} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Router;
