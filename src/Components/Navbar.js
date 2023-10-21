import React, { useEffect, useState, useRef, useReducer } from 'react';
import { Link, NavLink, useNavigate, useLocation  } from 'react-router-dom';
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min";
import "../stylesheets/navbar.css"
import axios from 'axios';




const NavBar = () => {



  let searchRef = useRef(null)
  let inputRef = useRef(null)

  const location = useLocation();
  console.log(location.pathname)
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchFound, setSearchFound] = useState(false)
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {

    let handler = (e) => {
      if(!searchRef.current.contains(e.target)){
        setSearchFound(false)
        console.log("1st",inputRef.current.contains(e.target))
        if(!inputRef.current.contains(e.target))
        {
          setIsSearchActive(false)
          setSearchQuery("")
        }
        
      }
      

    }

    document.body.addEventListener('mousedown',handler)

    let menu = document.querySelector("#menu-bars")
    let navbar = document.querySelector(".navbar")

    menu.onclick = () => {
      //menu.classList.toggle('fa-time')
      navbar.classList.toggle('active')
    }
    
  }) 

  const getSearchResult = async (value) => {

    const searchTerm = value
    try{
      const res = await axios.get(`https://betaversion-git-main-abhinavkuamrs-projects.vercel.app/api/search?id=${searchTerm}`)
      //const searches = res.data.results.splice(0,3)
      console.log(res.data.results.length)
      if(res.data.results.length === 0){
        setSearchFound(false)

      }
      else{

        console.log("FOUND")
        setSearchResult(res.data.results.splice(0,3))
        setSearchFound(true)

      }


    }
    catch(err)
    {
      console.err(err)
      setSearchFound(false)
    }



  }

  const handleChange = (event) => {
    
    getSearchResult(event.target.value)
    setSearchQuery(event.target.value); //nice thing, event.target.value
  };
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (event) => {
    event.preventDefault();
    if(searchQuery.length != 0){
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("")
      setSearchFound(false)
      setIsSearchActive(false)

    }
    

  };

  const bringback = (event) => {


    setIsSearchActive(!isSearchActive) 
    console.log("ACTIVITY",isSearchActive)
    if(isSearchActive === true)
    {
      setSearchResult([])
      setSearchFound(false)
    }
 

  }
  const isHomePage = location.pathname === '/';

  const handlenewcontent = (newcontent) => {

    console.log("testicleismine",newcontent)

    navigate(`/watch/${newcontent}`);
    setSearchFound(false); 
    setIsSearchActive(false);
     setSearchQuery('');
     window.location.reload()

  }

  return (
    <>
    
    <header className='header-container'>
      <NavLink to="/" className='logo'><i className='fas fa-infinity'></i>Aniplix.</NavLink>
      <nav className='navbar'>
        <NavLink to="/homenew" href='#'>home</NavLink>
        <NavLink to="/top-airing">Top Airing</NavLink>
        <NavLink to="/popular">Most Popular</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
      <div className="icons" >
        <form onSubmit={handleSubmit} ref={inputRef}>
        <i className='fas fa-bars' id='menu-bars'></i>
        <input className={`searchTerm${isSearchActive ? ' active' : ''}`} type="search" placeholder="Search" value={searchQuery} onChange={handleChange} />
        <button type="submit" className={`searchButton${isHomePage ? ' hide-search' : ''}`} onSubmit={handleSubmit} onClick={bringback} ><i className='fas fa-search' id='search-icon'></i></button>
      </form> 

      </div>
      <div className={`searchContainer${searchFound? ' active': ' inactive'}`} ref={searchRef} >
        <div className={`searchResults${searchFound? ' active': ''}`}>
          {searchResult.map((element) => (
            <div
            className={`searchResultItem${searchFound? ' active': ''}`}
            key={element.id}
            
            >
              
                <div className='searchquerycards' style=
                {{display:"flex", 
                flexDirection:"row",
                 justifyContent:"center",
                  border: " 1px solid #E50914",
                  padding:"5px"}}
                  onClick={() => {handlenewcontent(element.id)}}>

                <img src={element.image} style={{width: "50px", height: "50px"}}/>
                <p style={{color:"white", marginLeft:"4px"}}>{element.title}</p>
                </div>
            </div>
          ))
          }
          { <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}> <Link style={{color:"white"}} onClick={handleSubmit} to={`/search?query=${searchQuery}`}><u>View More</u></Link></div>}

          </div>

        </div>
    </header>
    {console.log(searchResult)}
    
    </>
  );
};

export default NavBar;
