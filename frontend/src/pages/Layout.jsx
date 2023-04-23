import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar'
import styled from 'styled-components';

const WholePageContainer = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  height: auto;
  justify-content: center;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
  width: 100vw;
`

function Layout() {
  return (
    <WholePageContainer>
      <Navbar />
      <Outlet />
    </WholePageContainer>
  )
}

export default Layout