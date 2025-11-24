import React from 'react';
//import logo from './logo.svg';
import './App.css';
import HomePage from './pages/index';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerStats from './pages/player-stats/players';
import PitchStats from './pages/player-stats/pitchers';
import BatterStats from './pages/player-stats/batters';
import PlayerInfo from './pages/players/playersAll';
import PitcherInfo from './pages/players/pitchers';
import BatterInfo from './pages/players/batters';
import BattersDetail from './pages/players/battersDetail';
import PitchersDetail from './pages/players/pitchersDetail';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playerStats" element={<PlayerStats />} />
        <Route path="/playerStats/pitchersStats" element={<PitchStats />} />
        <Route path="/playerStats/battersStats" element={<BatterStats />} />
        <Route path="/playerInfo" element={<PlayerInfo />} />
        <Route path="/playerInfo/pitcherInfo" element={<PitcherInfo />} />
        <Route path="/playerInfo/batterInfo" element={<BatterInfo />} />
        <Route path="/playerInfo/pitcherInfo/pitcherDetail" element={<PitchersDetail />} />
        <Route path="/playerInfo/batterInfo/batterDetail" element={<BattersDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
