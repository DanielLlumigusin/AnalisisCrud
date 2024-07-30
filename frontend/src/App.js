import React from "react";
import CreateTask from "./screen/CreateTask.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./screen/Navbar.js";
import Home from "./screen/Home.js";
import Login from "./screen/Login.js";
import Registro from "./screen/Registro.js";
import ProtectedRoute from "./controller/protectedRoute.js";
import "./App.css";
function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/crear-tarea"
                    element={
                        <ProtectedRoute>
                            <CreateTask />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
