import React, { useState } from 'react'
import GridLayout from '../components/GridLayout'

const Home = ({homeFoodData, homeFoodLoading}) => {
  return (
    <div>
      <GridLayout homeFoodData={homeFoodData} homeFoodLoading={homeFoodLoading}/>
      
    </div>
  )
}

export default Home