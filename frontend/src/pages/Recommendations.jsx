import React, { useState, useEffect } from 'react'
import HomeContainer from '../components/HomeContainer'
import IntroContainer from '../components/IntroContainer'
import TextBox from '../components/TextBox';
import BoldText from '../components/BoldText';
import { useSearchParams } from 'react-router-dom';
import Axios from 'axios';

function Recommendations() {

    const [searchparams] = useSearchParams();


    useEffect(() => {
        const region = searchparams.get('region')
        const asset = searchparams.get('asset')
        let timeframe = searchparams.get('timeframe')
        console.log(region, asset, timeframe)
        switch (timeframe) {
            case "1 week":
                timeframe = "week";
                break;
            case "1 month":
                timeframe = "month";
        }

        switch (region) {
            case "United Kingdom":
                region = "united-kingdom";
        }

        Axios.get(`http://localhost:8080/getrecs/${region.toLowerCase()}/${asset}/${timeframe}`).then(
            (response) => {
                let newBuyStocks = [];
                let newSellStocks = [];
                console.log(sellStocks)
                response = response.data;
                console.log(response)
                for (const company of Object.keys(response)) {
                    if (response[company].decision === "buy") {
                        newBuyStocks.push(company);
                    } else if (response[company].decision === "sell") {
                        newSellStocks.push(company);
                    }
                }
                setBuyStocks(newBuyStocks);
                setSellStocks(newSellStocks);
            }
        );

        // Make call to API using (region, asset, timeframe)

        // Then use .then(), and save those values using setBuyStocks() and setSellStocks()
    }, [searchparams])

    const [buyStocks, setBuyStocks] = useState(['Generating Buy Recommendations ...']);
    const [sellStocks, setSellStocks] = useState(['Generating Sell Recommendations ...']);

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