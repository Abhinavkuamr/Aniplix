import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'

class MyComponent extends Component {
    
  render() {

    

    const animeItem = this.props.animeItem
    console.log("ITEMS",animeItem)

    
    return (  <>
    {  
           
     <div className="card">
        
        <Link to={animeItem.id ? `../watch/${animeItem.id}` : `../watch/${animeItem.animeId}`}>
          {console.log(animeItem)}
        <img src={animeItem.image || animeItem.animeImg} alt={animeItem.Title || animeItem.animeName} className="card-img-top" />
        <div className="card-body">
          <p className="card-title">{animeItem.title || animeItem.animeTitle}</p>
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
