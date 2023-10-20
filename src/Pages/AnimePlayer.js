import React, { Component } from 'react'
import axios from 'axios';
import "../stylesheets/player.css"
import LoadingPlayer from '../Components/LoadingPlayer';
import LoadingScreen from '../Components/LoadingScreen';
import Footer from '../Components/Footer';
import ReactStars from "react-rating-stars-component";
import Player from '@oplayer/core'
import ui from '@oplayer/ui'

const ratingChanged = (newRating) => {
  console.log(newRating);
};

export default class AnimePlayer extends Component {

    state = {
        totalEpisode : 0,
        episodes : [],
        currentEpisode: null,
        info:{},
        currentEpisode: 0,
        eps: [],
        currentPage: 1,
        episodesPerPage: 10,
        clickedEpisodeIndex: -1,
        isLoading: false,
        pageloading: true,
        changeSubDub: '',
        showButton: false

    }

    

    handlePageChange = (page) => {
    const { totalEpisode, episodesPerPage } = this.state;
    const totalPages = Math.ceil(totalEpisode / episodesPerPage);

    if (page >= 1 && page <= totalPages) {
        this.setState({ currentPage: page, clickedEpisodeIndex: -1 });
    }
  };

  handleEpisodeButtonClick = (index,ANIMEDATA) => {
    this.setState({ clickedEpisodeIndex: index,isLoading: true  });
    this.getepisodemedia(ANIMEDATA)
  }

  convertDubSub = (anime_id) => {

    const all_parts = anime_id.split('-')
    const last_part = anime_id.split('-').splice(-1)[0]; 
    const subVersion = "-";

    if(anime_id == "jujutsu-kaisen-tv-2nd-season")
    {
      return "jujutsu-kaisen-2nd-season-dub"
    }
    
    if(anime_id == "jujutsu-kaisen-2nd-season-dub")
    {
      return "jujutsu-kaisen-tv-2nd-season"
    }
  
    if (last_part === 'dub') {
      all_parts.pop();
      
      return all_parts.join(subVersion);
    } else {
      const dubVersion = anime_id + "-dub"
      return anime_id + "-dub";
    }
  }
    


    async componentDidMount() {
      const lastPathSegment = window.location.pathname.split('/').filter(segment => segment)[1];
      const URL_ANIME_INFO = `https://betaversion-git-main-abhinavkuamrs-projects.vercel.app/api/info?id=${lastPathSegment}`;
      const change = this.convertDubSub(lastPathSegment)
      const SWITCH_URL = `https://betaversion-git-main-abhinavkuamrs-projects.vercel.app/api/info?id=${change}`;

  
      try {
          const response = await axios.get(URL_ANIME_INFO);
          const anime_info = response.data;
          const totalEpisode = anime_info.totalEpisodes;
          const episodes = anime_info.episodes;
          const new_obj = [];

          this.setState({ episodes, totalEpisode, info: anime_info, eps: new_obj, pageloading: false,changeSubDub:change});
          if (episodes.length > 0) {
            this.handleEpisodeButtonClick(0, episodes[0]);
          }
      } catch (err) {
          console.error(err);
      }

      try{

        const get_res = await axios.get(SWITCH_URL)
        this.setState({showButton: true})


      }
      catch(err){

        this.setState({showButton: false})


      }
  }


  changeversion = (switch_value) => {

    window.location.href = `/watch/${switch_value}`;

  }
  


                                getepisodemedia = async (ANIMEDATA) => {
                                 const EP = `https://betaversion-git-main-abhinavkuamrs-projects.vercel.app/api/eplink?id=${ANIMEDATA.id}`;
                                  console.log("EP",EP);
                                 try {
                                  const response = await axios.get(EP);
                                  const ep_link =response.data.sources[3]?.url || response.data.sources[4]?.url ||  response.data.sources[2]?.url ||  response.data.sources[1]?.url ||  response.data.sources[0]?.url;

                                                                     console.log("EP",ep_link);

                                  this.setState({ currentEpisode: ep_link ,isLoading: false});
                              } catch (err) {
                                  console.error(err);
                              }
                                 console.log(ANIMEDATA)
                                }                      

      
  render() {


    const { episodes, totalEpisode, currentEpisode , info,eps,currentPage, episodesPerPage,clickedEpisodeIndex,isLoading,pageloading, changeSubDub,showButton} = this.state;
    const indexOfLastEpisode = currentPage * episodesPerPage;
        const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
        const currentEpisodes = episodes.slice(indexOfFirstEpisode, indexOfLastEpisode);
    if(pageloading == true){
      return <LoadingScreen></LoadingScreen>
    }
    
    console.log("COMING",eps)
    return (<>
    {
      <>
  <body class="container-fluid">
  <div id="header-wrapper">
  </div>
<div style={{display:"flex", flexDirection:"column", justifyContent: 'center', alignItems: 'center' }}>
  <div class="row" >
  <div class="col col-12" >
    <div className="kallukaliya">
      
    <div class="col col-3 right"  data-aos="fade-right">
      <div class="panel panel-right">
        <div class="panel-label">
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <iframe src="https://giphy.com/embed/Hzdph9ISDR3e5q0UBy" width="65" height="65" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
  <h3 style={{ marginLeft: '5px' }}>Know more about your Anime</h3>
</div>
        </div>
        <h3 style={{color:"white"}}>{console.log(info)}</h3>
        <div className="info-card">
        <img src={info.image} className="info-image"></img>
        <div className='info'>
        <h3><span>Title</span> : {info.title}</h3>
        <div className="button-container">
  <h3><span>Sub/Dub</span> : {info.subOrDub}</h3>
  {showButton && (
    <button className="beautiful-button" data-aos="fade-in" onClick={() => this.changeversion(changeSubDub)}>
      <i class="fa-solid fa-rotate fa-spin"></i>
    </button>
  )}
</div>        <h3><span>Release Date</span>: {info.releaseDate}</h3>
        <h3><span>Status</span>: {info.status}</h3>
        <h3><span>Episodes</span> : {info.episodes.length}</h3>
        
        </div>
        </div>
        <h3><span>Genres</span>: {info.genres.join(', ')}</h3>
        <h3><span>Type</span> : {info.type}</h3>


        <div className='description'>
        <h3><span>Other Name</span>: {info.otherName}</h3>
        <div className='animedes'>
        <div className='scrollable-description'>
          <h3><span>Description</span>: {info.description}</h3>
        </div>
        </div>
        </div>
      </div>
    </div>
    
          <div class="panel-body body-1 iframewaladiv" data-aos="fade-down">
            <div class="panel-label">
            <iframe src="https://giphy.com/embed/dxmJyooma3sFGU8t7r" width="50" height="50" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>              <h3 className='iframeHeading'> You are watching {info.title}</h3>
              <iframe src="https://giphy.com/embed/VFGsPXfFeIcGdtwAIC" width="50" height="50" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <div className='toplay' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            {isLoading ? (
                        // Display a loading screen
                        
            <i style={{ color: "#ffff", fontSize: "50px", margin: "50px"}} class="fa-solid fa-spinner fa-spin"></i>
        
                    ) : (<iframe title="Streaming Window" 
                    src={`https://plyr.link/p/player.html#${window.btoa(currentEpisode)}`} 
                    allowfullscreen='True' width="768px" height="342px" className='frame' allow="autoplay"
                    onLoad={() => {
                      // Add the postMessage script after the iframe loads
                      const iframe = document.querySelector('.frame'); // You can use a better selector if available
                      iframe.contentWindow.postMessage("autoplay", "*");
                    }}
                    />)}
                    
            
           


            </div>

          </div>
          <div class="col col-3 left">
      <div class="panel panel-left" data-aos="fade-left">
        <div class="panel-label">
        <iframe src="https://giphy.com/embed/cRKRsUJ9enVZe" width="55" height="55" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
              <div className="pagination">
                                    <button onClick={() => this.handlePageChange(currentPage - 1)}><i class="fa-solid fa-left-long"></i></button>
                                    <h3>Change list</h3>
                                    <button onClick={() => this.handlePageChange(currentPage + 1)}><i class="fa-solid fa-right-long"></i></button>
                                </div>
                                <iframe src="https://giphy.com/embed/jM4bWFBKpSFeo" width="50" height="50" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </div>
        
        <div className='episode'>
        
        {
          currentEpisodes.map((element, index) => (
            <button
            className={`episode-button ${clickedEpisodeIndex === index ? 'clicked-button' : ''}`}
            key={index}
            style={{fontFamily: "serif", fontWeight: "bolder", fontSize: "15px"}}
            onClick={() => this.handleEpisodeButtonClick(index,element)}
        >{indexOfFirstEpisode + index + 1}</button>
          ))
        }
        


        </div>
      </div>
    </div>
</div>


        </div>
    

   



  </div>
  </div>
<div style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
  <div class="col col-6" style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
      <div class="row">
        
        <div class="col col-12">
          <div class="panel-body body-2">
            <div class="panel-label">
            {/*<iframe src="https://giphy.com/embed/TyJkjnj58K2jAIL26v" width="60" height="60" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>*/}
              <h3>Rate this Episode</h3>
              <iframe src="https://giphy.com/embed/NTcqWPci2hkm6OmXcD" width="70" height="70" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <div class="stars-container">
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={50}
      activeColor="#ffd700"
      emptyIcon={<i className="fa-solid fa-star"></i>}
      halfIcon={<i className="fa-solid fa-star-half-alt"></i>}
      fullIcon={<i className="fa-solid fa-star"></i>}
    />
  </div>
 
  
 
          </div>
        </div>
        </div>
      </div>
    </div>

</body>
  <Footer></Footer>
  </>


}



      
      </>
    )
  }
}
