import React, { useState } from 'react'
import HomeContainer from '../components/HomeContainer'
import IntroContainer from '../components/IntroContainer'
import TextBox from '../components/TextBox';
import BoldText from '../components/BoldText';

function Recommendations() {

    const [buyStocks, setBuyStocks] = useState(['AAPL', 'AMZN']);
    const [sellStocks, setSellStocks] = useState(['NVDA', 'RIOT', 'MARA']);

  return (
    <HomeContainer>
        <IntroContainer style={{marginTop: '32px'}}>
            <TextBox>
                <BoldText>Here are your stock recommendations:</BoldText>
            </TextBox>
        </IntroContainer>
        <br />
        <IntroContainer>
            <TextBox>
                <BoldText>Buy these:</BoldText>
            </TextBox>
            <TextBox style={{flexDirection: 'column', marginBottom: '32px'}}>
                {buyStocks.map((stock, key) => {
                    return (
                        <TextBox style={{marginBottom: '12px'}} key={key}>{stock}</TextBox>
                    )
                })}
            </TextBox>
        </IntroContainer>
        <br />
        <IntroContainer>
            <TextBox>
                <BoldText>Sell these:</BoldText>
            </TextBox>
            <TextBox style={{flexDirection: 'column', marginBottom: '32px'}}>
                {sellStocks.map((stock, key) => {
                    return (
                        <TextBox style={{marginBottom: '12px'}} key={key}>{stock}</TextBox>
                    )
                })}
            </TextBox>
        </IntroContainer>
    </HomeContainer>
  )
}

export default Recommendations