import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import WholePageContainer from '../components/WholePageContainer'

function Layout() {
  return (
    <WholePageContainer>
      <Navbar />
      <Outlet />
    </WholePageContainer>
  )
}

export default Layout