import React, { useEffect, useState  } from 'react';
import { Link, NavLink, useNavigate, useLocation  } from 'react-router-dom';
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min";
import "../stylesheets/navbar.css"




const NavBar = () => {

  useEffect(() => {
    let menu = document.querySelector("#menu-bars")
    let navbar = document.querySelector(".navbar")

    menu.onclick = () => {
      //menu.classList.toggle('fa-time')
      navbar.classList.toggle('active')
    }
  }) 


  const location = useLocation();
  console.log(location.pathname)
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleChange = (event) => {
    setSearchQuery(event.target.value); //nice thing, event.target.value
  };
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (event) => {
    event.preventDefault();
    if(searchQuery.length != 0){
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("")
    }
    

  };

  const bringback = (event) => {

    setIsSearchActive(!isSearchActive)    

  }
  const isHomePage = location.pathname === '/';

  return (
    <>
    {/*<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand logo" href="#">AnimeHub</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/top-airing">Top Airing</NavLink>
          </li>
        </ul>
      </div>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={handleChange} />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
  </nav>*/}
    <header>
      <NavLink to="/" className='logo'><i className='fas fa-infinity'></i>Anime.</NavLink>
      <nav className='navbar'>
        <NavLink to="/homenew" href='#'>home</NavLink>
        <NavLink to="/top-airing">Top Airing</NavLink>
        <NavLink to="/popular">Most Popular</NavLink>
        <a href='#'>Movies</a>
      </nav>
      <div className="icons">
        <form onSubmit={handleSubmit}>
        <i className='fas fa-bars' id='menu-bars'></i>
        <input className={`searchTerm${isSearchActive ? ' active' : ''}`} type="search" placeholder="Search" value={searchQuery} onChange={handleChange} />
        <button type="submit" className={`searchButton${isHomePage ? ' hide-search' : ''}`} onSubmit={handleSubmit} onClick={bringback} ><i className='fas fa-search' id='search-icon'></i></button>
      </form> 
      
      
        
      </div>
    </header>
    </>
  );
};

export default NavBar;
