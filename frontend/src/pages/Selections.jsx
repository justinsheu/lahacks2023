import React from 'react'
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
  justify-content: center;
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

    const regions = ['North America', 'South America', 'China', 'Europe', 'North Africa', 'South Africa', 'Russia'];

  return (
    <HomeContainer>
        <IntroContainer>
            <TextBox>
                <BoldText>Select your investment region interest</BoldText>
            </TextBox>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Region
                </MenuButton>
                <MenuList>
                    <MenuItem>North America</MenuItem>
                    <MenuItem>South America</MenuItem>
                    <MenuItem>China</MenuItem>
                    <MenuItem>Europe</MenuItem>
                    <MenuItem>North Africa</MenuItem>
                    <MenuItem>South Africa</MenuItem>
                    <MenuItem>Russia</MenuItem>
                </MenuList>
            </Menu>
        </IntroContainer>
    </HomeContainer>
  )
}

export default Selections