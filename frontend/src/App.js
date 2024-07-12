import React from "react";
import CreateTask from "./screen/CreateTask.js";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./screen/Navbar.js";
import Home from "./screen/Home.js";
function App() {



  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route path="/crear-tarea" element={<CreateTask />}></Route>
      <Route path={"/"} element={<Home />}></Route>
      <Route path={"/home"} element={<Home />}></Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
