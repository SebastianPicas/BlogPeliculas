import React, { useState, useEffect } from 'react';
import '../App.css';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';

function WaitView(){
    const URL_IMAGE = 'https://image.tmdb.org/t/p/original'

    const[Movies, setMovies] = useState([])

    const Wait = async () => {   
        const allRef = collection(db, "Por ver");   
        const Movies = []    
        try {     
            await getDocs(allRef).then((querySnapshot) => {       
                querySnapshot.docs.map((doc) => (         
                Movies.push(doc.data())));     
            });      
            console.log(Movies)  
            } catch (e) {     
                    console.log("Error getting Movies document:", e);   
                }   

            setMovies(Movies)
            }; 

            Wait();
    

    return (
        <div>
            <div className='container mt-3'>
                <div className="row">
                    {Movies.map((movie)=>(
                        <div key={movie.id} className="col-md-4 mb-3">
                        <img src={
                            `${URL_IMAGE + movie.poster_path}`} 
                            alt="" 
                            height= "90%" 
                            width="100%" />
                        <h4 className='text-center'>{movie.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
}

export {WaitView};
