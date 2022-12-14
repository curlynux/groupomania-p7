import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/login";
import Error from "./components/error";
import Home from "./components/home";
import PrivateRoote from "./components/privateRoote";
import DisplayOnePost from "./components/post";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<PrivateRoote />}>
          <Route exact path="/home" element={<Home />} />
          <Route path="/post/:id" element={<DisplayOnePost />} />
        </Route>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
