import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Coin from './pages/Coin/Coin.jsx';
import Footer from './components/Footer/Footer.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
import {AuthContextProvider} from './context/Auth-Context.jsx'; // Import AuthContextProvider
const App = () => {
  return (
    <AuthContextProvider>
    <div className = "app">
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/coin/:coinId' element = {<Coin />} />
        <Route path ='/favorites' element = {<Favorites />} />
        
       
      </Routes>
      <Footer />

    </div>
    </AuthContextProvider>
  )
}

export default App
