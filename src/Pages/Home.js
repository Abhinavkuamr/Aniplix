import React, { useEffect, useState  } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../stylesheets/home.css';

const contentContainerStyle = {
  minHeight: 'calc(100vh - 100px)',
  overflow: 'hidden',
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
  return (
    <>
      <div style={contentContainerStyle}>
        <section
data-aos="fade-down" data-aos-once="true"
          className='anime kela'
          id='anime'
          style={{
            marginTop: '50px',
            animation: 'glowUpDown 2s infinite',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '50px',
              fontSize: '30px',
              color: 'white',
            }}
          >
            <h1 style={{ zIndex: '10' }}>Welcome to Anime</h1>
          </div>
          <form className='search-form' onSubmit={handleSubmit}>
            <input className='search-input' type='text' placeholder='Search...' value={searchQuery} onChange={handleChange}/>
            <button className='search-button' type='submit' onSubmit={handleSubmit} >
              <span>Search</span>
            </button>
          </form>
        </section>
        <NavLink to="/homenew" className='fullsite'>
          <h1 className='somthing'>
            Full Site <i className='fa-solid fa-angles-right fa-bounce'></i>
          </h1>
        </NavLink>
      </div>

      <div className="paragraph" style={{ margin: '20%' }}>
        <p style={{color: 'white' }}>
          Anime is a free website for watching anime online that offers subbed or dubbed anime in ultra HD quality without any registration or payment. With over 1 billion monthly searches for anime related topics, it's no surprise that there has been a sharp rise in the number of free anime streaming sites. However, not all sites are created equal, which is why anime was created as one of the best free anime streaming sites for all anime fans worldwide.
        </p>
        <p style={{ color: 'white' }}>
          Anime is a safe site to watch anime, with only one ad to cover server costs and constant scanning to ensure that all ads are clean. If you find any suspicious ads, you can forward the information to Anime, and they will remove them.
        </p>
        <p style={{ color: 'white' }}>
          Anime stands out from other anime streaming sites because of its focus on safety, content library, quality/resolution, streaming experience, updates, user interface, device compatibility, and customer care. The site offers popular, classic, and current anime titles from all genres, including action, drama, kids, fantasy, horror, mystery, police, romance, school, comedy, music, game, and more. All titles come with English subtitles or are dubbed in multiple languages, and users can choose from various quality settings to ensure a smooth streaming experience.
        </p>
        <p style={{ color: 'white' }}>
          If you have trouble accessing Anime, you can try anix or gogoanime, Anime is committed to providing a trustworthy and safe site for anime streaming and offers excellent customer service. Give Anime a try and spread the word if you like it.
        </p>
      </div>
    </>
  );
};

export default Home;
