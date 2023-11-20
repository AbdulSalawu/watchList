import React, { useState } from "react";

// searchbar component
function SearchBar(props) {

  const [query, setQuery] = useState("");
  const searchInput = document.querySelector("[data-search]")

  // handleChange
  function handleChange(event) {
    const  value = event.target.value;
    setQuery(value)
    props.onChange(value);
    
  }


  return (
    <div>
      <form className="add-movie">
        
        <input
        name="title"
        onChange={handleChange}
        value={query}
        placeholder="Search for a movie..."
        />
      </form>
    </div>
  );
}

export default SearchBar;
