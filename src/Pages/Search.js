import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AnimeCard from '../Components/AnimeCard'
import LoadingScreen from '../Components/LoadingScreen';

const Search = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');

    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const URL = `https://betaapi-9jpy.onrender.com/api/search?id=${searchQuery}`
        console.log(URL)
        axios.get(URL).then((response) => {
            console.log(response.data.results)
            setAnimeData(response.data.results)
            setLoading(false);


        }).catch(erro => {
            console.error(erro)
            setLoading(false);
        })

    }, [searchQuery]);
  
  
    return (
      <div style={{marginTop: "10rem"}}>
        <h2 style={{color: "white"}}>Search Results for: "{searchQuery}"</h2>
        {loading ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <div className="card-container">
          {animeData.map((animeItem, index) => (
            <AnimeCard key={index} animeItem={animeItem} />
          ))}
        </div>
      )}
      </div>
    );
  };
  
  export default Search;
  
