import React, { Component } from 'react'
import "../stylesheets/home.css"
import { Swiper, SwiperSlide} from 'swiper/react';
import '../../node_modules/swiper/swiper-bundle.min.css';
import "../../node_modules/swiper/swiper.min.css"
import { Navigation, Pagination, Scrollbar, A11y,Autoplay  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';
import LoadingScreen from '../Components/LoadingScreen';
import { Link } from 'react-router-dom';
import AnimeCard from '../Components/AnimeCard'
import Footer from '../Components/Footer'


const URL_POPULAR = "https://betaversion-hqvuwe9lt-abhinavkuamrs-projects.vercel.app/api/popular"
const URL_INFO = "https://betaversion-hqvuwe9lt-abhinavkuamrs-projects.vercel.app/api/info"
const URL_RECENT = "https://betaversion-hqvuwe9lt-abhinavkuamrs-projects.vercel.app/api/recent"

export default class HomeNew extends Component { 

  state = {
    anime: [], // Initialize with an empty array
    showFullDescription : false,
    recent: [],
    isLoading: true
  };

  toggleDescription = () => {
    this.setState((prevState) => ({
      showFullDescription: !prevState.showFullDescription,
    }));
  };
  

  async fetchData() {
    try {
      const response = await axios.get(URL_POPULAR);
      const animeData = response.data.results;

      let slider_data = [];
      let data = [];



      const animePromises = animeData.map(async (item) => {
        const res = await axios.get(URL_INFO + `?id=${item.animeId}`);

        return({
          animeName: res.data.title,
          animeImage: res.data.image,
          animeCover: res.data.cover,
          animeDes: res.data.description,
          animeId: '/watch/' + item.animeId,
        });
      });

      slider_data = await Promise.all(animePromises);


      

      const recentResponse = await axios.get(URL_RECENT);
      data = recentResponse.data.results;
      this.setState({ anime: slider_data, recent: data , isLoading: false});
    } catch (error) {
      console.error("error", error);
    }
  }

  componentDidMount() {
    this.fetchData();
  }
  render() {

    const {anime,showFullDescription,recent,isLoading} = this.state
    //console.log("here",recent)

    if (isLoading) {
      
      return <LoadingScreen />; // You can also show a loading indicator
    }
    return (
      <>
      
      <section className='home' id='home'>
        <div className='home-slider'>
          <div className='wrapper'>            
            <Swiper
                  modules={[Navigation,Autoplay,Pagination ]}
                  spaceBetween={10}
                  slidesPerView={1}
                  loop={true}
                  navigation
                  autoplay
                  pagination={{ clickable: true }}

      
    >

{anime.slice(0,5).map((element, index) => (
  
  <SwiperSlide key={index}>
    <div className='slide'>
      <div className='box' style={{background: `url(${element.animeCover}) no-repeat` , backgroundSize: "contain" }}>
        <div className='content'>
        <div className="black-blur-box">
          <u><h2 style={{fontStyle: "italic", color: "red"}}>Spotlight #{index + 1}</h2></u>
          <h3>{element.animeName}</h3>
          <p className='description'>
  {showFullDescription ? element.animeDes : element.animeDes.slice(0, 200)}
  {element.animeDes.length > 200 && (
    <span onClick={this.toggleDescription} className='read-more'>
      {showFullDescription ? "Read Less" : "Read More"}
    </span>
  )}
</p>
          <Link to={element.animeId} className='btn'>
            Watch Now
          </Link>
          </div>
        </div>
      </div>
    </div>
  </SwiperSlide>
))}
      
      
    </Swiper>
          </div>
        </div>
      </section>
      
      <section className='anime' id='anime'>
        <h1 className='heading'>Recent Release</h1>

        <div class="anime-slider">
        <div class="wrapper">
        <Swiper
                  modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={swiper => console.log(swiper)}
      navigation
      
      
      pagination={{ clickable: true }}
      scrollbar={{ draggable: false }}
      breakpoints={{
        768: {
          slidesPerView: 2, // Number of slides to display for screens wider than 768px
          spaceBetween: 5
        },
        1024: {
          slidesPerView: 5, // Number of slides to display for screens wider than 1024px
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 5
        }

      }}
      
    >

      <>
      {recent.slice(0,10).map((element, index) => (
            <SwiperSlide>

<div class="slide" key={index}  title={`Tooltip for ${element.title}`}>
  <div class="box" style={{ background: `url(${element.image}) no-repeat`, backgroundSize: "contain", backgroundPosition: "center center" }}>
    <div class="play-button-container">
          <Link to={`/watch/${element.id}`} class="play-btn">
              <i class="fa-solid fa-play"></i>
    </Link>
    </div>
  </div>
  <div class="content">
    <h3>{element.title}</h3>
    <p></p>

  </div>
</div>
 </SwiperSlide>
))}
      </>
    </Swiper>
    </div>
    </div>

</section>

<section>
<div className='contain-all'>
    <section class="featured-anime">
        <h2>Most Popular Anime</h2>
        <div class="anime-list">


            <div class="card-container" >

            {anime.map((animeItem, index) => (

  <AnimeCard
    key={index}
    animeItem={animeItem}
   />
   

   ))}
   
            </div>


        </div>
       
    </section>


   
    </div>
</section>
<Footer></Footer>

      </>
    )
  }
}
