import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
const AndroidLargeOne = React.lazy(() => import("pages/AndroidLargeOne"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/androidlargeone" element={<AndroidLargeOne />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
