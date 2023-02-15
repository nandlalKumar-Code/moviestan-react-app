import React from "react";
import { Container } from "@mui/system";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Movies from "./components/Pages/Movies/Movies";
import Series from "./components/Pages/Series/Series";
import Trending from "./components/Pages/Trending/Trending";
import Searches from "./components/Pages/Searches/Searches";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path ='/' element={<Trending/>} />
            <Route path ='/Searches' element={<Searches/>} />
            <Route path ='/Movies' element={<Movies/>} />
            <Route path ='/Series' element={<Series/>} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
