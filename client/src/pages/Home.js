import React, { useState } from 'react'
import GridLayout from '../components/GridLayout'

import Menu from './Menu';

const Home = ({ homeFoodData, homeFoodLoading}) => {
  
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div>
      
      <button className='btn btn-primary' onClick={() => {
                setIsOpenMenu(true)
                console.log('menu clicked clicked')
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>Menu</button>


      {isOpenMenu && (

        <Menu setIsOpenMenu={setIsOpenMenu}/>
      )}
    </div>
  )
}

export default Home