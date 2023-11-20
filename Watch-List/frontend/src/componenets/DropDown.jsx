import React, { useState } from "react";

// Dropdown component
function Dropdown(props){

    const [status, setStatus]  = useState(props.status);
    
    // handleClick with props
    function handleClick(e){
        console.log(props.status)
        setStatus(e.target.name)
        props.onChangeStatus(e.target.name)

    }
    
    return(
    <div class="dropdown mt-3">
    <button class="btn btn-secondary dropdown-toggle" type="toggle" id="status-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
        {status}
    </button>
     <ul class="dropdown-menu" aria-labelledby="status-dropdown">
        <li><button name="Watch-list" onClick={handleClick} class="dropdown-item" type="button">Watch-List</button></li>
        <li><button name="Watching" onClick={handleClick} class="dropdown-item" type="button">Watching</button></li>
        <li><button name="Completed" onClick={handleClick} class="dropdown-item" type="button">Completed</button></li>
    </ul>
    </div>
    );
}

export default Dropdown;