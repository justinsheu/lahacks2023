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

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1512px;
  min-height: 964px;
  padding: 86px 140px;
  position: relative;
  width: 100%;
`

const LeftContainer = styled.div`
  margin-top: 3.25rem;
  max-width: 29.875rem;
  z-index: 1;
`

const IntroContainer = styled.div`
  background: #f0f4f8;
  border-radius: 1rem;
  height: 11.563rem;
  margin-bottom: 3.625rem;
  padding-top: 1.5rem;
  width: 100%;
`

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 5.375rem;
  justify-content: center;
  width: 100%;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 16px;
  justify-content: center;
  line-height: 18px;
  padding: 8px 16px;
  text-align: center;
`

const Blurb = styled.div`
  margin-bottom: 3.625rem;
`

const BoldText = styled.div`
  font-weight: 700;
  font-size: 2rem;
  color: #486581;
  line-height: 2.25rem;
  margin-bottom: .75rem;
`

function Layout() {
  return (
    <WholePageContainer>
      <Navbar />
      <HomeContainer>
        <LeftContainer>
          <IntroContainer>
            <TextBox>
              Sample Text.
            </TextBox>
            <TextBox>
            <BoldText>
              Bold Text.
            </BoldText>
            </TextBox>
          </IntroContainer>
          <Blurb>
            <BoldText>
              WiFi
            </BoldText>
          </Blurb>
        </LeftContainer>
      </HomeContainer>
      <Outlet />
    </WholePageContainer>
  )
}

export default Layout