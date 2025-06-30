import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownlod/AppDownload'
const Home = () => {

  const[catagory,setcatagory] =useState("All");

  return (
    <div>
      <Header/>
      <Exploremenu catagory={catagory} setcatagory={setcatagory} />
      <FoodDisplay catagory={catagory} />
      <AppDownload/>
    </div>
  )
}

export default Home
