import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase';

function BlogList(){
    const API_URL = 'https://api.themoviedb.org/3'
    const API_KEY = '459fd228326f5c767bf19d219e4acf26'
    const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

    const[Movies, setMovies] = useState([])
    const[, setMovie] = useState({ title: "Loading Movie"})

    const fetchMovies = async(searchKey) => {
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

    }

    useEffect(()=>{
        fetchMovies();
    })

    const addFavorite = async(name, description) => {
        try{
            const docRef = await addDoc(collection(db,"Favorites"),{
                name: name,
                description: description
            });
            console.log("document written with id", docRef.id);
        }catch(e){
            console.error("Error abriendo el documento", e);
        }
    };

    return (
        <div>
            <div className='container mt-3'>
                <div className="row">
                    {Movies.map((movie)=>(
                        <div key={movie.id} className="col-md-4 mb-3">
                        <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height= "90%" width="100%" />
                        <h4 className='text-center'>{movie.title}</h4>
                        <button class="btn_fav" onClick={() => addFavorite(movie.title, movie.id)}>Add Favorite</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
}


export {BlogList};