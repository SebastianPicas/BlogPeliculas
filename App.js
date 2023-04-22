import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, BlogPost, BlogList, FavoriteView, WaitView } from './Components';
import "./App.css";


function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route path="/WaitView" element={<WaitView/>}/>
        <Route path="/FavoriteView" element={<FavoriteView/>}/>
        <Route path="/BlogPost" element={<BlogPost/>}/>
        <Route path="/BlogList" element={<BlogList/>}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;