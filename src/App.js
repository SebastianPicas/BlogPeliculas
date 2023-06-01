import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, BlogPost, BlogList, FavoriteView, WaitView } from './Components';
import "./App.css";
import { context } from './Components/Context';
import { getFromFirebaseTop } from './Components/BlogList';


function App() {
  const [movieList,setMovieList] =useState([]);
  const [movieListWatch,setMovieListWatch] =useState([]);

  useEffect(() =>{
    const fetchData = async() =>{
      const results = await getFromFirebaseTop('My Favorite Movie Collection', 5);
      setMovieList(results);
    };

    const fetchDataWatch = async() =>{
      const results = await getFromFirebaseTop('My Watchlist Collection', 5);
      setMovieListWatch(results);
    };

    fetchDataWatch();
    fetchData();
  },[]);

  const providerValues = movieList;
  const providerValuesWatch = movieListWatch;

  return (
    <React.Fragment>
      <context.Provider value = {[providerValues, providerValuesWatch]}>
        <Navbar/>
        <Routes>
          <Route path="/FavoriteView" element={<FavoriteView/>}/>
          <Route path="/WaitView" element={<WaitView/>}/>
          <Route path="/BlogPost" element={<BlogPost/>}/>
          <Route path="/BlogList" element={<BlogList/>}/>
        </Routes>
      </context.Provider>
    </React.Fragment>
  );
}

export default App;