import { useState } from 'react'
import {Routes , Route} from 'react-router-dom'

import './App.css'
import Home from './pages/Home/Home'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import AboutUs from './pages/AboutUs/AboutUs'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
      </Routes>

    
     
    </>
  )
}

export default App
