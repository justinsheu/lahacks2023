import React, { useState } from 'react'
import MainButton from '../components/Button'
import styled from 'styled-components'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

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
  line-height: 18px;
  padding: 8px 16px;
  text-align: center;
`

const BoldText = styled.div`
  font-weight: 700;
  font-size: 2rem;
  color: #486581;
  line-height: 2.25rem;
  margin-bottom: .75rem;
`

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
                <MainButton>Confirm investment choices</MainButton>
            </div>
        </IntroContainer>
    </HomeContainer>
  )
}

export default Selections