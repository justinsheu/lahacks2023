import React, { useState } from 'react'
import MainButton from '../components/Button'
import styled from 'styled-components'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import HomeContainer from '../components/HomeContainer';
import IntroContainer from '../components/IntroContainer';
import TextBox from '../components/TextBox'
import BoldText from '../components/BoldText';


function Selections() {

    const [region, setRegion] = useState('');
    const [asset, setAsset] = useState('');
    const [timeframe, setTimeframe] = useState('');

    const regions = ['North America', 'South America', 'China', 'Europe', 'North Africa', 'South Africa', 'Russia'];
    const assets = ['Stocks', 'Commidities', 'Currency'];
    const timeframes = ['1 week', '1 month', '3 months', '1 year', '5 years'];

  return (
    <HomeContainer>
        <IntroContainer style={{marginTop: '32px'}}>
            <TextBox>
                <BoldText>Select your investment region interest</BoldText>
            </TextBox>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '24px'}}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {region ? region : 'Region'}
                    </MenuButton>
                    <MenuList>
                        {regions.map((region, key) => {
                            return (
                                <MenuItem style={{fontFamily: 'M PLUS Rounded 1c'}} onClick={() => {setRegion(region)}} key={key}>{region}</MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
            </div>
        </IntroContainer>
        <br />
        <IntroContainer>
            <TextBox>
                <BoldText>Select your asset type</BoldText>
            </TextBox>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '24px'}}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {asset ? asset : 'Asset'}
                    </MenuButton>
                    <MenuList>
                        {assets.map((asset, key) => {
                            return (
                                <MenuItem style={{fontFamily: 'M PLUS Rounded 1c'}} onClick={() => {setAsset(asset)}} key={key}>{asset}</MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
            </div>
        </IntroContainer>
        <br />
        <IntroContainer>
            <TextBox>
                <BoldText>Select your timeframe</BoldText>
            </TextBox>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '24px'}}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {timeframe ? timeframe : 'Timeframe'}
                    </MenuButton>
                    <MenuList>
                        {timeframes.map((timeframe, key) => {
                            return (
                                <MenuItem style={{fontFamily: 'M PLUS Rounded 1c'}} onClick={() => {setTimeframe(timeframe)}} key={key}>{timeframe}</MenuItem>
                            )
                        })}
                    </MenuList>
                </Menu>
            </div>
        </IntroContainer>
        <IntroContainer>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '24px'}}>
                <a href='/recommendations'><MainButton style={{height: '100%', width: '200px'}}>Confirm investment choices</MainButton></a>
            </div>
        </IntroContainer>
    </HomeContainer>
  )
}

export default Selections