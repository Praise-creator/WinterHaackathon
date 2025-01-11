import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Container from "./components/Container";
import Form from "./components/Form";

const MyRoutes = () =>{ 
   return (
        <BrowserRouter>
            <Routes>
                <Route exact path ='/' element={<Home />} />
                <Route exact path ='/upload' element={<Container />} />
                <Route exact path ='/form' element={<Form />} />
            </Routes>
        </BrowserRouter>
    );
}; 

export default MyRoutes;