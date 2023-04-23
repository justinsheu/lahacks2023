import React, { useState, useEffect } from 'react'
import HomeContainer from '../components/HomeContainer'
import IntroContainer from '../components/IntroContainer'
import TextBox from '../components/TextBox';
import BoldText from '../components/BoldText';
import { useSearchParams } from 'react-router-dom'

function Recommendations() {

    const [searchparams] = useSearchParams();

    useEffect(() => {
        const region = searchparams.get('region')
        const asset = searchparams.get('asset')
        const timeframe = searchparams.get('timeframe')
        console.log(region, asset, timeframe)

        // Make call to API using (region, asset, timeframe)

        // Then use .then(), and save those values using setBuyStocks() and setSellStocks()
    }, [searchparams])

    const [buyStocks, setBuyStocks] = useState(['AAPL', 'AMZN']);
    const [sellStocks, setSellStocks] = useState(['NVDA', 'RIOT', 'MARA']);

  return (
    <HomeContainer style={{flexDirection: 'column'}}>
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