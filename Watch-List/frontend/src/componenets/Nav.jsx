import React from "react";
import {Link} from "react-router-dom";

// nav component
function Nav(){
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
  <a class="navbar-brand" >Watch List</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
      <Link to='/' className="nav-item nav-link active">Home</Link>
      </li>
      <li class="nav-item">
      <Link to='/search' className="nav-item nav-link">search</Link>
      </li>

    </ul>
  </div>
</nav>
    );
}

export default Nav;