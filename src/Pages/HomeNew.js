import React, { Component, useEffect, useState } from "react";
import "../stylesheets/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../node_modules/swiper/swiper-bundle.min.css";
import "../../node_modules/swiper/swiper.min.css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import LoadingScreen from "../Components/LoadingScreen";
import { Link } from "react-router-dom";
import AnimeCard from "../Components/AnimeCard";
import Footer from "../Components/Footer";

const URL_POPULAR =
  "https://gogoanime-api-production-bb8b.up.railway.app/popular";
const URL_INFO = "https://betaapi-9jpy.onrender.com/api/info";
const URL_RECENT =
  "https://gogoanime-api-production-bb8b.up.railway.app/recent-release";

const HomeNew = () => {
  const [anime, setAnime] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [recent, setRecent] = useState([]);
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const popularResponse = await fetch(URL_POPULAR);
        const popularData = await popularResponse.json();

        const response = await fetch("https://ottoscraper.vercel.app/api/pop");
        const animeData = await response.json();
        let data = [];

        const recentResponse = await axios.get(URL_RECENT);
        data = recentResponse.data;

        setAnime(animeData[0]);
        setRecent(data);
        setPopular(popularData);
        setIsLoading(false);

        resolve({ anime: animeData[0], recent: data, popular: popularData });
      } catch (error) {
        console.error("abhinav", error);
        reject(error);
      }
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  console.log(anime);
  return (
    <>
      <section className="home" id="home">
        <div className="home-slider">
          <div className="wrapper">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              navigation
              autoplay
              pagination={{ clickable: true }}
            >
              {anime?.trending?.map((element, index) => (
                <SwiperSlide key={index}>
                  <div className="slide">
                    <div
                      className="box"
                      style={{
                        background: `url(https://image.tmdb.org/t/p/original${element.backdrop_path}) no-repeat`,
                        backgroundSize: "contain",
                      }}
                    >
                      <div className="content">
                        <div className="black-blur-box">
                          <u>
                            <h2 style={{ fontStyle: "italic", color: "red" }}>
                              Spotlight #{index + 1}
                            </h2>
                          </u>
                          <h3>{element.title}</h3>
                          <p className="description">
                            {showFullDescription
                              ? element.synopsis
                              : element.synopsis.slice(0, 200)}
                            {element.synopsis.length > 200 && (
                              <span
                                onClick={toggleDescription}
                                className="read-more"
                              >
                                {showFullDescription
                                  ? "Read Less"
                                  : "Read More"}
                              </span>
                            )}
                          </p>
                          <Link to={element.anime_id} className="btn">
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

      <section className="anime" id="anime">
        <h1 className="heading">Recent Release</h1>

        <div class="anime-slider">
          <div class="wrapper">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: false }}
              breakpoints={{
                768: {
                  slidesPerView: 2, // Number of slides to display for screens wider than 768px
                },
                1024: {
                  slidesPerView: 5, // Number of slides to display for screens wider than 1024px
                },
                320: {
                  slidesPerView: 1,
                },
              }}
            >
              <>
                {recent.map((element, index) => (
                  <SwiperSlide>
                    <div
                      class="slide"
                      key={index}
                      title={`Tooltip for ${element.animeTitle}`}
                    >
                      <div
                        class="box"
                        style={{
                          background: `url(${element.animeImg}) no-repeat`,
                          backgroundSize: "contain",
                          backgroundPosition: "center center",
                        }}
                      >
                        <div class="play-button-container">
                          <Link
                            to={`/watch/${element.animeId}`}
                            class="play-btn"
                          >
                            <i class="fa-solid fa-play"></i>
                          </Link>
                        </div>
                      </div>
                      <div class="content">
                        <h3>{element.animeTitle}</h3>
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
        <div className="contain-all">
          <section class="featured-anime">
            <h2>Most Popular Anime</h2>
            <div class="anime-list">
              <div class="card-container">
                  {console.log("POPULAR ANIME".popular)}
                {popular.map((animeItem, index) => (
                  <AnimeCard key={index} animeItem={animeItem} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default HomeNew;
