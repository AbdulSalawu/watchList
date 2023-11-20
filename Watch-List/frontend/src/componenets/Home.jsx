import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "./Card";
import CreateArea from "./CreateArea";
import { useNavigate } from "react-router-dom";
import PopUp from "./PopUp";

// home component
function Home(){
    const [movies, setMovies] = useState([])
    const navigate = useNavigate()
    const [popUpBool, setpopUpBool] = useState(false)
    const [currentId, setcurrentId] = useState(0)

    // Read Movies from backend
    useEffect(()=>{
        const fetchAllMovies = async () =>{
            try {
                const res = await axios.get("http://localhost:4000/top-ten")
                setMovies(res.data)
            } catch(err){
                console.log(err)
            }
        };
        fetchAllMovies();
    })
    
    // Add Movies to backend
    const addMovie = async (movie) => {
        console.log(movie)
        try {
            const addResponse = await axios.post("http://localhost:4000/addMovie", movie)
            if (addResponse.data != "200"){
                console.log(addResponse)
                alert(addResponse.data)
            }
        } catch(err){
            console.log(err)
        }
    }

    // Update Movies through backend
    const updateMovie = async (movie) => {
        console.log(movie)
        try {
            await axios.post("http://localhost:4000/updateMovie", movie)
        } catch(err){
            console.log(err)
        }
    }

    // Delete Movies from backend
    const deleteMovie = async (movie) => {
        console.log(movie)
        try {
            await axios.post("http://localhost:4000/deleteMovie", movie)
        } catch(err){
            console.log(err)
        }
    }

    // Toggle Pop Up
    function togglePopUp(id){
        setpopUpBool(!popUpBool)
        setcurrentId(id)
        console.log(id)
    }

    return(
        <div>
        <CreateArea 
            onAdd={addMovie}
        />
        <div class="row" style={{margin: "15px"}}>
            {movies.map((movie, index)=>(
                <Card
                    key={index}
                    id={index}
                    title={movie.title}
                    review={movie.review}
                    rating={movie.rating}
                    imageUrl={movie.imageUrl}
                    onShow={togglePopUp}
                    toggle={!popUpBool}
                />
            ))}
        </div>
        {popUpBool && (
        <PopUp
            trigger={popUpBool}
            title={movies[currentId].title}
            review={movies[currentId].review}
            status={movies[currentId].status} 
            rating={movies[currentId].rating}
            imageUrl={movies[currentId].imageUrl}
            onEdit={updateMovie}
            onDelete={deleteMovie}
            onClose={togglePopUp}
        />
        )}
        </div>
    );
}

export default Home;