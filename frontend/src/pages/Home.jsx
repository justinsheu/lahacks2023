import React from 'react'
import styled from 'styled-components'
import MainButton from '../components/Button'

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
  max-width: 45%;
  z-index: 1;
`

const RightContainer = styled.div`
  margin-top: 3.25rem;
  max-width: 50%;
  z-index: 1;
`

const IntroContainer = styled.div`
  background: #f0f4f8;
  border-radius: 1rem;
  height: 100%;
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
  font-size: 24px;
  justify-content: center;
  line-height: 18px;
  padding: 8px 16px;
  text-align: center;
`

const Blurb = styled.div`
  margin-bottom: 3.625rem;
  display: flex;
  justify-content: center;

`

const BoldText = styled.div`
  font-weight: 700;
  font-size: 2rem;
  color: #486581;
  line-height: 2.25rem;
  margin-bottom: .75rem;
`

function Home() {
  return (
    <>
      <HomeContainer>
        <LeftContainer>
          <IntroContainer>
            <TextBox>
              Welcome to InsertAppHere
            </TextBox>
            <TextBox>
              <BoldText>
                We are changing how YOU invest!
              </BoldText>
            </TextBox>
          </IntroContainer>
          <IntroContainer>
            <Blurb>
              <BoldText>What type of investor are you?</BoldText>
            </Blurb>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <a href='/selections'><MainButton style={{margin: '16px'}}>Personal</MainButton></a>
              <a href='/selections'><MainButton style={{margin: '16px'}}>Business</MainButton></a>
            </div>
          </IntroContainer>
        </LeftContainer>
        <RightContainer>
          <img src='https://lahacks.com/static/live-site/home/liveisland.svg' alt='big duck' />
        </RightContainer>
      </HomeContainer>
    </>
  )
}

export default Home