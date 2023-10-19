import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'

class MyComponent extends Component {
    
  render() {

    

    const animeItem = this.props.animeItem
    //console.log(animeItem)

    
    return (  <>
    {  
           
     <div className="card">
        
        <Link to={animeItem.id ? `/watch/${animeItem.id}` : `${animeItem.animeId}`}>
          {console.log(animeItem)}
        <img src={animeItem.image || animeItem.animeImage} alt={animeItem.title || animeItem.animeName} className="card-img-top" />
        <div className="card-body">
          <p className="card-title">{animeItem.title || animeItem.animeName}</p>
          {animeItem.genres && (
                <p className="card-text">Genres: {animeItem.genres.join(', ')}</p>
              )}
        </div>
        </Link>
      </div>
      
}
        
      </>

    );
  }
}

export default MyComponent;
