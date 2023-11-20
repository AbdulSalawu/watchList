import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import Dropdown from "./DropDown";
import '../PopUp.css';

// popUp component
function PopUp(props) {
  

  const [movie, setMovie] = useState({
    title: props.title,
    status: props.status,
    rating: props.rating,
    review: props.review,
    imageUrl:props.imageUrl
  });

  // handleChange
  function handleChange(event) {
    const { name, value } = event.target;

    if (name !== "title"){
        setMovie(prevMovie => {
        return {
            ...prevMovie,
            [name]: value
        };
        });
        }
    }

  // updateMovie though prop function
  function updateMovie(event) {
    closePopUp();
    props.onEdit(movie);
    setMovie({
      title: "",
      status: "",
      rating: "",
      review: "",
      imageUrl:""
    });
    event.preventDefault();
    

  }

  // deleteMovie though prop function
  function deleteMovie(event) {
    closePopUp();
    props.onDelete(movie);
    setMovie({
      title: "",
      status: "",
      rating: "",
      review: "",
      imageUrl:""
    });
    event.preventDefault();
    

  }

  // changeStatus 
  function changeStatus(newStatus){
    setMovie(prevMovie => {
        return {
          ...prevMovie,
          status: newStatus
        };
      });

  }

  // closePop with id
  function closePopUp(){
    props.onClose(movie.id);
  }

  return (props.trigger) ? (
    <div className="popup">
        <form className="add-movie-popup">
        <div className="image">
            <img class="card-image" src={movie.imageUrl} alt="Random Photo"/>
        </div>
        <div className="content">
        <input
        name="title"
        value={movie.title}
        />
        <div className="delButton">
          <Fab onClick={deleteMovie}>
          <DeleteIcon />
            
          </Fab>
          </div>
        <Dropdown
            status={movie.status} 
            onChangeStatus={changeStatus}
        />
        <label> Rating: </label>
        <textarea
          name="rating"
          onChange={handleChange}
          value={movie.rating}
          placeholder="Rating..."
        />
        
        <label> Review: </label>
        <textarea
          name="review"
          onChange={handleChange}
          value={movie.review}
          placeholder="Review..."
          rows={3}
        />
        
        <div className="addButton">
          <Fab onClick={updateMovie}>
          <SaveAsIcon />
            
          </Fab>
          </div>
          <div className="delButton">
          <Fab onClick={closePopUp}>
          <CancelIcon />
            
          </Fab>
          </div>
          </div>
      </form>
    </div>
  ) : "";
}

export default PopUp;
