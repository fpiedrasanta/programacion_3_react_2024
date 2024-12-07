import './App.css';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Songs from './components/Songs/Songs';
import Song from './components/Song/Song';
import NotFound from './components/NotFound/NotFound';
import Error from './components/Error/Error';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/songs" element={<Songs/>}/>
          <Route exact path="/song/:idSong" element={<Song/>}/>
          <Route exact path="/song" element={<Song/>}/>
          <Route exact path="/error" element={<Error/>}/>
          <Route exact path="/page-not-found" element={<NotFound/>}/>
          <Route path="*" element={<Navigate to='/error'/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
