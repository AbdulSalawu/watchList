import React, {useEffect, useState} from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Card from "./Card";
import PopUp from "./PopUp";

// search component
function Search(){
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredArray] = useState([])
    const [popUpBool, setpopUpBool] = useState(false)
    const [currentId, setcurrentId] = useState(0)
    const [startup, setStartup] = useState(true)

    // useEffect for getting json of movies from backend
    useEffect(()=>{
        const fetchAllMovies = async () =>{
            try {
                const res = await axios.get("http://localhost:4000/watch-list")
                setMovies(res.data)
            } catch(err){
                console.log(err)
            }
        };
        fetchAllMovies();
    })

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

    // filterCards for search 
    function filterCards(queryString){
        console.log(queryString)
        if (queryString === ""){
            console.log("here")
            console.log(movies)
            setFilteredArray(movies)
        }else{
           setFilteredArray(movies.filter(movie =>
            movie.title.toLowerCase().includes(queryString.toLowerCase())
        ))
        }
        
        console.log(filteredMovies)
    }
    
    // Makes sure all cards showup on startup
    function doStartup(){
        if (startup) {
            filterCards("")
            setStartup(!startup)
        }
    }
    setTimeout(doStartup, 500);
    
    return(
        <div>
        <SearchBar
            onChange={filterCards}
        />
        <div class="row" style={{margin: "15px"}}>
            {filteredMovies.map((movie, index)=>(
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
            title={filteredMovies[currentId].title}
            review={filteredMovies[currentId].review}
            status={filteredMovies[currentId].status} 
            rating={filteredMovies[currentId].rating}
            imageUrl={filteredMovies[currentId].imageUrl}
            onEdit={updateMovie}
            onDelete={deleteMovie}
            onClose={togglePopUp}
        />
        )}
        </div>

    );
}

export default Search;