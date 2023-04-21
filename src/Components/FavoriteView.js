import "./FavoriteView.css";
import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase';

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

const FavoriteView = () => {
    return (
        <div>
            <h1>Peliculas Favoritas</h1>
            <button onClick={() => addFavorite("Favorite 1", "Description 1")}>Add Favorite 1</button>
        </div>
    )
};
export {FavoriteView};