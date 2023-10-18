import React, { Component } from 'react';
import AnimeCard from '../Components/AnimeCard'
import axios from 'axios'

const URL = "http://localhost:3001/api/top-airing"

class MyComponent extends Component {
    state = {
        animeData: [], // Initialize with an empty array
        isLoading: true, // Flag to track loading state
      };
      componentDidMount(){
        axios.get(URL).then((response) => {
            console.log("API Success ")
            this.setState({
                animeData: response.data,
                isLoading: false
            })
        })
        .catch(err => {
            console.error('API ERROR', err)
            this.setState({isLoading: false})
        })

      }
  render() {
    const { animeData, isLoading } = this.state;

    return (<>
     
      {isLoading ? 
      (<p>Is Loading...</p>):(
        <div className="card-container">
            
            {animeData.map((animeItem, index) => (
  <AnimeCard
    key={index}
    animeItem={animeItem}
  />
))}
        </div>
      )
      }


</>

    );
  }
}

export default MyComponent;
