// import { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import AboutUs from './pages/AboutUs/AboutUs'
// import UserPackages from './pages/ClientDashboard/userPackages/UserPackages'
import MyCourse from './pages/ClientDashboard/MyCourse/MyCourse'
import MyCourseContent from './pages/ClientDashboard/MyCourseContent/MyCourseContent'
import UserCourses from './pages/ClientDashboard/UserCourses/UserCourses'
import User from './pages/AdminDashboard/Users/User'
import RequestUser from './pages/AdminDashboard/reqUser/RequestUser'
import UserCourse from './pages/AdminDashboard/userCourse/UserCourse'
import NewCourse from './pages/AdminDashboard/newCourse/NewCourse'
import PostContent from './pages/AdminDashboard/postContent/PostContent'
import CourseDetails from './pages/CourseDetails/CourseDetails'
import UserPayments from './pages/ClientDashboard/Payments/UserPayments'
import UserProfile from './pages/ClientDashboard/UserProfile/UserProfile'
import NewPackage from './pages/AdminDashboard/newPackage/NewPackage'
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { loadUser } from './store/reducers/userReducers'

function App() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.user);

  useEffect(() => {
  
    dispatch(loadUser());
  }, []);


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/course/:id' element={<CourseDetails/>}/>
        {/* <Route path='/user/packages' element={<UserPackages/>}/> */}
        <Route path='/user/my-course' element={<MyCourse/>}/>
        <Route path='/user/my-course/:courseId/:packageId' element={<MyCourseContent/>}/>
        <Route path='/user/courses' element={<UserCourses/>}/>
        <Route path='/user/payments' element={<UserPayments/>}/>
        <Route path='/user/profile' element={<UserProfile/>}/>
        <Route path='/dashboard' element={<User/>}/>
        <Route path='/dashboard/req-users' element={<RequestUser/>}/>
        <Route path='/dashboard/courses' element={<UserCourse/>}/>
        <Route path='/dashboard/add-courses' element={<NewCourse/>}/>
        <Route path='/dashboard/post-content' element={<PostContent/>}/>
        <Route path='/dashboard/add-package' element={<NewPackage/>}/> 
      </Routes>

    
     
    </>
  )
}

export default App
