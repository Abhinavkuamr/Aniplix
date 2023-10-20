import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from '../Components/LoadingScreen'
import "../stylesheets/popular.css"

export default function Popular() {

    const URL_POPULAR = "https://web-production-a8e9.up.railway.app/popular"
    const [popular, setPopular] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {

        fetchData();

    }, [currentPage]) //if popular changes , useEffect() reloads

    const fetchData = async () => {

        try{

            const response = await axios.get(URL_POPULAR + `?page=${currentPage}`)
            
            setPopular(response.data)

        }
        catch(err){
            console.error(err)
        }
        finally{
            setLoading(false)

        }


    }
    const handlePageChange = (new_page) => {
        setLoading(true)
        setCurrentPage(new_page)
        window.scrollTo(0, 0);
    }
  return (
    <section className="popular" style={{paddingTop: "10rem"}}>
       
        

        
        {isLoading ? (<LoadingScreen></LoadingScreen>):(<>
            <div className='popular-heading'>
        <h1>Popular Anime</h1>
        </div>
        <div className='changePage'>
        <button className="previous" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <i class="fa-solid fa-circle-left fa-beat-fade"></i>
        </button>
        <button className="next" onClick={() => handlePageChange(currentPage + 1)}><i class="fa-solid fa-circle-right fa-beat-fade"></i></button>
      </div>
        
        <div className='popular-anime' data-aos="fade-up">
            {popular.map((element,index) => (
                <div className="card">
        
                <Link to={`/watch/`+element.animeId}>
                  
                <img src={element.animeImg} alt={element.animeName} className="card-img-top" />
                <div className="card-body">
                  <p className="card-title">{element.animeTitle}</p>
                </div>
                </Link>
              </div>
            ))}
            
        </div>
        <div className='changePage'>
        <button className="previous" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <i class="fa-solid fa-circle-left fa-beat-fade"></i>
        </button>
        <button className="next" onClick={() => handlePageChange(currentPage + 1)}><i class="fa-solid fa-circle-right fa-beat-fade"></i></button>
      </div>
      </>
        
        )}
        
        
    </section>

  )
}
