import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase';

function BlogPost(){
    const API_URL = 'https://api.themoviedb.org/3'
    const API_KEY = '459fd228326f5c767bf19d219e4acf26'
    const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

    const[Movies, setMovies] = useState([])
    const[searchKey, setSearchKey] = useState("")
    const[, setMovie] = useState({ title: "Loading Movie"})

    const fetchMovies = async() => {
        const type = searchKey ? "search" : "discover"
        const {data: {results},
        } = await axios.get(`${API_URL}/${type}/movie`, {
            params: {
                api_key: API_KEY,
                query: searchKey,
            },
        });

        setMovies(results)
        setMovie(results[0])
        
        if(results.length){
            await fetchMovie(results[0].id)
        }
    }
          
    const fetchMovie = async(id)=>{
        const {data: {results},
        } = await axios.get(`${API_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_responsive: "videos"
            },
        });
    }
          
          
    const searchMovies = (e)=>{
        e.preventDefault();
        fetchMovies(searchKey)
    }
    
    useEffect(()=>{
        fetchMovies();
    })

    const addFavorite = async(id, title, poster_path) => {
        try{
            const docRef = await addDoc(collection(db,"Favorites"),{
                id: id,
                title: title,
                poster_path: poster_path
            });
            console.log("document written with id", docRef.id);
        }catch(e){
            console.error("Error abriendo el documento", e);
        }
    };

    const addWait = async(id, title, poster_path) => {
        try{
            const docRef = await addDoc(collection(db,"Por ver"),{
                id: id,
                title: title,
                poster_path: poster_path
            });
            console.log("document written with id", docRef.id);
        }catch(e){
            console.error("Error abriendo el documento", e);
        }
    };

    return (
        <div>
            <br></br>
            <form className='container mb-4' onSubmit={searchMovies}>
                <input type="text" placeholder='search' onChange={(e)=> setSearchKey(e.target.value)}/>
                <button className='btn btn-primary'>Search</button>
            </form>
            <div className='container mt-3'>
                <div className="row">
                    {Movies.map((movie)=>(
                        <div key={movie.id} className="col-md-4 mb-3">
                            <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height= "90%" width="100%" />
                            <h4 className='text-center'>{movie.title}</h4>
                            <div className="buttons">
                                <button className="btn_fav" onClick={() => addFavorite(movie.id, movie.title, movie.poster_path)}>Add Favorite</button>
                                <button className="btn_wait" onClick={() => addWait(movie.id, movie.title, movie.poster_path)}>Add Watchlist</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export {BlogPost};