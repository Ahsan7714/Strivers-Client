import { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import AboutUs from './pages/AboutUs/AboutUs'
import UserPackages from './pages/ClientDashboard/userPackages/UserPackages'
import MyCourse from './pages/ClientDashboard/MyCourse/MyCourse'
import MyCourseContent from './pages/ClientDashboard/MyCourseContent/MyCourseContent'
import UserCourses from './pages/ClientDashboard/UserCourses/UserCourses'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/user/packages' element={<UserPackages/>}/>
        <Route path='/user/my-course' element={<MyCourse/>}/>
        <Route path='/user/my-course/content' element={<MyCourseContent/>}/>
        <Route path='/user/courses' element={<UserCourses/>}/>
      </Routes>

    
     
    </>
  )
}

export default App
