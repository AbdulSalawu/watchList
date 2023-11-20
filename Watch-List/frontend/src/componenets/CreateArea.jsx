import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import Dropdown from "./DropDown";


// createArea component
function CreateArea(props) {
  
  // define states
  const [isExpanded, setExpanded] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  const [movie, setMovie] = useState({
    title: "",
    status: "Watch-List",
    rating: "",
    review: ""
  });

  // handleChange
  function handleChange(event) {
    const { name, value } = event.target;

    setMovie(prevMovie => {
      return {
        ...prevMovie,
        [name]: value
      };
    });
  }

  // submitMovie to backend using prop function
  function submitMovie(event) {
    props.onAdd(movie);
    setMovie({
      title: "",
      status: "",
      rating: "",
      review: ""
    });
    event.preventDefault();
    setCompleted(false)
    setExpanded(false)
  }

  // changeStatus setter
  function changeStatus(newStatus){
    (newStatus == 'Completed') ? setCompleted(true) : setCompleted(false)
    setMovie(prevMovie => {
        return {
          ...prevMovie,
          status: newStatus
        };
      });

  }

  // keeping track of popUp
  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="add-movie">
        
        <input
        name="title"
        onClick={expand}
        onChange={handleChange}
        value={movie.title}
        placeholder="Add a movie..."
        />
        {isExpanded && (
        <Dropdown 
          status={movie.status} 
            onChangeStatus={changeStatus}
        />
        )}
        
        {isCompleted && (
            <textarea
          name="rating"
          onChange={handleChange}
          value={movie.rating}
          placeholder="Rating..."
        />
        )}
        
        {isCompleted && (
            <textarea
          name="review"
          onChange={handleChange}
          value={movie.review}
          placeholder="Review..."
          rows={3}
        />
        )}
        


        
        <Zoom in={isExpanded}>
        <div className="addButton">
          <Fab onClick={submitMovie}>
          <AddIcon />
            
          </Fab>
          </div>
        </Zoom>
        
      </form>
    </div>
  );
}

export default CreateArea;
