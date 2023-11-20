import React from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

// searchCard component
function SearchCard(props){
    function handleClick(){
        props.onShow(props.id);
    }
    
    return(
        <div class="card" style={{width: '18rem', margin: '0.5rem'}} data-search>
            <img class="card-img-top" src={props.imageUrl} alt="Random Photo"/>
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text">{props.rating}</p>
                {props.toggle && (<Fab onClick={handleClick}>
                  <AddIcon />
            
                </Fab>)}
            </div>
        </div>
    );
}

export default SearchCard;  