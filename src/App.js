import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home'
import Topair from './Pages/Topair'
import NavBar  from './Components/Navbar';
import AnimePlayer from './Pages/AnimePlayer';
import Search from './Pages/Search';
import HomeNew from './Pages/HomeNew'
import Popular from './Pages/Popular';
import Movies from './Pages/Movies'



function App() {
  return (
  <>
  <NavBar/>
  <Routes>

    <Route path="/" element={<Home />}/>
    <Route path="/top-airing" element={<Topair />}/>
    <Route path="/watch/:animeTitle" element={<AnimePlayer />}/>
    <Route path="/search" element={<Search />}/>
    <Route path="/homenew" element={<HomeNew />}/>
      <Route path="/popular" element={<Popular />}/>
        <Route path="/movies" element={<Movies />}/>



  </Routes>
  
  </>
  );
}

export default App;
